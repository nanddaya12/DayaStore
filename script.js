// Data structure for products
const products = [
    { id: 1, name: "Premium Wireless Headset", price: 18000, image: "headset.webp", description: "Studio quality sound with noise cancellation.", category: "Electronics" },
    { id: 2, name: "Smart Watch V2", price: 30000, image: "smart-watch.webp", description: "Track your fitness and receive notifications.", category: "Wearables" },
    { id: 3, name: "Mechanical Keyboard", price: 12000, image: "keyboard.webp", description: "Tactile keys for superior typing experience.", category: "Electronics" },
    { id: 4, name: "4K Webcam Pro", price: 8000, image: "webcam.webp", description: "Crystal clear video for professional calls.", category: "Electronics" },
    { id: 5, name: "Wireless Mouse", price: 4000, image: "mouse.webp", description: "Ergonomic design with long battery life.", category: "Electronics" },
    { id: 6, name: "Bluetooth Speaker", price: 10000, image: "speaker.webp", description: "Portable speaker with deep bass.", category: "Audio" },
    { id: 7, name: "Fitness Tracker", price: 17000, image: "fitness-tracker.webp", description: "Monitor your health metrics.", category: "Wearables" },
    { id: 8, name: "Gaming Headset", price: 15000, image: "gaming-headset.webp", description: "Immersive audio for gamers.", category: "Gaming" },
    { id: 9, name: "Smartphone Stand", price: 1500, image: "smartphone-stand.webp", description: "Adjustable stand for your phone.", category: "Accessories" },
    { id: 10, name: "Portable Charger", price: 5000, image: "portable-charger.webp", description: "Fast charging power bank.", category: "Electronics" },
    { id: 11, name: "VR Headset", price: 45000, image: "vr-headset.webp", description: "Enter virtual worlds.", category: "Gaming" },
    { id: 12, name: "Wireless Earbuds", price: 8000, image: "wireless-earbuds.webp", description: "True wireless freedom.", category: "Audio" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

const productGrid = document.getElementById('productGrid');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const checkoutModal = document.getElementById('checkoutConfirmationModal');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const darkModeToggle = document.getElementById('darkModeToggle');
const wishlistBtn = document.getElementById('wishlistBtn');
const wishlistModal = document.getElementById('wishlistModal');
const wishlistOverlay = document.getElementById('wishlistOverlay');
const wishlistItems = document.getElementById('wishlistItems');
const emptyWishlistMessage = document.getElementById('emptyWishlistMessage');
const productDetailsModal = document.getElementById('productDetailsModal');
const productDetailsOverlay = document.getElementById('productDetailsOverlay');


// --- Utility Functions ---
const formatCurrency = (amount) => {
    return `PKR ${amount.toFixed(2)}`;
};

const updateCartDisplay = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotalElement.textContent = formatCurrency(0);
        if (cartCountElement) cartCountElement.textContent = '0';
        if (mobileCartCount) mobileCartCount.textContent = '0';
        return;
    }

    emptyCartMessage.style.display = 'none';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm';
        cartItemElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-md">
                <div>
                    <p class="font-semibold text-gray-800">${item.name}</p>
                    <p class="text-sm text-gray-500">${formatCurrency(item.price)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="changeQuantity(${item.id}, -1)" class="px-2 py-1 bg-gray-200 text-gray-700 rounded">-</button>
                <span class="px-2">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)" class="px-2 py-1 bg-gray-200 text-gray-700 rounded">+</button>
                <p class="font-bold text-lg text-indigo-600">${formatCurrency(itemTotal)}</p>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalElement.textContent = formatCurrency(total);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) cartCountElement.textContent = totalQuantity;
    if (mobileCartCount) mobileCartCount.textContent = totalQuantity;
};

// Function is in global scope so it can be called from onclick in HTML
window.toggleCart = (open) => {
    if (open) {
        cartModal.classList.add('open');
        cartOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    } else {
        cartModal.classList.remove('open');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

const showCheckoutModal = () => {
    checkoutModal.classList.remove('hidden');
};

const hideCheckoutModal = () => {
    checkoutModal.classList.add('hidden');
};

// --- Cart Functions (Global Scope for inline HTML clicks) ---
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    toggleCart(true); // Open cart automatically
};

window.changeQuantity = (productId, change) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartDisplay();
};

