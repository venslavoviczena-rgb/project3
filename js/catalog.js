document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("catalog");
  if (!container) return;

  container.innerHTML = "<p>Загрузка каталога товаров...</p>";
  
  const rawProducts = await getProducts();
  container.innerHTML = ""; 

  const products = rawProducts.map((el) => new Product(el));

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price} $</p>
      <button class="btn" onclick="window.location.href='product.html?id=${p.id}'">Подробнее</button>
    `;
    container.appendChild(card);
  });
});