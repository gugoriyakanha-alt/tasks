const products = [
    { id: 1, title: "Wireless Headphones", price: 1299, img: "https://m.media-amazon.com/images/I/51YKwVXBhIL._AC_UY327_FMwebp_QL65_.jpg", desc: "High-fidelity sound, Bluetooth 5.0, 24-hour battery life." },
    { id: 2, title: "Smart Fitness Band", price: 699, img: "https://m.media-amazon.com/images/I/71mpuO4LqeL._AC_UY327_FMwebp_QL65_.jpg", desc: "Track workouts, sleep, and heart rate. Waterproof design." },
    { id: 3, title: "Portable Bluetooth Speaker", price: 949, img: "https://m.media-amazon.com/images/I/61ygYGBZUBL._AC_UY327_FMwebp_QL65_.jpg", desc: "Loud stereo sound, compact and splash proof." },
    { id: 4, title: "E-Book Reader", price: 3299, img: "https://m.media-amazon.com/images/I/41W83Z+mMLL._AC_UY327_FMwebp_QL65_.jpg", desc: "6-inch glare-free display, weeks-long battery, lightweight." },
    { id: 5, title: "Wireless Mouse", price: 459, img: "https://m.media-amazon.com/images/I/51CDRuhBX2L._AC_UY327_FMwebp_QL65_.jpg", desc: "Ergonomic, 10m range, up to 12 months battery." },
    { id: 6, title: "USB-C Power Bank", price: 899, img: "https://m.media-amazon.com/images/I/61MgniaWJPL._AC_UY327_FMwebp_QL65_.jpg", desc: "10,000mAh, fast charging, slimmer design." },
    { id: 7, title: "Noise Cancelling Earbuds", price: 1799, img: "https://m.media-amazon.com/images/I/51RaySTbIVL._AC_UY327_FMwebp_QL65_.jpg", desc: "Clear calls, deep bass, excellent comfort." },
    { id: 8, title: "Desk Lamp with USB", price: 549, img: "https://m.media-amazon.com/images/I/51DcV4YJw2L._AC_UL480_FMwebp_QL65_.jpg", desc: "Adjustable brightness, built-in USB charger, energy saving." },
    { id: 9, title: "Mini Tripod Stand", price: 399, img: "https://m.media-amazon.com/images/I/511OTL0YwEL._AC_UY327_FMwebp_QL65_.jpg", desc: "Perfect for selfies, web meetings, compact and sturdy." },
    { id: 10, title: "Laptop Stand", price: 749, img: "https://m.media-amazon.com/images/I/71vEyzFK2rL._AC_UY327_FMwebp_QL65_.jpg", desc: "Height adjustable, improves posture, portable metal build." }
];

let cart = [];

function updateCartInfo() {
    const cartInfo = document.getElementById('cartInfo');
    if (cart.length === 0) {
        cartInfo.textContent = 'Cart is Empty';
    } else {
        let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        let totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
        cartInfo.textContent = `Cart: ${totalItems} item${totalItems > 1 ? 's' : ''} | ₹${totalPrice}`;
    }
}

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    const inCart = cart.find(item => item.id === id);
    if (inCart) {
        inCart.qty += 1;
    } else {
        cart.push({ ...prod, qty: 1 });
    }
    updateCartInfo();
    showHome();
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if(itemIndex !== -1){
        if(cart[itemIndex].qty > 1){
            cart[itemIndex].qty -= 1;  // remove one item only
        } else {
            cart.splice(itemIndex, 1);  // remove item completely if qty is 1
        }
    }
    updateCartInfo();
    showCart();
}

function goHome() {
    location.hash = '#home';
}

function goCart() {
    location.hash = '#cart';
}

function showHome() {
    const view = document.getElementById('view');
    let html = '<h2>Products</h2><div id="productList">';
    html += products.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="product-desc">${product.desc}</div>
            <div class="product-price">₹${product.price}</div>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
    html += '</div>';
    view.innerHTML = html;
}

function showCart() {
    const view = document.getElementById('view');
    let html = '<h2>Your Cart</h2>';
    if (cart.length === 0) {
        html += '<p>Cart is empty.</p>';
    } else {
        html += '<div id="cartList">';
        html += cart.map(item => `
            <div class="cart-card">
                <img src="${item.img}" alt="${item.title}">
                <div class="cart-title">${item.title}</div>
                <div class="cart-desc">${item.desc}</div>
                <div class="cart-price">₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove One</button>
            </div>
        `).join('');
        html += '</div>';
    }
    view.innerHTML = html;
}

// Initial rendering & hash/page navigation
window.addEventListener('hashchange', () => {
    if (location.hash === '#cart') showCart();
    else showHome();
});

// Page load default
if (location.hash === '#cart') {
    showCart();
} else {
    showHome();
}
updateCartInfo();
