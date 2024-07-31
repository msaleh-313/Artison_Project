import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {

    console.log("cart controller initialized")
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
      return
    }

    let total = 0
    for (let i=0; i < cart.length; i++) {
      const item = cart[i]
      total += item.price * item.quantity
      const div = document.createElement("div")
      div.classList.add("mt-2")
      div.innerText = `Item: ${item.name} - $${item.price/100.0} - Size: ${item.size} - Quantity: ${item.quantity}`
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Remove"
      console.log("item.id: ", item.id)
      deleteButton.value = JSON.stringify({id: item.id, size: item.size})
      deleteButton.classList.add("bg-gray-500", "rounded", "text-white", "px-2", "py-1", "ml-2")
      deleteButton.addEventListener("click", this.removeFromCart)
      div.appendChild(deleteButton)
      this.element.prepend(div)
    }

    const totalEl = document.createElement("div")
    totalEl.innerText= `Total: $${total/100.0}`
    let totalContainer = document.getElementById("total")
    totalContainer.appendChild(totalEl)
  }

  clear() {
    localStorage.removeItem("cart")
    window.location.reload()
  }

  removeFromCart(event) {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const values = JSON.parse(event.target.value)
    const {id, size} = values
    const index = cart.findIndex(item => item.id === id && item.size === size)
    if (index >= 0) {
      cart.splice(index, 1)
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    window.location.reload()
  }

//   checkout() {

//     //LOCALSTORAGE SE DATA GET KARO JSON KO PARSE KAR K
//     const cart = JSON.parse(localStorage.getItem("cart"))

//     // STRIPE API KO DATA BEJHNE K LIYE PAYLOAD TYAR KARO JO SERVER PER JAYEGA
//     const payload = {
//       authenticity_token: "",
//       cart: cart
//     }

//     //META TAG SE CSRF TOKEN GET KARO SECURITY PURPOSE K LIYE
//     const csrfToken = document.querySelector("[name='csrf-token']").content

//     fetch("/checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRF-Token": csrfToken
//       },
//       body: JSON.stringify(payload)
//     }).then(response => {
//         if (response.ok) {
//           response.json().then(body => {
//             window.location.href = body.url
//           })
//         } else {
//           response.json().then(body => {
//             const errorEl = document.createElement("div")
//             errorEl.innerText = `There was an error processing your order. ${body.error}`
//             let errorContainer = document.getElementById("errorContainer")
//             errorContainer.appendChild(errorEl)
//           })
//         }
//       })
//   }

checkout = async () => {
  // Get cart data from local storage
  const cart = JSON.parse(localStorage.getItem("cart"));

  // Create payload for Stripe API
  const payload = {
    authenticity_token: "",
    cart: cart
  };

  // Get CSRF token from meta tag
  const csrfToken = document.querySelector("[name='csrf-token']").content;

  try {
    // Send request to server using fetch API
    const response = await fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Parse JSON response and redirect to Stripe URL
      const body = await response.json();
      window.location.href = body.url;
    } else {
      // Parse JSON response and display error message
      const body = await response.json();
      const errorContainer = document.getElementById("errorContainer");
      const errorEl = document.createElement("div");
      errorEl.innerText = `There was an error processing your order. ${body.error}`;
      errorContainer.appendChild(errorEl);
    }
  } catch (error) {
    // Handle network errors
    console.error("Error:", error);
  }
}
}