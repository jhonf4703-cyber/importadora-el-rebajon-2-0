const WHATSAPP = "573147636825";

const products = [
  {
    id: "aspiradora",
    name: "Aspiradora Inalámbrica TOTAL 20V",
    price: 127000,
    oldPrice: 175000,
    tag: "OFERTA",
    image: "images/aspiradora.jpg",
    images: [
      "images/aspiradora.jpg",
      "images/aspiradora-2.jpg",
      "images/aspiradora-3.jpg"
    ],
    description:
      "Aspiradora inalámbrica TOTAL 20V, práctica, potente y perfecta para mantener tu hogar limpio sin cables.",
    features: [
      "🔋 Batería inalámbrica 20V",
      "💨 Potente succión",
      "🏠 Ideal para hogar y vehículo",
      "🧹 Diseño práctico y portátil",
      "🛡️ Garantía de 2 años"
    ]
  },

  {
    id: "linterna",
    name: "Linterna SOFIRN SD06",
    price: 89999,
    oldPrice: 119999,
    tag: "MÁS VENDIDO",
    image: "images/linterna.jpg",
    images: [
      "images/linterna.jpg",
      "images/linterna-2.jpg",
      "images/linterna-3.jpg"
    ],
    description:
      "Linterna SOFIRN SD06 de alto rendimiento, ideal para camping, trabajo, seguridad, emergencias y actividades al aire libre.",
    features: [
      "🔦 Hasta 3200 lúmenes",
      "📍 Alcance de hasta 470 metros",
      "💧 Resistencia al agua IPX8",
      "🔋 Batería recargable",
      "💪 Construcción resistente"
    ]
  },

  {
    id: "instax",
    name: "Fujifilm Instax Mini 12 Rosa",
    price: 285000,
    oldPrice: 395000,
    tag: "OFERTA",
    image: "images/instax-rosa-1.jpg",
    images: [
      "images/instax-rosa-1.jpg",
      "images/instax-rosa-2.jpg",
      "images/instax-rosa-3.jpg"
    ],
    description:
      "Fujifilm Instax Mini 12 Rosa, cámara instantánea compacta y fácil de usar para capturar y revelar tus mejores momentos.",
    features: [
      "📸 Fotografías instantáneas",
      "💗 Diseño rosa",
      "✨ Modo selfie",
      "☀️ Control automático de exposición",
      "🎞️ Compatible con película Instax Mini"
    ]
  }
];


/* ================================
   ESTADO DEL CARRITO
================================ */

let cart = JSON.parse(localStorage.getItem("rebajonCart")) || [];


/* ================================
   ELEMENTOS
================================ */

const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");

const productModal = document.getElementById("productModal");
const productDetail = document.getElementById("productDetail");

const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");

const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");

const checkoutModal = document.getElementById("checkoutModal");
const checkoutSummary = document.getElementById("checkoutSummary");
const orderForm = document.getElementById("orderForm");


/* ================================
   FORMATO DE PESOS
================================ */

function formatPrice(price) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(price);
}


/* ================================
   CALCULAR DESCUENTO
================================ */

function getDiscount(oldPrice, price) {
  if (!oldPrice || oldPrice <= price) return 0;

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}


/* ================================
   MOSTRAR PRODUCTOS
================================ */

