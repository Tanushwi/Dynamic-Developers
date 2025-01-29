// Retrieve cart from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

// Function to display the cart items and total price
function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    cartItemsElement.innerHTML = ''; // Clear previous cart items
    totalPrice = 0; // Reset total price

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ₹${item.price} 
            <i class="fas fa-trash remove-btn" data-index="${index}" title="Remove item"></i>
        `;
        cartItemsElement.appendChild(li);

        totalPrice += item.price; // Calculate total price
    });

    if (totalPriceElement) totalPriceElement.textContent = totalPrice.toFixed(2); // Display total price if element exists
    if (cartCountElement) cartCountElement.textContent = cart.length; // Update cart count if element exists
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Refresh cart display
    updateCartCount(); // Update cart count after removal
}

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice }); // Add new item to cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Refresh cart display
    updateCartCount(); // Update cart count after adding an item
}

// Function to update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length; // Update the count directly from the cart variable
}

// Event listener to handle remove buttons
document.getElementById('cart-items')?.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        const index = e.target.getAttribute('data-index');
        removeFromCart(index); // Remove the item when trash icon is clicked
    }
});

// Add to Cart button click event for "Buy Now" buttons
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const itemName = this.getAttribute('data-name');
        const itemPrice = parseFloat(this.getAttribute('data-price'));

        addToCart(itemName, itemPrice); // Add item to cart and refresh display
    });
});

// Display cart items on page load
displayCart();
updateCartCount(); // Ensure cart count is updated on page load