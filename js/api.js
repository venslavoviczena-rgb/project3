const API_URL = "https://fakestoreapi.com";

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    return await res.json();
  } catch (error) {
    console.error("Ошибка получения списка товаров:", error);
    return [];
  }
}

async function getProductById(id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    return await res.json();
  } catch (error) {
    console.error(`Ошибка получения товара по ID (${id}):`, error);
    return null;
  }
}