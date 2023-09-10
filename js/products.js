const productListDiv = document.getElementById("product-list");

const categoriaId = localStorage.getItem("catID");

if (categoriaId) {
    // Construye la URL de los productos utilizando el identificador de categoría almacenado.
    const PRODS_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;
  

// Realizar la petición HTTP
fetch(PRODS_URL)
    .then(response => response.json())
    .then(data => {

        document.getElementById("categoria").innerHTML = `Aquí verás todos los productos de la categoría ${data.catName}`;

        // Manipular los datos recibidos y mostrar en el HTML
        const products = data["products"];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            const productDiv = document.createElement("div");
            productDiv.classList.add("list-group-item", "list-group-item-action", "cursor-active");
            productDiv.onclick = function () {
                const productId = product.id;
                const infoid=productId.id;
                localStorage.setItem('selectedProductId', productId);
                window.location.href = 'product-info.html';
            };

            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("col-3");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.classList.add("img-thumbnail");

            imageDiv.appendChild(productImage);

            const contentDiv = document.createElement("div");
            contentDiv.classList.add("col");

            const titleRow = document.createElement("div");
            titleRow.classList.add("d-flex", "w-100", "justify-content-between");

            const title = document.createElement("h4");
            title.classList.add("mb-1");
            title.textContent = product.name;

            const productCount = document.createElement("small");
            productCount.classList.add("text-muted");
            productCount.textContent = `${product.soldCount} artículos`;

            titleRow.appendChild(title);
            titleRow.appendChild(productCount);

            const description = document.createElement("p");
            description.classList.add("mb-1");
            description.textContent = product.description;

            contentDiv.appendChild(titleRow);
            contentDiv.appendChild(description);

            rowDiv.appendChild(imageDiv);
            rowDiv.appendChild(contentDiv);

            productDiv.appendChild(rowDiv);

            productListDiv.appendChild(productDiv);
        };
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

} else {
    // Maneja el caso en el que no se haya seleccionado una categoría.
    console.error("No se ha seleccionado una categoría de productos.");
  }
function ordena() {
    result = []
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(data => {
            // Manipular los datos recibidos y mostrar en el HTML
            const products = data["products"];
            for (let i = 0; i < products.length; i++) {
                const products = products[i];
            }
        })
}


function ordena(array) {
    
    array.sort(function (a, b) {
        return a - b;
    });
}

console.log(ordenaAsc(jsondata));


function ordenaDesc() {

    array.sort(function (a, b) {
        return b - a;
    })
}
//tengo una funcion que me ordena un array en orden ascendente o descendente//

filterMenosAMas = document.getElementById("sortAsc");

filterMasAMenos = document.getElementById("sortDesc")

filterMasAMenos.addEventListener("click", ordenaDesc(productName));

filterMenosAMas.addEventListener("click", ordenaAsc(productName));

productDiv.onclick = function () {
    const productId = product.id;
    localStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-info.html'; // Redirige a la página de detalles del producto
};