function renderProducts(list = products) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    noProducts.style.display = "block";
    return;
  }

  noProducts.style.display = "none";

  list.forEach(product => {
    const discount = getDiscount(product.oldPrice, product.price);

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-container" onclick="openProduct('${product.id}')">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
        
        ${
          discount > 0
            ? `<span class="discount">-${discount}%</span>`
            : ""
        }

        <img 
          src="${product.image}" 
          alt="${product.name}"
          class="product-image"
          onerror="this.src='https://via.placeholder.com/500x500?text=Imagen+no+disponible'"
        >
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>

        <div class="product-price">
          <span class="old-price">${formatPrice(product.oldPrice)}</span>
          <strong>${formatPrice(product.price)}</strong>
        </div>

        <div class="delivery-info">
          🚚 Envío nacional
        </div>

        <button 
          class="product-button"
          onclick="openProduct('${product.id}')"
        >
          VER PRODUCTO
        </button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}


/* ================================
   ABRIR PRODUCTO
================================ */

function openProduct(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const discount = getDiscount(product.oldPrice, product.price);

  productDetail.innerHTML = `
    <div class="product-detail">

      <div class="product-gallery">

        <div class="main-image-wrapper">
          <img 
            id="mainProductImage"
            src="${product.images[0]}"
            alt="${product.name}"
          >
        </div>

        <div class="thumbnail-container">
          ${product.images
            .map(
              (image, index) => `
                <button 
                  class="thumbnail ${index === 0 ? "active" : ""}"
                  onclick="changeMainImage('${image}', this)"
                >
                  <img src="${image}" alt="${product.name}">
                </button>
              `
            )
            .join("")}
        </div>

      </div>

      <div class="product-detail-info">

        ${
          product.tag
            ? `<span class="product-detail-tag">${product.tag}</span>`
            : ""
        }

        <h2>${product.name}</h2>

        ${
          discount > 0
            ? `<div class="discount-detail">-${discount}% DE DESCUENTO</div>`
            : ""
        }

        <div class="detail-price">
          <span class="old-price">${formatPrice(product.oldPrice)}</span>
          <strong>${formatPrice(product.price)}</strong>
        </div>

        <p class="product-description">
          ${product.description}
        </p>

        <h3>Características</h3>

        <ul class="features-list">
          ${product.features
            .map(feature => `<li>${feature}</li>`)
            .join("")}
        </ul>

        <div class="delivery-info">
          🚚 <strong>Envíos a toda Colombia</strong>
          <br>
          💵 Pago contra entrega
        </div>

        <div class="quantity-section">

          <span>Cantidad:</span>

          <div class="quantity-control">
            <button onclick="changeProductQuantity(-1)">−</button>

            <span id="productQuantity">1</span>

            <button onclick="changeProductQuantity(1)">+</button>
          </div>

        </div>

        <button 
          class="add-cart-button"
          onclick="addToCart('${product.id}')"
        >
          🛒 AGREGAR AL CARRITO
        </button>

      </div>

    </div>
  `;

  productModal.classList.add("active");
  productModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  window.currentProduct = product;
  window.productQuantity = 1;
}


/* ================================
   CAMBIAR IMAGEN
================================ */

function changeMainImage(image, button) {
  const mainImage = document.getElementById("mainProductImage");

  if (!mainImage) return;

  mainImage.src = image;

  document.querySelectorAll(".thumbnail").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
}


/* ================================
   CANTIDAD DEL PRODUCTO
================================ */

function changeProductQuantity(amount) {
  if (!window.productQuantity) {
    window.productQuantity = 1;
  }

  window.productQuantity += amount;

  if (window.productQuantity < 1) {
    window.productQuantity = 1;
  }

  const quantityElement = document.getElementById("productQuantity");

  if (quantityElement) {
    quantityElement.textContent = window.productQuantity;
  }
}


/* ================================
   AGREGAR AL CARRITO
================================ */

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const quantity = window.productQuantity || 1;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();

  closeProduct();

  openCart();

  showMessage("✅ Producto agregado al carrito");
}


/* ================================
   GUARDAR CARRITO
================================ */

function saveCart() {
  localStorage.setItem("rebajonCart", JSON.stringify(cart));
  renderCart();
}


/* ================================
   CONTAR PRODUCTOS
================================ */

function updateCartCount() {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalItems;
}


/* ================================
   MOSTRAR CARRITO
================================ */

