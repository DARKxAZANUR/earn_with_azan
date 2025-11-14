// Products data
const products = [
    {
        id: 1,
        name: "Smart Watch",
        description: "Latest smartwatch with health monitoring",
        price: "₹2,499",
        image: "product_img1.jpg"
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        description: "Noise cancellation wireless earbuds",
        price: "₹1,799",
        image: "product_img2.jpg"
    },
    {
        id: 3,
        name: "Power Bank",
        description: "10000mAh fast charging power bank",
        price: "₹1,299",
        image: "product_img3.jpg"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with rich bass",
        price: "₹1,999",
        image: "product_img4.jpg"
    },
    {
        id: 5,
        name: "Fitness Band",
        description: "Waterproof fitness tracker with heart rate monitor",
        price: "₹1,599",
        image: "product_img5.jpg"
    }
];

// Load products on main page (4 products)
function loadFeaturedProducts() {
    const container = document.getElementById('productsContainer');
    if (container) {
        const featuredProducts = products.slice(0, 4);
        
        featuredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <button class="buy-now-btn" onclick="buyProduct(${product.id})">Buy Now</button>
                </div>
            `;
            container.appendChild(productCard);
        });

        // Add View All Products button
        const viewAllBtn = document.createElement('div');
        viewAllBtn.style.textAlign = 'center';
        viewAllBtn.style.marginTop = '2rem';
        viewAllBtn.innerHTML = `<button class="cta-btn" onclick="viewAllProducts()">View All Products</button>`;
        container.appendChild(viewAllBtn);
    }
}

// Load all products on products page
function loadAllProducts() {
    const container = document.getElementById('allProducts');
    if (container) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <button class="buy-now-btn" onclick="buyProduct(${product.id})">Buy Now</button>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

// Buy product function
function buyProduct(productId) {
    // Redirect to deposit page
    window.location.href = 'deposit.html';
}

// View all products
function viewAllProducts() {
    window.location.href = 'products.html';
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productsContainer')) {
        loadFeaturedProducts(); // Main page
    }
    if (document.getElementById('allProducts')) {
        loadAllProducts(); // Products page
    }
});