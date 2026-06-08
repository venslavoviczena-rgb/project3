document.addEventListener("DOMContentLoaded", async () => {
  await renderCart();

  const checkoutBtn = document.querySelector(".cart-summary .btn:not(.btn-secondary)");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
  }
});

async function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  const cart = Cart.loadFromStorage();

  if (cart.items.length === 0) {
    cartItemsContainer.innerHTML = "<p style='padding: 20px 0; color: #666;'>Ваша корзина пуста.</p>";
    if (cartTotalElement) cartTotalElement.innerText = "0 $";
    return;
  }

  cartItemsContainer.innerHTML = "<p>Загрузка товаров...</p>";
  let totalSum = 0;
  cartItemsContainer.innerHTML = ""; 

  for (const item of cart.items) {
    try {
      const productData = await getProductById(item.productId);
      if (!productData) continue;

      const product = new Product(productData);
      const itemTotal = product.price * item.quantity;
      totalSum += itemTotal;

      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 20px;">
          <img src="${product.image}" alt="${product.title}" style="width: 60px; height: 60px; object-fit: contain;">
          <div style="flex-grow: 1;">
            <h4 style="font-size: 15px; margin-bottom: 5px;">${product.title}</h4>
            <p style="font-size: 14px; color: #444;">${product.price} $ x ${item.quantity} шт. = <b>${itemTotal.toFixed(2)} $</b></p>
          </div>
          <button class="btn delete-btn" data-id="${product.id}" style="background:#cc0000; padding: 8px 16px;">Удалить</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    } catch (error) {
      console.error(`Ошибка при загрузке товара ${item.productId}:`, error);
    }
  }

  if (cartTotalElement) {
    cartTotalElement.innerText = `${totalSum.toFixed(2)} $`;
  }
  
  setupDeleteButtons();
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const cart = Cart.loadFromStorage();
      cart.removeItem(productId);
      updateCartBadge();
      await renderCart();
    });
  });
}

function handleCheckout() {
  const cart = Cart.loadFromStorage();
  if (cart.items.length === 0) {
    alert("Ваша корзина пуста!");
    return;
  }
  alert("Заказ успешно оформлен!");
  cart.clear(); 
  updateCartBadge();
  renderCart();
}