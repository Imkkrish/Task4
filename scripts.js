// Shared helper: get products JSON
async function get_products() {
    const res = await fetch('products.json');
    return res.json();
  }
  
  // Store cart in localStorage
  const cart_key = 'mini_ecom_cart';
  
  function get_cart() {
    const cart = localStorage.getItem(cart_key);
    return cart ? JSON.parse(cart) : {};
  }
  
  function set_cart(cart) {
    localStorage.setItem(cart_key, JSON.stringify(cart));
  }
  
  function add_to_cart(product_id, qty = 1) {
    const cart = get_cart();
    cart[product_id] = (cart[product_id] || 0) + qty;
    set_cart(cart);
    update_cart_count();
    alert('Added to cart!');
  }
  
  
  function remove_from_cart(product_id) {
    const cart = get_cart();
    delete cart[product_id];
    set_cart(cart);
    location.reload();
  }
  
  function update_cart(product_id, qty) {
    const cart = get_cart();
    if (qty <= 0) delete cart[product_id];
    else cart[product_id] = qty;
    set_cart(cart);
    location.reload();
  }
  
  // Format price to $xx.xx
  function format_price(price) {
    return '$' + price.toFixed(2);
  }
  
  // Utils to get URL param
  function get_param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function update_cart_count() {
    const cart = get_cart();
    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const count_el = document.getElementById('cart-count');
    if (count_el) count_el.textContent = count;
  }
  