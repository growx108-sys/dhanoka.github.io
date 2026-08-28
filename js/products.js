/* ============================================================
   DHANOKA — products.js
   Data-access helpers + rendering functions for product cards
   and the product detail page.

   NOTE ON FUTURE BACKEND READINESS:
   getProducts() / getProductById() are the single seam where a
   real API call would later replace the in-memory array, without
   changing any rendering code below.
   ============================================================ */

/* ---------- Data access (swap these for API calls later) ---------- */
function getProducts() {
  return (typeof DHANOKA_PRODUCTS !== "undefined") ? DHANOKA_PRODUCTS : [];
}

function getProductById(id) {
  return getProducts().find(p => p.id === id) || null;
}

function filterProducts({ query = "", category = "", packSize = "" } = {}) {
  const q = query.trim().toLowerCase();
  return getProducts().filter(p => {
    const matchesQuery = !q ||
      p.name.toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q);
    const matchesCategory = !category || p.category === category;
    const matchesPack = !packSize || (p.packSizes || []).includes(packSize);
    return matchesQuery && matchesCategory && matchesPack;
  });
}

function searchProducts(query) {
  return filterProducts({ query });
}

function sortProducts(list, sortKey) {
  const sorted = [...list];
  if (sortKey === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    sorted.sort((a, b) => a.name.localeCompare(b.name)); // name-asc default
  }
  return sorted;
}

/* ---------- Rendering helpers ---------- */
function categoryLabel(cat) {
  return cat && cat.trim() ? cat : "Category: to be updated";
}

function brandLabel(brand) {
  return brand && brand.trim() ? brand : "";
}

function descriptionOrPlaceholder(desc) {
  return (desc && desc.trim()) ? desc : "Product information will be updated.";
}

function productCardHTML(p) {
  const packBadges = (p.packSizes && p.packSizes.length)
    ? p.packSizes.slice(0, 4).map(sz => `<span class="badge">${escapeHtml(sz)}</span>`).join("")
    : `<span class="badge">Pack size: to be updated</span>`;

  return `
    <article class="product-card" data-id="${p.id}">
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="image-wrap" aria-label="View ${escapeHtml(p.name)}">
        <img src="${p.image}" alt="${escapeHtml(p.name)} pack" loading="lazy"
             onerror="this.onerror=null;this.src='assets/products/_placeholder.svg';">
      </a>
      <div class="card-body">
        <a href="product.html?id=${encodeURIComponent(p.id)}"><span class="p-name">${escapeHtml(p.name)}</span></a>
        <span class="p-meta">${escapeHtml(categoryLabel(p.category))}${brandLabel(p.brand) ? " · " + escapeHtml(p.brand) : ""}</span>
        <div class="pack-badges">${packBadges}</div>
        <p class="p-desc">${escapeHtml(descriptionOrPlaceholder(p.description))}</p>
        <div class="card-actions">
          <a class="btn btn-outline" href="product.html?id=${encodeURIComponent(p.id)}">View Product</a>
          <button class="btn btn-primary" onclick="quickEnquire('${p.id}')">Enquire</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(container, list) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = "";
    const empty = qs("[data-empty-state]");
    if (empty) empty.style.display = "block";
    return;
  }
  const empty = qs("[data-empty-state]");
  if (empty) empty.style.display = "none";
  container.innerHTML = list.map(productCardHTML).join("");
}

function quickEnquire(productId) {
  const p = getProductById(productId);
  if (!p) return;
  const message = `Hello Dhanoka,\n\nI am interested in the following agricultural product:\n\nProduct: ${p.name}\nPack Size: \nQuantity: \n\nName: \nVillage/Town: \nDistrict: \nState: \n\nPlease share availability and pricing.`;
  window.open(buildWhatsAppLink(message), "_blank");
}

/* ---------- Featured products (homepage) ---------- */
function renderFeaturedProducts(container, count) {
  const list = getProducts().slice(0, count || 10);
  renderProductGrid(container, list);
}

document.addEventListener("DOMContentLoaded", () => {
  const featuredEl = qs("[data-featured-products]");
  if (featuredEl) renderFeaturedProducts(featuredEl, 10);
});
