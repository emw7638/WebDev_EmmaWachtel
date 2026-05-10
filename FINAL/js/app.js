// Begin Product Data
const products = {
  wildflower: {
    id: "wildflower",
    name: "Wildflower Honey",
    type: "Raw",
    price: 12,
    image: "img/product-wildflower.jpg",
    story:
      "This jar comes from late-summer meadow blooms. It tastes floral and bright because the bees forage across clover, asters, and backyard garden flowers."
  },
  clover: {
    id: "clover",
    name: "Clover Honey",
    type: "Raw",
    price: 15,
    image: "img/product-clover.jpg",
    story:
      "Clover honey is the classic pantry jar: gentle, clean, and easy to use in tea, baking, dressings, and toast."
  },
  comb: {
    id: "comb",
    name: "Raw Comb Honey",
    type: "Comb",
    price: 18,
    image: "img/product-comb.jpg",
    story:
      "Comb honey is cut directly from the frame, so the edible wax cells stay intact. Serve it with cheese, fruit, or warm bread."
  },
  lavender: {
    id: "lavender",
    name: "Lavender Honey",
    type: "Infused",
    price: 14,
    image: "img/product-lavender.jpg",
    story:
      "A small-batch infusion with soft lavender notes. It is especially good in tea, lemonade, yogurt, and shortbread."
  },
  citrus: {
    id: "citrus",
    name: "Citrus Blossom Honey",
    type: "Infused",
    price: 13,
    image: "img/product-citrus.jpg",
    story:
      "Bright citrus peel adds a sunny edge to this honey. Try it in sparkling water, marinades, or over pancakes."
  },
  buckwheat: {
    id: "buckwheat",
    name: "Autumn Amber Honey",
    type: "Raw",
    price: 16,
    image: "img/product-amber.jpg",
    story:
      "A darker autumn harvest with deeper caramel notes. This one works beautifully in baking, glazes, and savory sauces."
  }
};
// End Product Data

// Begin About Page Process Data
const processSteps = [
  {
    number: "01",
    title: "Bees collect nectar",
    body: "Foragers visit flowers and bring nectar back to the hive, spreading pollen as they travel through the neighborhood."
  },
  {
    number: "02",
    title: "The hive ripens honey",
    body: "Inside the hive, bees pass nectar along, fan it with their wings, and seal finished honey under wax cappings."
  },
  {
    number: "03",
    title: "Frames are extracted",
    body: "The beekeeper removes only surplus frames, uncaps them carefully, and spins the honey out with minimal heat."
  },
  {
    number: "04",
    title: "Honey is bottled",
    body: "Each batch is strained, labeled by harvest, and packed for market pickup while the flavor is still fresh."
  }
];
// End About Page Process Data

// Begin Shared Variables
const cartKey = "primroseApiaryCart";
const apiaryLocation = { lat: 41.2589, lon: -73.6847 };
// End Shared Variables

// Begin Cart Helper Functions
function readCart() {
  return JSON.parse(localStorage.getItem(cartKey) || "{}");
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function updateCartCount() {
  const count = Object.values(readCart()).reduce((sum, qty) => sum + qty, 0);
  document.querySelectorAll(".cart-count").forEach((badge) => {
    badge.textContent = count;
  });
}

function addProductToCart(productId) {
  const cart = readCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
}
// End Cart Helper Functions

// Begin GSAP Load Animation
function buildHoneycombReveal() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const overlay = document.createElement("div");
  overlay.className = "comb-reveal";
  overlay.setAttribute("aria-hidden", "true");

  const positions = [
    [0, 0],
    [-64, -38],
    [64, -38],
    [-64, 38],
    [64, 38],
    [0, -76],
    [0, 76]
  ];

  positions.forEach(([x, y], index) => {
    const tile = document.createElement("span");
    tile.className = "comb-reveal-tile";
    tile.style.setProperty("--x", `${x}px`);
    tile.style.setProperty("--y", `${y}px`);
    tile.style.opacity = index % 3 === 0 ? "0.72" : "1";
    overlay.append(tile);
  });

  document.body.prepend(overlay);

  gsap.fromTo(
    ".comb-reveal-tile",
    {
      x: (index, tile) => tile.style.getPropertyValue("--x"),
      y: (index, tile) => `${parseFloat(tile.style.getPropertyValue("--y")) - 180}px`,
      rotate: -10,
      scale: 0.9,
      opacity: 0
    },
    {
      x: (index, tile) => tile.style.getPropertyValue("--x"),
      y: (index, tile) => tile.style.getPropertyValue("--y"),
      rotate: 0,
      scale: 1,
      opacity: 1,
      duration: 0.55,
      stagger: {
        each: 0.035,
        from: "start"
      },
      ease: "bounce.out"
    }
  );

  gsap.to(overlay, {
    opacity: 0,
    delay: 0.85,
    duration: 0.25,
    ease: "power2.inOut",
    onComplete: () => overlay.remove()
  });
}
// End GSAP Load Animation

