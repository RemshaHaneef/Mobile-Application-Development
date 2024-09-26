// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.cart = []; // Initialize an empty cart
    }

    // Add Items to the Cart
    addItem = (productId, productName, quantity, price) => {
        const product = { productId, productName, quantity, price };
        this.cart.push(product); // Add product to cart
    };

    // Remove an Item from the Cart by productId
    removeItem = (productId) => {
        this.cart = this.cart.filter(item => item.productId !== productId); // Remove item using filter
    };

    // Update the Quantity of an Item in the Cart
    updateQuantity = (productId, newQuantity) => {
        const item = this.cart.find(item => item.productId === productId); // Find the item
        if (item) {
            item.quantity = newQuantity; // Update quantity if item is found
        }
    };

    // Calculate Total Cost
    calculateTotal = () => {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0); // Calculate total using reduce
    };

    // Display Cart Summary
    displaySummary = () => {
        const summary = this.cart
            .filter(item => item.quantity > 0) // Filter out items with zero quantity
            .map(item => ({
                name: item.productName,
                quantity: item.quantity,
                total: item.price * item.quantity
            }));

        summary.forEach(item => {
            console.log(`Product: ${item.name}, Quantity: ${item.quantity}, Total Price: $${item.total.toFixed(2)}`);
        });
    };

    // Apply Discount Code
    applyDiscount = (discountCode) => {
        const discountRates = {
            'SAVE10': 0.10, // 10% discount
            'SAVE20': 0.20  // 20% discount
        };
        
        const discountRate = discountRates[discountCode] || 0;
        const total = this.calculateTotal();
        const discountedTotal = total - (total * discountRate);
        
        return discountedTotal; // Return the total after discount
    };
}

// Example Usage
const myCart = new ShoppingCart();

// Adding items to the cart
myCart.addItem(1, 'Shoes', 1, 999.99);
myCart.addItem(2, 'Bag', 2, 199.99);
myCart.addItem(3, 'Jwellery', 1, 49.99);

// Displaying cart summary
console.log('Cart Summary:');
myCart.displaySummary();

// Updating quantity
myCart.updateQuantity(2, 1); // Change quantity of Headphones to 1

// Display updated cart summary
console.log('Updated Cart Summary:');
myCart.displaySummary();

// Calculating total cost
const totalCost = myCart.calculateTotal();
console.log(`Total Cost: $${totalCost.toFixed(2)}`);

// Applying a discount code
const totalAfterDiscount = myCart.applyDiscount('SAVE10');
console.log(`Total Cost after discount: $${totalAfterDiscount.toFixed(2)}`);

// Removing an item
myCart.removeItem(1); // Remove Laptop from the cart

// Displaying final cart summary
console.log('Final Cart Summary:');
myCart.displaySummary();
