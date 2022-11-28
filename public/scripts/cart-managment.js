

const cartBtn = document.querySelector("#product-info button")
const cartBadgeElement = document.querySelector(".nav-items .badge");




async function addToCart(event){
    const buttonElem = event.target;
    const csrfToken = buttonElem.dataset.csrf;
    const productId = buttonElem.dataset.productid;
    const data = {productId:productId,_csrf:csrfToken}

    let response;

    try {
        
        response = await fetch(`/cart/items`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
    } catch (error) {
        alert("Something went wrong!")
        return;
        
    }

    if (!response.ok) {
        alert("Something went wrong!");
        return;
      }

    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotalItems;

    cartBadgeElement.textContent = newTotalQuantity;

}

cartBtn.addEventListener("click",addToCart)