window.removeFromCart = (productId) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    updateCartDisplay();
};

window.handleCheckout = () => {
    if (cart.length === 0) return;

    // Show shipping modal first
    toggleShippingModal(true);
    toggleCart(false);
};

window.toggleShippingModal = (open) => {
    const shippingModal = document.getElementById('shippingModal');
    const shippingOverlay = document.getElementById('cartOverlay'); // Reuse cart overlay

    if (open) {
        shippingModal.classList.remove('hidden');
        shippingOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        shippingModal.classList.add('hidden');
        shippingOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

window.handleShippingSubmit = (event) => {
    event.preventDefault();

    // Collect shipping data
    const shippingData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address1: document.getElementById('address1').value.trim(),
        address2: document.getElementById('address2').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        country: document.getElementById('country').value
    };

    // Basic validation
    if (!shippingData.firstName || !shippingData.lastName || !shippingData.email ||
        !shippingData.phone || !shippingData.address1 || !shippingData.city ||
        !shippingData.state || !shippingData.zipCode || !shippingData.country) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(shippingData.phone.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Store shipping data
    localStorage.setItem('shippingDetails', JSON.stringify(shippingData));

    // Close shipping modal and open payment modal
    toggleShippingModal(false);
    showPaymentModal();
};

window.showPaymentModal = () => {
    // This will be handled by payment.js
    if (typeof showPaymentMethodModal === 'function') {
        showPaymentMethodModal();
    }
};

// --- New Functions ---
const filterProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    renderProducts(filtered);
};

// --- Wishlist and Other Functions ---
window.toggleWishlist = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(product);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderProducts();
};

