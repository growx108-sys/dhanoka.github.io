/* ============================================================
   DHANOKA — filters.js
   Powers the search / filter / sort toolbar on products.html
   (and category-filtered views from categories.html).
   ============================================================ */

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function populateCategoryOptions(selectEl) {
  const categories = Array.from(new Set(getProducts().map(p => p.category).filter(Boolean))).sort();
  selectEl.innerHTML = `<option value="">All Categories</option>` +
    categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
}

function populatePackSizeOptions(selectEl) {
  const sizes = Array.from(new Set(getProducts().flatMap(p => p.packSizes || []))).sort();
  selectEl.innerHTML = `<option value="">All Pack Sizes</option>` +
    sizes.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
}

function initProductsPageFilters() {
  const grid = qs("[data-product-grid]");
  if (!grid) return;

  const searchInput = qs("#product-search");
  const categorySelect = qs("#category-filter");
  const packSelect = qs("#pack-filter");
  const sortSelect = qs("#sort-select");
  const clearBtn = qs("#clear-filters");
  const countEl = qs("[data-result-count]");

  if (categorySelect) populateCategoryOptions(categorySelect);
  if (packSelect) populatePackSizeOptions(packSelect);

  const initialQuery = getQueryParam("q");
  const initialCategory = getQueryParam("category");
  if (initialQuery && searchInput) searchInput.value = initialQuery;
  if (initialCategory && categorySelect) categorySelect.value = initialCategory;

  function applyFilters() {
    const query = searchInput ? searchInput.value : "";
    const category = categorySelect ? categorySelect.value : "";
    const packSize = packSelect ? packSelect.value : "";
    const sortKey = sortSelect ? sortSelect.value : "name-asc";

    let list = filterProducts({ query, category, packSize });
    list = sortProducts(list, sortKey);

    renderProductGrid(grid, list);
    if (countEl) {
      countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    }
  }

  [searchInput, categorySelect, packSelect, sortSelect].forEach(el => {
    if (!el) return;
    el.addEventListener("input", applyFilters);
    el.addEventListener("change", applyFilters);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "";
      if (packSelect) packSelect.value = "";
      if (sortSelect) sortSelect.value = "name-asc";
      applyFilters();
    });
  }

  applyFilters();
}

document.addEventListener("DOMContentLoaded", initProductsPageFilters);
