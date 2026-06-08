function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function updateCartBadge() {
  const cartBadge = document.getElementById("cart-count");
  if (cartBadge) {
    const cart = Cart.loadFromStorage();
    const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalCount;
  }
}

function renderHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const user = getCurrentUser();
  const cart = Cart.loadFromStorage();
  const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  header.innerHTML = `
    <div class="container">
      <h1><a href="index.html">SOTEM<span>store</span></a></h1>
      <nav>
        <a href="index.html">Главная</a>
        <a href="cart.html">Корзина (<span id="cart-count">${totalCount}</span>)</a>
        ${user ? 
          `<span>Привет, <b>${user.name}</b></span> <button id="logout-btn" class="btn">Выйти</button>` : 
          `<a href="auth.html">Вход / Регистрация</a>`}
      </nav>
    </div>
  `;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logoutUser();
      window.location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", renderHeader);