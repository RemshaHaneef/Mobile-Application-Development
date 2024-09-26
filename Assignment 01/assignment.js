class ShoppingCart {
    constructor() {
        this.cart = []; // Initialize the shopping cart as an empty array
    }

    // Function to add items to the cart
    addItem = (productId, productName, quantity, price) => {
        const product = { productId, productName, quantity, price }; // Create product object
        this.cart.push(product); // Add the product to the cart
    };

    // Function to remove an item from the cart by productId
    removeItem = (productId) => {
        const index = this.cart.findIndex(product => product.productId === productId); // Find index of the item
        if (index !== -1) {
            this.cart.splice(index, 1); // Remove the product from the cart using splice
        }
    };

    // Function to update the quantity of a specific item
    updateQuantity = (productId, newQuantity) => {
        this.cart = this.cart.map(product => 
            product.productId === productId ? { ...product, quantity: newQuantity } : product
        ); // Update the quantity using map
    };

    // Function to calculate the total cost of items in the cart
    calculateTotal = () => {
        return this.cart.reduce((total, product) => {
            return total + (product.price * product.quantity); // Calculate total price
        }, 0);
    };

    // Function to generate a summary of the cart
    displayCartSummary = () => {
        return this.cart.map(product => {
            return {
                name: product.productName,
                quantity: product.quantity,
                totalPrice: (product.price * product.quantity).toFixed(2) // Total price for each product
            };
        });
    };

    // Function to filter out items with zero quantity
    filterZeroQuantity = () => {
        this.cart = this.cart.filter(product => product.quantity > 0); // Keep products with quantity > 0
    };

    // Bonus: Function to apply a discount code
    applyDiscount = (discountCode) => {
        const discountMapping = {
            'SAVE10': 0.10, // 10% discount
            'SAVE20': 0.20  // 20% discount
        };

        const discount = discountMapping[discountCode] || 0; // Get discount rate
        const total = this.calculateTotal(); // Calculate current total
        return total - (total * discount); // Apply discount to total
    };
}

// Example usage:
const cart = new ShoppingCart();
cart.addItem(1, 'Apple', 2, 0.99); // Add 2 Apples
cart.addItem(2, 'Banana', 1, 0.59); // Add 1 Banana
cart.addItem(3, 'Orange', 0, 0.79); // Add 0 Oranges (will be filtered out later)

console.log('Cart Summary:', cart.displayCartSummary()); // Display initial summary
console.log('Total Cost:', cart.calculateTotal().toFixed(2)); // Display total cost

cart.updateQuantity(2, 3); // Update Banana quantity to 3
console.log('Updated Cart Summary:', cart.displayCartSummary()); // Display updated summary

cart.filterZeroQuantity(); // Filter out items with zero quantity
console.log('Filtered Cart Summary:', cart.displayCartSummary()); // Display filtered summary

const totalWithDiscount = cart.applyDiscount('SAVE10'); // Apply discount
console.log('Total after discount:', totalWithDiscount.toFixed(2)); // Display total after discount

cart.removeItem(1); // Remove item with ID 1 (Apple)
console.log('Final Cart Summary:', cart.displayCartSummary()); // Display final summary

