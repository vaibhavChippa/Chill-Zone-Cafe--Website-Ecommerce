// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const menuItems = [
    { id: 1, name: "Espresso", price: 3.50, image: "https://via.placeholder.com/300x200?text=Coffee" },
    { id: 2, name: "Chocolate Croissant", price: 4.00, image: "https://via.placeholder.com/300x200?text=Pastry" },
    { id: 3, name: "Turkey Sandwich", price: 6.50, image: "https://via.placeholder.com/300x200?text=Sandwich" },
    { id: 4, name: "Latte", price: 4.50, image: "https://via.placeholder.com/300x200?text=Latte" },
];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const id = parseInt(button.getAttribute('data-id'));
        const item = menuItems.find(i => i.id === id);
        const existingItem = cart.find(i => i.id === id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${item.name} added to cart!`);
    });
});

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

updateCartCount();

// Cart Page
if (document.querySelector('.cart')) {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button onclick="removeItem(${item.id})">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    window.updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(id);
            return;
        }
        const item = cart.find(i => i.id === id);
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    window.removeItem = (id) => {
        cart = cart.filter(i => i.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    renderCart();
}

// Checkout Page
if (document.querySelector('.checkout')) {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');

    function renderOrderSummary() {
        orderItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const orderItem = document.createElement('div');
            orderItem.innerHTML = `
                <p>${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}</p>
            `;
            orderItems.appendChild(orderItem);
        });

        orderTotal.textContent = total.toFixed(2);
    }

    renderOrderSummary();

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully! Thank you for choosing Café Bliss.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'index.html';
    });
}

// Contact Form
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent successfully! We’ll get back to you soon.');
        e.target.reset();
    });
}