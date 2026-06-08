document.addEventListener("DOMContentLoaded", () => {
  const showLoginBtn = document.getElementById("show-login");
  const showRegisterBtn = document.getElementById("show-register");
  const loginFormContainer = document.getElementById("login-form");
  const registerFormContainer = document.getElementById("register-form");

  if (!loginFormContainer || !registerFormContainer) return;

  loginFormContainer.innerHTML = `
    <form id="form-login">
      <input type="email" id="login-email" placeholder="Электронная почта (Email)" required />
      <input type="password" id="login-password" placeholder="Пароль" required />
      <button type="submit" class="btn">Войти</button>
    </form>
  `;

  registerFormContainer.innerHTML = `
    <form id="form-register">
      <input type="text" id="register-name" placeholder="Ваше имя" required />
      <input type="email" id="register-email" placeholder="Электронная почта (Email)" required />
      <input type="password" id="register-password" placeholder="Придумайте пароль" required />
      <button type="submit" class="btn">Зарегистрироваться</button>
    </form>
  `;

  showLoginBtn.addEventListener("click", () => {
    loginFormContainer.style.display = "block";
    registerFormContainer.style.display = "none";
    showLoginBtn.classList.add("active");
    showRegisterBtn.classList.remove("active");
  });

  showRegisterBtn.addEventListener("click", () => {
    loginFormContainer.style.display = "none";
    registerFormContainer.style.display = "block";
    showLoginBtn.classList.remove("active");
    showRegisterBtn.classList.add("active");
  });

  document.getElementById("form-register").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;

    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (registeredUsers.some(u => u.email === email)) {
      alert("Пользователь с таким Email уже существует!");
      return;
    }

    const newUser = new User(name, email, password);
    registeredUsers.push(newUser);
    
    localStorage.setItem("users", JSON.stringify(registeredUsers));
    alert("Регистрация успешна! Теперь вы можете войти.");
    showLoginBtn.click();
  });

  document.getElementById("form-login").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userData = registeredUsers.find(u => u.email === email);

    if (!userData) {
      alert("Пользователь не найден.");
      return;
    }

    const userInstance = new User(userData.name, userData.email, userData.password);

    if (userInstance.checkPassword(password)) {
      setCurrentUser({ name: userInstance.name, email: userInstance.email });
      alert("Вход выполнен успешно!");
      window.location.href = "index.html";
    } else {
      alert("Неверный пароль!");
    }
  });
});