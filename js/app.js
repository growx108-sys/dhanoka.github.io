/* ============================================================
   DHANOKA — app.js
   Site-wide configuration, navigation behavior, toast system,
   and small shared utilities.
   ============================================================ */

/* ---------- EDITABLE BUSINESS CONFIG ----------
   Replace these placeholders with real Dhanoka business details
   before going live. Nothing here is invented for production use. */
const DHANOKA_CONFIG = {
  businessName: "Dhanoka",
  whatsappNumber: "919589124421", // no + or spaces
  phone: "+91 95891 24421",
  email: "ashoksinghyadav@gmail.com",
  address: "Amkho, Shivaji Nagar, Gwalior, Madhya Pradesh, India",
  hours: "Open 24 Hours",
  gstin: "[GSTIN]"
};

/* ---------- Utilities ---------- */
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Build a wa.me link with a prefilled message */
function buildWhatsAppLink(message) {
  const number = DHANOKA_CONFIG.whatsappNumber || "";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/* ---------- Toast notifications ---------- */
function showToast(message) {
  let container = qs(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

/* ---------- Navbar: sticky shadow + mobile drawer + search panel ---------- */
function initNavbar() {
  const navbar = qs(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 6);
    }, { passive: true });
  }

  const hamburger = qs(".hamburger");
  const drawer = qs(".mobile-drawer");
  if (hamburger && drawer) {
    hamburger.addEventListener("click", () => drawer.classList.add("open"));
    qsa(".close-drawer, .mobile-drawer .backdrop", drawer).forEach(el =>
      el.addEventListener("click", () => drawer.classList.remove("open"))
    );
  }

  const searchToggle = qs("[data-search-toggle]");
  const searchPanel = qs(".search-panel");
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener("click", () => {
      searchPanel.classList.toggle("open");
      const input = qs("input", searchPanel);
      if (searchPanel.classList.contains("open") && input) input.focus();
    });
  }

  const navSearchForm = qs("[data-nav-search-form]");
  if (navSearchForm) {
    navSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = qs("input", navSearchForm).value.trim();
      window.location.href = "products.html" + (val ? ("?q=" + encodeURIComponent(val)) : "");
    });
  }
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "&#8593;";
  document.body.appendChild(btn);
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Cart count badge (shared across pages) ---------- */
function refreshCartBadge() {
  const badgeEls = qsa(".cart-count");
  const count = typeof getCartItemCount === "function" ? getCartItemCount() : 0;
  badgeEls.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initBackToTop();
  refreshCartBadge();
});
