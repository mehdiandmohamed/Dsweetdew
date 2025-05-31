function openForm(product) {
  document.getElementById('orderModal').style.display = 'flex';
}

window.onclick = function (event) {
  const modal = document.getElementById('orderModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function addProduct() {
  const container = document.getElementById('productFields');
  const entry = document.querySelector('.product-entry');
  const clone = entry.cloneNode(true);
  clone.querySelector('.quantity-input').value = 1;
  clone.querySelector('.remove-btn').onclick = function () {
    container.removeChild(clone);
    calculateTotal();
  };
  container.appendChild(clone);
  updateInputs();
}

function removeProduct(button) {
  const container = document.getElementById('productFields');
  const productEntry = button.closest('.product-entry');
  container.removeChild(productEntry);
  calculateTotal();
}

function calculateTotal() {
  const sizes = document.querySelectorAll('.size-select');
  const quantities = document.querySelectorAll('.quantity-input');
  let total = 0;
  for (let i = 0; i < sizes.length; i++) {
    let price = 0;
    if (sizes[i].value === 'Small') price = 5.99;
    else if (sizes[i].value === 'Medium') price = 7.99;
    else if (sizes[i].value === 'Large') price = 9.99;
    total += price * parseInt(quantities[i].value);
  }
  document.getElementById('totalPriceDisplay').innerText = `Total: $${total.toFixed(2)}`;
}

function updateInputs() {
  const quantityInputs = document.getElementsByClassName('quantity-input');
  for (let input of quantityInputs) {
    input.removeEventListener('input', calculateTotal); // Prevent duplicates
    input.addEventListener('input', calculateTotal);
  }

  const sizeSelects = document.getElementsByClassName('size-select');
  for (let select of sizeSelects) {
    select.removeEventListener('change', calculateTotal);
    select.addEventListener('change', calculateTotal);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updateInputs();
  calculateTotal();

  document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Show confirmation
    document.getElementById("thankYou").style.display = "block";
    document.getElementById("orderModal").style.display = "none";

    // Placeholder: send email manually or use EmailJS/Formspree
    console.log("Form submitted!");
  });
});