function renderCart() {
  updateCartCount();

  if (cart.length === 0) {
    cartItems.innerHTML = "";
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  cartSummary.style.display = "block";

  cartItems.innerHTML = cart
    .map(
      item => `
        <div class="cart-item">

          <img 
            src="${item.image}" 
            alt="${item.name}"
          >

          <div class="cart-item-info">

            <h3>${item.name}</h3>

            <strong>${formatPrice(item.price)}</strong>

            <div class="cart-item-actions">

              <div class="quantity-control">

                <button onclick="changeCartQuantity('${item.id}', -1)">
                  −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeCartQuantity('${item.id}', 1)">
                  +
                </button>

              </div>

              <button 
                class="remove-item"
                onclick="removeFromCart('${item.id}')"
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>
      `
    )
    .join("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartSubtotal.textContent = formatPrice(subtotal);
  cartTotal.textContent = formatPrice(subtotal);
}


/* ================================
   CAMBIAR CANTIDAD DEL CARRITO
================================ */

function changeCartQuantity(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  saveCart();
}


/* ================================
   ELIMINAR DEL CARRITO
================================ */

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
}


/* ================================
   ABRIR CARRITO
================================ */

function openCart() {
  renderCart();

  cartModal.classList.add("active");
  cartModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}


/* ================================
   CERRAR CARRITO
================================ */

function closeCart() {
  cartModal.classList.remove("active");
  cartModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}


/* ================================
   CERRAR PRODUCTO
================================ */

function closeProduct() {
  productModal.classList.remove("active");
  productModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}


/* ================================
   ABRIR CHECKOUT
================================ */

function openCheckout() {
  if (cart.length === 0) {
    showMessage("🛒 Tu carrito está vacío");
    return;
  }

  closeCart();

  renderCheckoutSummary();

  checkoutModal.classList.add("active");
  checkoutModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}


/* ================================
   CERRAR CHECKOUT
================================ */

function closeCheckout() {
  checkoutModal.classList.remove("active");
  checkoutModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}


/* ================================
   RESUMEN DEL PEDIDO
================================ */

function renderCheckoutSummary() {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  checkoutSummary.innerHTML = `
    <h3>Resumen del pedido</h3>

    ${cart
      .map(
        item => `
          <div class="summary-product">
            <span>
              ${item.name} x${item.quantity}
            </span>

            <strong>
              ${formatPrice(item.price * item.quantity)}
            </strong>
          </div>
        `
      )
      .join("")}

    <div class="summary-final">
      <span>Total a pagar</span>
      <strong>${formatPrice(subtotal)}</strong>
    </div>

    <p class="payment-note">
      💵 Pago contra entrega
    </p>
  `;
}


/* ================================
   ENVIAR PEDIDO A WHATSAPP
================================ */

function sendOrderToWhatsApp(event) {
  event.preventDefault();

  if (cart.length === 0) {
    showMessage("🛒 Tu carrito está vacío");
    return;
  }

  const formData = new FormData(orderForm);

  const name = formData.get("customerName");
  const phone = formData.get("customerPhone");
  const department = formData.get("customerDepartment");
  const city = formData.get("customerCity");
  const address = formData.get("customerAddress");
  const neighborhood = formData.get("customerNeighborhood");
  const reference = formData.get("customerReference");
  const notes = formData.get("customerNotes");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const productsMessage = cart
    .map(
      item =>
        `• ${item.name} x${item.quantity} — ${formatPrice(
          item.price * item.quantity
        )}`
    )
    .join("\n");

  const message = `
🛍️ *NUEVO PEDIDO - IMPORTADORA EL REBAJÓN*

📦 *PRODUCTOS:*
${productsMessage}

💰 *TOTAL: ${formatPrice(subtotal)}*

💵 *FORMA DE PAGO:*
Pago contra entrega

👤 *DATOS DEL CLIENTE:*

Nombre: ${name}
Celular: ${phone}
Departamento: ${department}
Ciudad/Municipio: ${city}
Dirección: ${address}
Barrio: ${neighborhood || "No especificado"}
Referencia: ${reference || "No especificada"}
Observaciones: ${notes || "Ninguna"}

🚚 Envío nacional en Colombia.

¡Hola! Quiero confirmar este pedido.
`.trim();

  const whatsappURL =
    `https://wa.me/${WHATSAPP}?text=` +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");

  cart = [];
  saveCart();

  orderForm.reset();

  closeCheckout();
}


/* ================================
   BUSCADOR
================================ */

if (searchInput) {
  searchInput.addEventListener("input", event => {
    const search = event.target.value
      .toLowerCase()
      .trim();

    const filteredProducts = products.filter(product =>
      (
        product.name +
        " " +
        product.description +
        " " +
        product.features.join(" ")
      )
        .toLowerCase()
        .includes(search)
    );

    renderProducts(filteredProducts);
  });
}


/* ================================
   MENSAJE
================================ */

function showMessage(text) {
  const message = document.createElement("div");

  message.className = "site-message";
  message.textContent = text;

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add("show");
  }, 10);

  setTimeout(() => {
    message.classList.remove("show");

    setTimeout(() => {
      message.remove();
    }, 300);
  }, 2500);
}


/* ================================
   BOTONES
================================ */

const openCartButton = document.getElementById("openCart");

if (openCartButton) {
  openCartButton.addEventListener("click", openCart);
}

const closeProductButton =
  document.getElementById("closeProductModal");

if (closeProductButton) {
  closeProductButton.addEventListener("click", closeProduct);
}

const closeCartButton =
  document.getElementById("closeCartModal");

if (closeCartButton) {
  closeCartButton.addEventListener("click", closeCart);
}

const closeCheckoutButton =
  document.getElementById("closeCheckoutModal");

if (closeCheckoutButton) {
  closeCheckoutButton.addEventListener("click", closeCheckout);
}

const checkoutButton =
  document.getElementById("checkoutButton");

if (checkoutButton) {
  checkoutButton.addEventListener("click", openCheckout);
}

if (orderForm) {
  orderForm.addEventListener(
    "submit",
    sendOrderToWhatsApp
  );
}


/* ================================
   CERRAR MODALES
================================ */

document.querySelectorAll("[data-close-product]").forEach(
  element => {
    element.addEventListener("click", closeProduct);
  }
);

document.querySelectorAll("[data-close-cart]").forEach(
  element => {
    element.addEventListener("click", closeCart);
  }
);

document.querySelectorAll("[data-close-checkout]").forEach(
  element => {
    element.addEventListener("click", closeCheckout);
  }
);


/* ================================
   TECLA ESC
================================ */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProduct();
    closeCart();
    closeCheckout();
  }
});


/* ================================
   INICIAR TIENDA
================================ */

renderProducts();
renderCart();
