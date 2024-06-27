
const socketCliente = io();

// Manejar la actualización de la lista de productos
socketCliente.on("productos", (products) => {
    console.log(products);
    updateProductList(products);
});

// Función para actualizar la lista de productos en la página web
function updateProductList(products) {
    let div = document.getElementById("list-products");
    let productos = "";

    products.forEach((product) => {
        productos += `
            <div class="bg-gray-600 p-6 rounded-lg shadow-lg">
                <div class="bg-gray-700 text-white p-4 rounded-t-lg">Code: ${product.code}</div>
                <div class="p-4">
                    <h4 class="text-2xl font-bold mb-2">${product.title}</h4>
                    <p class="text-gray-300 mb-2">
                        <li>Id: ${product.id}</li>
                        <li>Description: ${product.description}</li>
                        <li>Price: $${product.price}</li>
                        <li>Category: ${product.category}</li>
                        <li>Status: ${product.status}</li>
                        <li>Stock: ${product.stock}</li>
                        <li>Thumbnail: <img src="${product.thumbnail}" alt="img" class="img-thumbnail img-fluid"></li>
                    </p>
                </div>
                <div class="flex justify-center mb-4">
                    <button type="button" class="bg-red-500 text-white py-2 px-4 rounded delete-btn" data-product-id="${product.id}" onclick="deleteProduct(${product.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    div.innerHTML = productos;
}

// Manejar el envío del formulario para agregar productos
let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked; // Obtener el valor del checkbox

    socketCliente.emit("addProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
        status, // Agrega el campo status al objeto enviado al servidor
    });

    form.reset();
});

// Manejar la eliminación de productos
function deleteProduct(productId) {
    socketCliente.emit("deleteProduct", productId);
}

// Manejar los clics en los botones de eliminación
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.getAttribute("data-product-id");
        socketCliente.emit("deleteProduct", productId);
    }
});

// Escuchar las actualizaciones de productos
socketCliente.on("productosupdated", (products) => {
    updateProductList(products);
});