// Begin Main GSAP Animations
function initGsap() {
  if (!window.gsap) return;

  buildHoneycombReveal();
  gsap.from(".apiary-nav", { y: -24, opacity: 0, duration: 0.7, ease: "power2.out" });
  gsap.from(".hero-content > *,.page-hero .container > *,.simple-page-title .container > *", {
    y: 24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power2.out",
    delay: 0.15
  });

  const bee = document.querySelector(".flying-bee");
  if (bee) {
    const flight = gsap.timeline({ delay: 0.85 });
    flight
      .set(bee, { x: -180, y: 42, rotate: -8, scale: 0.95, opacity: 0 })
      .to(bee, {
        x: () => window.innerWidth * 0.66,
        y: -26,
        rotate: 7,
        opacity: 1,
        duration: 1.75,
        ease: "power2.out"
      })
      .to(bee, {
        y: "+=12",
        rotate: "-=4",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
  }

  gsap.from(".lift-card,.info-card", {
    y: 36,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "power2.out",
    delay: 0.25
  });
}
// End Main GSAP Animations

// Begin Home Page Honeycomb Facts
function initHoneycombFacts() {
  const tiles = document.querySelectorAll(".hex-tile");
  const panel = document.querySelector("#factPanel");
  if (!tiles.length || !panel) return;

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      tiles.forEach((item) => item.classList.remove("active"));
      tile.classList.add("active");
      panel.textContent = tile.dataset.fact;
      if (window.gsap) gsap.fromTo(panel, { y: 12, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.35 });
    });
  });
}
// End Home Page Honeycomb Facts

// Begin Product Page Filters
function initProductFiltering() {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  const filters = document.querySelectorAll("[data-filter]");
  const reset = document.querySelector("#resetFilters");
  const items = [...document.querySelectorAll(".product-item")];
  const empty = document.querySelector("#emptyProducts");

  function applyFilters() {
    const active = Object.fromEntries([...filters].map((filter) => [filter.dataset.filter, filter.value]));
    let shown = 0;

    items.forEach((item) => {
      const match = Object.entries(active).every(([key, value]) => value === "all" || item.dataset[key] === value);
      item.classList.toggle("d-none", !match);
      if (match) shown += 1;
    });

    empty.classList.toggle("d-none", shown !== 0);
  }

  filters.forEach((filter) => filter.addEventListener("change", applyFilters));
  reset.addEventListener("click", () => {
    filters.forEach((filter) => {
      filter.value = "all";
    });
    applyFilters();
  });
}
// End Product Page Filters

// Begin Product Modal
function initProductModal() {
  const modalElement = document.querySelector("#productModal");
  if (!modalElement || !window.bootstrap) return;

  const modal = new bootstrap.Modal(modalElement);
  const addButton = document.querySelector("#addToCartBtn");
  let selectedProduct = null;

  document.querySelectorAll("[data-product-id]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (!event.target.closest(".details-btn") && event.target.tagName !== "ARTICLE") return;
      selectedProduct = products[card.dataset.productId];
      document.querySelector("#modalImage").src = selectedProduct.image;
      document.querySelector("#modalImage").alt = selectedProduct.name;
      document.querySelector("#modalTitle").textContent = selectedProduct.name;
      document.querySelector("#modalType").textContent = selectedProduct.type;
      document.querySelector("#modalStory").textContent = selectedProduct.story;
      document.querySelector("#modalPrice").textContent = formatMoney(selectedProduct.price);
      modal.show();
    });
  });

  addButton.addEventListener("click", () => {
    if (!selectedProduct) return;
    addProductToCart(selectedProduct.id);
    addButton.textContent = "Added";
    setTimeout(() => {
      addButton.textContent = "Add to cart";
    }, 900);
  });
}
// End Product Modal

