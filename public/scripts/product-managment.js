
deleteItemBtns = document.querySelectorAll(".product-item button")



async function deleteItemFunction(event){
    const  buttonElem = event.target;
    const csrfToken = buttonElem.dataset.csrf
    const productId = buttonElem.dataset.productid

    let response;
    

    try {
        response = await fetch(`/admin/products/${productId}`+ '?_csrf=' + csrfToken,{method:"DELETE"})

        if (!response.ok) {
          alert("Fetching comments failed");
          return;
        }

        buttonElem.parentElement.parentElement.parentElement.parentElement.remove()

        const responseData = await response.json()
        alert(responseData.message)

    } catch (error) {
        alert("Something went wrong!");
        return;
    }
}



for (const deleteProductButtonElement of deleteItemBtns) {
  deleteProductButtonElement.addEventListener('click', deleteItemFunction);
}