window.toggleWishlistModal = (open) => {
    if (open) {
        updateWishlistDisplay();
        wishlistModal.classList.remove('hidden');
        wishlistOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        wishlistModal.classList.add('hidden');
        wishlistOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

const updateWishlistDisplay = () => {
    wishlistItems.innerHTML = '';
    if (wishlist.length === 0) {
        emptyWishlistMessage.style.display = 'block';
        return;
    }
    emptyWishlistMessage.style.display = 'none';
    wishlist.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm';
        itemElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-md">
                <div>
                    <p class="font-semibold text-gray-800">${item.name}</p>
                    <p class="text-sm text-gray-500">${formatCurrency(item.price)}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="addToCart(${item.id})" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 2-1.58L23 6H6"/></svg>
                    <span>Add to Cart</span>
                </button>
                <button onclick="toggleWishlist(${item.id})" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        `;
        wishlistItems.appendChild(itemElement);
    });
};

const renderProducts = (productList = products) => {
    productGrid.innerHTML = '';
    productList.forEach(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        const productCard = document.createElement('div');
        productCard.className = 'bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-1000 overflow-hidden group product-card transform hover:-translate-y-4 hover:rotate-2 hover:scale-105 border border-white/20 h-[280px] md:h-[480px] flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500';
        productCard.innerHTML = `
            <div class="relative overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img src="${product.image}"
                     loading="lazy"
                     onerror="this.onerror=null;this.src='https://placehold.co/400x300/a855f7/ffffff?text=Image+Missing'"
                     alt="${product.name}" class="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110">
                <div class="absolute top-3 left-3 z-20">
                    <span class="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">${product.category}</span>
                </div>
                <button onclick="toggleWishlist(${product.id})" class="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 z-20 ${isInWishlist ? 'text-red-500' : 'text-gray-400'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${isInWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <div class="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button onclick="viewProductDetails(${product.id})" class="w-full px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-lg hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl">
                        Quick View
                    </button>
                </div>
            </div>
            <div class="p-6 flex flex-col min-h-[200px]">
                <div class="flex items-start justify-between mb-3 h-16">
                    <h3 class="text-xl font-bold text-gray-900 line-clamp-2 leading-tight flex-1 overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${product.name}</h3>
                    <div class="flex items-center ml-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                        <span class="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mb-4 h-10 overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${product.description}</p>
                <div class="mt-auto">
                    <div class="flex flex-col mb-4">
                        <span class="text-xl md:text-3xl font-extrabold text-indigo-600">${formatCurrency(product.price)}</span>
                        <span class="text-xs text-gray-500 line-through">${formatCurrency(product.price * 1.2)}</span>
                    </div>
                    <button onclick="addToCart(${product.id})" class="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 2-1.58L23 6H6"/></svg>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
};

window.viewProductDetails = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const detailsContent = document.getElementById('productDetailsContent');
    detailsContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6">
            <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 h-64 object-cover rounded-lg">
            <div class="flex-1">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">${product.name}</h2>
                <p class="text-lg text-gray-600 mb-4">${product.description}</p>
                <p class="text-2xl font-extrabold text-indigo-600 mb-4">${formatCurrency(product.price)}</p>
                <p class="text-sm text-gray-500 mb-4">Category: ${product.category}</p>
                <button onclick="addToCart(${product.id}); toggleProductDetailsModal(false);" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 2-1.58L23 6H6"/></svg>
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    `;
    toggleProductDetailsModal(true);
};

window.toggleProductDetailsModal = (open) => {
    if (open) {
        productDetailsModal.classList.remove('hidden');
        productDetailsOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        productDetailsModal.classList.add('hidden');
        productDetailsOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

window.toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ?
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 6.34-1.41 1.41"/><path d="m19.07 19.07-1.41 1.41"/></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
};

// --- Mobile Elements ---
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileCategoryFilter = document.getElementById('mobileCategoryFilter');
const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
const mobileWishlistBtn = document.getElementById('mobileWishlistBtn');
const mobileOpenCartBtn = document.getElementById('mobileOpenCartBtn');
const mobileCartCount = document.getElementById('mobileCartCount');

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay();
    if (isDarkMode) {
        document.body.classList.add('dark');
        updateDarkModeIcons();
    }

    // Desktop Event Listeners
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    if (wishlistBtn) wishlistBtn.addEventListener('click', () => toggleWishlistModal(true));
    if (wishlistOverlay) wishlistOverlay.addEventListener('click', () => toggleWishlistModal(false));
    if (productDetailsOverlay) productDetailsOverlay.addEventListener('click', () => toggleProductDetailsModal(false));
    if (document.getElementById('openCartBtn')) document.getElementById('openCartBtn').addEventListener('click', () => toggleCart(true));
    if (document.getElementById('closeCartBtn')) document.getElementById('closeCartBtn').addEventListener('click', () => toggleCart(false));
    if (document.getElementById('checkoutBtn')) document.getElementById('checkoutBtn').addEventListener('click', window.handleCheckout);
    if (document.getElementById('closeCheckoutModalBtn')) document.getElementById('closeCheckoutModalBtn').addEventListener('click', hideCheckoutModal);

    // Shipping modal event listeners
    if (document.getElementById('shippingForm')) document.getElementById('shippingForm').addEventListener('submit', window.handleShippingSubmit);
    if (document.getElementById('closeShippingModalBtn')) document.getElementById('closeShippingModalBtn').addEventListener('click', () => toggleShippingModal(false));
    if (document.getElementById('backToCartBtn')) document.getElementById('backToCartBtn').addEventListener('click', () => {
        toggleShippingModal(false);
        toggleCart(true);
    });

    // Mobile Event Listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            if (searchInput) searchInput.value = e.target.value;
            filterProducts();
        });
    }

    if (mobileCategoryFilter) {
        mobileCategoryFilter.addEventListener('change', (e) => {
            if (categoryFilter) categoryFilter.value = e.target.value;
            filterProducts();
        });
    }

    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
    }

    if (mobileWishlistBtn) {
        mobileWishlistBtn.addEventListener('click', () => toggleWishlistModal(true));
    }

    if (mobileOpenCartBtn) {
        mobileOpenCartBtn.addEventListener('click', () => toggleCart(true));
    }

    // Sync desktop search with mobile search
    if (searchInput && mobileSearchInput) {
        searchInput.addEventListener('input', (e) => {
            mobileSearchInput.value = e.target.value;
        });
    }

    if (categoryFilter && mobileCategoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            mobileCategoryFilter.value = e.target.value;
        });
    }
});

function updateDarkModeIcons() {
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 6.34-1.41 1.41"/><path d="m19.07 19.07-1.41 1.41"/></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDarkMode ? sunIcon : moonIcon;
    }
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.innerHTML = isDarkMode ? sunIcon.replace('width="24" height="24"', 'width="18" height="18"') : moonIcon.replace('width="24" height="24"', 'width="18" height="18"');
    }
}
