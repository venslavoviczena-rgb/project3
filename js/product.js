document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  console.log(productId);

  if (!productId) {
    alert("Товар не найден!");
    window.location.href = "index.html";
    return;
  }

  const detailsContainer = document.getElementById("product-details");
  const toCatalogBtn = document.getElementById("to-catalog");
  const toCartBtn = document.getElementById("to-cart");

  let currentProduct = null;

  try {
    detailsContainer.innerHTML = "<p>Загрузка информации о товаре...</p>";
    const rawData = await getProductById(productId);

    if (!rawData || rawData.error) {
      throw new Error("Товар отсутствует в базе данных");
    }

    currentProduct = new Product(rawData);

    detailsContainer.innerHTML = `
      <div class="product-page-info">
        <img src="${currentProduct.image}" alt="${currentProduct.title}" style="max-width: 250px;">
        <h2>${currentProduct.title}</h2>
        <p class="category"><b>Категория:</b> ${currentProduct.category}</p>
        <p class="description">${currentProduct.description}</p>
        <p class="price"><b>Цена:</b> ${currentProduct.price} $</p>
        <button id="add-to-cart-btn" class="btn">Добавить в корзину</button>
      </div>
    `;

    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      const cart = Cart.loadFromStorage();
      cart.addItem(currentProduct.id);
      updateCartBadge();
      alert(`Товар "${currentProduct.title}" добавлен в корзину!`);
    });
  } catch (error) {
    console.error("Ошибка при загрузке товара:", error);
    detailsContainer.innerHTML = `<p>Ошибка при загрузке информации о товаре.</p>`;
  }

  if (toCatalogBtn) {
    toCatalogBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  if (toCartBtn) {
    toCartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
});
