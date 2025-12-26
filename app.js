const state = {
  rows: [],
  filtered: [],
};

const recipeBody = document.getElementById("recipeBody");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const baseFilter = document.getElementById("baseFilter");
const methodFilter = document.getElementById("methodFilter");
const glassFilter = document.getElementById("glassFilter");
const iceFilter = document.getElementById("iceFilter");

function normalize(value) {
  return value ? value.trim() : "";
}

function buildSelect(select, values, label = "すべて") {
  select.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = label;
  select.appendChild(allOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function renderTable(rows) {
  recipeBody.innerHTML = "";
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const ingredients = Array.isArray(row.ingredients)
      ? row.ingredients.join(" / ")
      : row.ingredients || "";
    tr.innerHTML = `
      <td data-label="カクテル名">${row.name}</td>
      <td data-label="ベース">${row.base}</td>
      <td data-label="技法">${row.method}</td>
      <td data-label="グラス">${row.glass}</td>
      <td data-label="氷">${row.ice}</td>
      <td data-label="材料">${ingredients}</td>
      <td data-label="備考">${row.note}</td>
    `;
    recipeBody.appendChild(tr);
  });

  resultCount.textContent = `${rows.length} 件表示`;
}

function filterRows() {
  const q = normalize(searchInput.value).toLowerCase();
  const base = baseFilter.value;
  const method = methodFilter.value;
  const glass = glassFilter.value;
  const ice = iceFilter.value;

  const filtered = state.rows.filter((row) => {
    if (base && row.base !== base) return false;
    if (method && row.method !== method) return false;
    if (glass && row.glass !== glass) return false;
    if (ice && row.ice !== ice) return false;

    if (!q) return true;
    const ingredients = Array.isArray(row.ingredients)
      ? row.ingredients.join(" ")
      : row.ingredients || "";
    const hay = `${row.name} ${ingredients} ${row.note}`.toLowerCase();
    return hay.includes(q);
  });

  state.filtered = filtered;
  renderTable(filtered);
}


function buildOptions() {
  const unique = (key) =>
    Array.from(new Set(state.rows.map((row) => row[key]).filter(Boolean))).sort();

  buildSelect(baseFilter, unique("base"), "すべてのベース");
  buildSelect(methodFilter, unique("method"), "すべての技法");
  buildSelect(glassFilter, unique("glass"), "すべてのグラス");
  buildSelect(iceFilter, unique("ice"), "すべての氷");
}

function loadRecipes() {
  const data = Array.isArray(window.RECIPES) ? window.RECIPES : [];
  state.rows = data;
  state.filtered = data;
  buildOptions();
  renderTable(data);
}

[searchInput, baseFilter, methodFilter, glassFilter, iceFilter].forEach((input) => {
  input.addEventListener("input", filterRows);
  input.addEventListener("change", filterRows);
});

loadRecipes();
