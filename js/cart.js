/* ============================================================
   DHANOKA — cart.js
   Frontend-only enquiry "cart" backed by localStorage.
   This is NOT a real payment cart — it powers an enquiry/order
   request that is sent via WhatsApp or the enquiry form.

   Cart item shape:
   { productId, name, image, packSize, quantity }

   Future e-commerce readiness:
   calculateCart() is written so a later version can plug in
   price/GST fields without changing callers.
   ============================================================ */

const CART_KEY = "dhanoka_cart_v1";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Cart read error:", e);
    return [];
  }
}

function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Cart write error:", e);
  }
  refreshCartBadge();
}

function getCartItemCount() {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(productId, packSize, quantity) {
  const product = getProductById(productId);
  if (!product) return;
  const qty = Math.max(1, quantity || 1);
  const cart = readCart();
  const existing = cart.find(i => i.productId === productId && i.packSize === packSize);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      productId,
      name: product.name,
      image: product.image,
      packSize: packSize || (product.packSizes && product.packSizes[0]) || "",
      quantity: qty
    });
  }
  writeCart(cart);
  showToast(`${product.name} added to your enquiry cart.`);
}

function removeFromCart(productId, packSize) {
  const cart = readCart().filter(i => !(i.productId === productId && i.packSize === packSize));
  writeCart(cart);
  renderCartPage();
}

function updateCartQuantity(productId, packSize, quantity) {
  const cart = readCart();
  const item = cart.find(i => i.productId === productId && i.packSize === packSize);
  if (!item) return;
  item.quantity = Math.max(1, quantity);
  writeCart(cart);
  renderCartPage();
}

function clearCart() {
  writeCart([]);
  renderCartPage();
}

function calculateCart() {
  const cart = readCart();
  // Price/GST intentionally left out — real values are not available yet.
  return {
    itemCount: cart.reduce((sum, i) => sum + i.quantity, 0),
    lineCount: cart.length,
    subtotal: null // to be populated once real pricing is available
  };
}

/* ---------- Cart page rendering ---------- */
function cartItemRowHTML(item) {
  return `
    <div class="cart-item" data-pid="${item.productId}" data-pack="${escapeHtml(item.packSize)}">
      <a href="product.html?id=${encodeURIComponent(item.productId)}" class="thumb">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
      </a>
      <div>
        <a href="product.html?id=${encodeURIComponent(item.productId)}"><span class="ci-name">${escapeHtml(item.name)}</span></a>
        <div class="ci-meta">Pack size: ${escapeHtml(item.packSize || "—")}</div>
        <div class="ci-actions" style="margin-top:8px;">
          <div class="qty-selector">
            <button aria-label="Decrease quantity" onclick="updateCartQuantity('${item.productId}','${escapeHtml(item.packSize)}', ${item.quantity - 1})">−</button>
            <span>${item.quantity}</span>
            <button aria-label="Increase quantity" onclick="updateCartQuantity('${item.productId}','${escapeHtml(item.packSize)}', ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.productId}','${escapeHtml(item.packSize)}')">Remove</button>
        </div>
      </div>
    </div>
  `;
}

function renderCartPage() {
  const list = qs("[data-cart-list]");
  if (!list) return; // not on cart page
  const cart = readCart();
  const emptyState = qs("[data-cart-empty]");
  const summary = qs("[data-cart-summary]");

  if (!cart.length) {
    list.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (summary) summary.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (summary) summary.style.display = "block";
  list.innerHTML = cart.map(cartItemRowHTML).join("");

  const totals = calculateCart();
  const itemCountEl = qs("[data-cart-item-count]");
  if (itemCountEl) itemCountEl.textContent = totals.itemCount;

  const waBtn = qs("[data-cart-whatsapp]");
  if (waBtn) {
    waBtn.onclick = () => window.open(buildWhatsAppLink(buildCartWhatsAppMessage()), "_blank");
  }
}

/* ---------- WhatsApp message builder from full cart ---------- */
function buildCartWhatsAppMessage(customer) {
  const cart = readCart();
  const c = customer || {};
  const lines = [
    "Hello Dhanoka,",
    "",
    "I am interested in the following agricultural products:",
    ""
  ];
  cart.forEach(item => {
    lines.push(`Product: ${item.name}`);
    lines.push(`Pack Size: ${item.packSize || ""}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push("");
  });
  lines.push(`Name: ${c.name || ""}`);
  lines.push(`Village/Town: ${c.village || ""}`);
  lines.push(`District: ${c.district || ""}`);
  lines.push(`State: ${c.state || ""}`);
  lines.push("");
  lines.push("Please share availability and pricing.");
  return lines.join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  const clearBtn = qs("[data-clear-cart]");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
