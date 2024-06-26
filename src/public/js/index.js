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
            <div class="card bg-gray-300 mb-3 mx-4 my-4 max-w-xs">
                <div class="card-header bg-gray-500 text-white">code: ${product.code}</div>
                <div class="card-body">
                    <h4 class="card-title text-xl font-bold">${product.title}</h4>
                    <p class="card-text">
                        <li>id: ${product.id}</li>
                        <li>description: ${product.description}</li>
                        <li>price: $${product.price}</li>
                        <li>category: ${product.category}</li>
                        <li>status: ${product.status}</li>
                        <li>stock: ${product.stock}</li>
                        <li>thumbnail: <img src="${product.thumbnail}" alt="img" class="img-thumbnail img-fluid"></li>
                    </p>
                </div>
                <div class="d-flex justify-center mb-4">
                    <button type="button" class="btn btn-danger delete-btn bg-red-500 text-white py-2 px-4 rounded" data-product-id="${product.id}" onclick="deleteProduct(${product.id})">Eliminar</button>
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
