const deleteProductButtonElements = document.querySelectorAll('.product-item button');

const deleteProduct = async (event) => {
    const buttonElement = event.target;
    const productID = buttonElement.dataset['productid'];
    const csrfToken = buttonElement.dataset['csrf'];

    const response = await fetch('/admin/products/' + productID + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductButtonElement of deleteProductButtonElements)
{
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}