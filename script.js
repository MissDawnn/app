// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Guardar carrito en localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar la visualización del carrito
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  if (cartItemsContainer && totalPriceElement) {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <div>
          <p>${item.name}</p>
          <p>$${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${index})">Eliminar</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = `$${totalPrice}`;
  }
}

// Agregar producto al carrito
function addToCart(productName, productPrice, quantityId) {
  const quantityInput = document.getElementById(quantityId);
  const quantity = parseInt(quantityInput.value);

  const item = cart.find((product) => product.name === productName);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ name: productName, price: productPrice, quantity });
  }

  saveCartToStorage();
  alert(`${quantity} x ${productName} agregado al carrito`);
  updateCartBadge();
}

// Eliminar producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartDisplay();
  updateCartBadge();
}

// Actualizar el ícono del carrito con la cantidad total
function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    cartBadge.textContent = totalQuantity > 0 ? totalQuantity : '';
  }
}

// Configurar la cantidad de productos
function setupQuantityControls(quantityInputId, decreaseButtonId, increaseButtonId) {
  const quantityInput = document.getElementById(quantityInputId);

  document.getElementById(decreaseButtonId).addEventListener('click', () => {
    if (quantityInput.value > 1) {
      quantityInput.value--;
    }
  });

  document.getElementById(increaseButtonId).addEventListener('click', () => {
    quantityInput.value++;
  });
}

// Página de Pago
function initPaymentPage() {
  const cartSummary = document.getElementById('cart-summary');
  const totalPriceSummary = document.getElementById('total-price-summary');

  if (cartSummary && totalPriceSummary) {
    cartSummary.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;

      const cartItem = document.createElement('div');
      cartItem.innerHTML = `
        <p>${item.name} - $${item.price} x ${item.quantity}</p>
      `;
      cartSummary.appendChild(cartItem);
    });

    totalPriceSummary.textContent = `$${totalPrice}`;
  }

  const paymentForm = document.getElementById('payment-details');
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pago realizado con éxito. ¡Gracias por tu compra!');
      cart = [];
      saveCartToStorage();
      updateCartBadge();
      window.location.href = 'index.html';
    });
  }
}

// Inicializar la página "Mi Cuenta"
function initAccountPage() {
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inicio de sesión exitoso');
  });

  document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Registro exitoso');
  });
}

// Configurar navegación global
function setupNavigation() {
  document.querySelectorAll('.nav-back').forEach((button) => {
    button.addEventListener('click', () => history.back());
  });
}

// Inicializar según la página actual
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'detalle') {
    setupQuantityControls('quantity', 'decrease', 'increase');
  } else if (page === 'carrito') {
    updateCartDisplay();
  } else if (page === 'pagar') {
    initPaymentPage();
  } else if (page === 'mi-cuenta') {
    initAccountPage();
  }

  updateCartBadge();
  setupNavigation();
});
