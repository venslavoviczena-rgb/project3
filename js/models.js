// Класс пользователя
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  checkPassword(password) {
    return this.password === password;
  }
}

// Класс товара
class Product {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.description = data.description;
    this.image = data.image;
    this.category = data.category;
  }
}

// Класс для одного элемента корзины
class CartItem {
  constructor(productId, quantity = 1) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

// Класс корзины
class Cart {
  constructor(items = []) {
    this.items = items.map(
      (item) => new CartItem(item.productId, item.quantity)
    );
  }

  addItem(productId) {
    const existingItem = this.items.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push(new CartItem(productId, 1));
    }
    this.saveToStorage();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.productId !== productId);
    this.saveToStorage();
  }

  clear() {
    this.items = [];
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  static loadFromStorage() {
    const storedData = localStorage.getItem("cart");
    const items = storedData ? JSON.parse(storedData) : [];
    return new Cart(items);
  }
}