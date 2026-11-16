
const foods = [
    {
        id: 1,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 250,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
    },
    {
        id: 2,
        name: "Veg Burger",
        category: "Burger",
        price: 120,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 3,
        name: "Cold Coffee",
        category: "Drinks",
        price: 90,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },
    {
        id: 4,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 150,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    },
    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 350,
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500"
    },
    {
        id: 6,
        name: "Chicken Burger",
        category: "Burger",
        price: 180,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500"
    },
    {
        id: 7,
        name: "Fresh Juice",
        category: "Drinks",
        price: 70,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
    },
    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 80,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
    }
];

let cart = [];

function displayFoods(category = "All") {
    const container = document.getElementById("food-container");

    const filteredFoods = category === "All"
        ? foods
        : foods.filter(food => food.category === category);

    container.innerHTML = filteredFoods.map(food => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>₹${food.price}</p>
            <button onclick="addToCart(${food.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function filterFood(category) {
    displayFoods(category);
}

function addToCart(id) {
    const food = foods.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...food, quantity: 1});
    }

    updateCart();
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    ${item.quantity}

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>
                </div>

                <button class="remove"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `;
    }).join("");

    document.getElementById("total").textContent = total;
    document.getElementById("cart-count").textContent = count;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }
}

function toggleCart() {
    document.getElementById("cart-section")
        .scrollIntoView({ behavior: "smooth" });
}

function checkout() {
    if (cart.length === 0) {
        alert("Please add food items to your cart!");
        return;
    }

    alert("Thank you for your order! Total: ₹" +
        document.getElementById("total").textContent);

    cart = [];
    updateCart();
}

// Display food items when page loads
displayFoods();
updateCart();
