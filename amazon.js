import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}" 
          alt="${product.name}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars}.png" 
          alt="${product.rating.stars} star rating">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select aria-label="Select quantity" class="js-quantity-selector" data-product-id="${product.id}">
          ${Array.from({ length: 10 }, (_, i) => 
            `<option value="${i+1}" ${i === 0 ? 'selected' : ''}>${i+1}</option>`
          ).join('')}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart" data-product-id="${product.id}">
        <img src="images/icons/checkmark.png" alt="Added to cart">
        Added
      </div>

      <button 
        class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}"
        aria-label="Add ${product.name} to cart">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-product-grid').innerHTML = productsHTML;


// Updates the cart quantity in header
function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}


// Add-to-cart functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    // Get the selected quantity
    const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
    const quantity = parseInt(quantitySelector.value);

    // Add product to cart
    addToCart(productId, quantity);
    updateCartQuantity();

    // Show "Added to Cart" confirmation
    const addedMessage = document.querySelector(`.js-added-to-cart[data-product-id="${productId}"]`);
    addedMessage.style.opacity = 1;

    setTimeout(() => {
      addedMessage.style.opacity = 0;
    }, 1500);
  });
});

// Update cart quantity on page load
updateCartQuantity();