// Begin Cart Page
function renderCart() {
  const list = document.querySelector("#cartList");
  if (!list) return;

  const cart = readCart();
  const empty = document.querySelector("#cartEmpty");
  const entries = Object.entries(cart).filter(([id, qty]) => products[id] && qty > 0);

  list.innerHTML = "";
  empty.classList.toggle("d-none", entries.length !== 0);

  let total = 0;
  entries.forEach(([id, qty]) => {
    const product = products[id];
    total += product.price * qty;
    const row = document.createElement("article");
    row.className = "cart-row";
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h3>${product.name}</h3>
        <p>${formatMoney(product.price)} each</p>
      </div>
      <div class="qty-controls" aria-label="Quantity controls for ${product.name}">
        <button type="button" data-cart-action="decrease" data-id="${id}">-</button>
        <strong>${qty}</strong>
        <button type="button" data-cart-action="increase" data-id="${id}">+</button>
      </div>
    `;
    list.append(row);
  });

  document.querySelector("#subtotal").textContent = formatMoney(total);
  document.querySelector("#cartTotal").textContent = formatMoney(total);
}

function initCartPage() {
  const list = document.querySelector("#cartList");
  if (!list) return;

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const cart = readCart();
    const id = button.dataset.id;
    cart[id] = button.dataset.cartAction === "increase" ? (cart[id] || 0) + 1 : (cart[id] || 0) - 1;
    if (cart[id] <= 0) delete cart[id];
    saveCart(cart);
    renderCart();
  });

  document.querySelector(".checkout-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("was-validated");
    if (event.currentTarget.checkValidity()) {
      alert("Mock order placed. Thanks for testing the checkout flow!");
    }
  });

  renderCart();
}
// End Cart Page

// Begin About Page Process Timeline
function initProcessTimeline() {
  const panel = document.querySelector("#processPanel");
  if (!panel) return;

  document.querySelectorAll(".process-step").forEach((button) => {
    button.addEventListener("click", () => {
      const step = processSteps[Number(button.dataset.step)];
      document.querySelectorAll(".process-step").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      panel.innerHTML = `<span class="process-number">${step.number}</span><h3>${step.title}</h3><p>${step.body}</p>`;
      if (window.gsap) gsap.fromTo(panel, { x: 18, opacity: 0.35 }, { x: 0, opacity: 1, duration: 0.35 });
    });
  });
}
// End About Page Process Timeline

// Begin Visit Page Distance Calculator
function distanceMiles(from, to) {
  const radius = 3958.8;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function initGeolocation() {
  const button = document.querySelector("#distanceBtn");
  const result = document.querySelector("#distanceResult");
  if (!button || !result) return;

  button.addEventListener("click", () => {
    if (!navigator.geolocation) {
      result.textContent = "Geolocation is not supported in this browser.";
      return;
    }

    result.textContent = "Checking your distance...";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const user = { lat: position.coords.latitude, lon: position.coords.longitude };
        const miles = distanceMiles(user, apiaryLocation);
        result.textContent = `You are about ${miles.toFixed(1)} miles from Primrose Apiary.`;
      },
      () => {
        result.textContent = "Location permission was blocked, so distance could not be calculated.";
      }
    );
  });
}
// End Visit Page Distance Calculator

// Begin Leaflet Map
function initLeafletMap() {
  const mapElement = document.querySelector("#leafletMap");
  if (!mapElement || !window.L) return;

  const map = L.map(mapElement, {
    scrollWheelZoom: false
  }).setView([apiaryLocation.lat, apiaryLocation.lon], 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  L.marker([apiaryLocation.lat, apiaryLocation.lon])
    .addTo(map)
    .bindPopup("<strong>Primrose Apiary</strong><br>14 Primrose Dr<br>Katonah, NY 10536")
    .openPopup();
}
// End Leaflet Map

// Begin Contact Form Validation
function initContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  const fields = [...form.querySelectorAll("input[required], textarea[required]")];
  const success = document.querySelector("#contactSuccess");

  function validateField(field) {
    const error = field.parentElement.querySelector(".error-message");
    let message = "";
    if (!field.value.trim()) message = "This field is required.";
    if (field.type === "email" && field.value.trim() && !field.checkValidity()) message = "Enter a valid email address.";
    field.classList.toggle("is-invalid", Boolean(message));
    if (error) error.textContent = message;
    return !message;
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = fields.every(validateField);
    if (!valid) return;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    success.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) throw new Error("Formspree submission failed.");

      success.textContent = "Message successfully sent";
      success.style.display = "block";
      if (window.gsap) gsap.fromTo(success, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 });
      form.reset();
    } catch (error) {
      success.textContent = "Message could not send. Please try again.";
      success.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send inquiry";
    }
  });
}
// End Contact Form Validation

// Begin Page Initializers
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initGsap();
  initHoneycombFacts();
  initProductFiltering();
  initProductModal();
  initCartPage();
  initProcessTimeline();
  initGeolocation();
  initLeafletMap();
  initContactForm();
});
// End Page Initializers
