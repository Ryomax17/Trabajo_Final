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
            const productId = document.createElement("p"); //modificacion//
            idname= "id"+ product.id
            productDiv.setAttribute("id",idname );
            productDiv.classList.add("product");
            const productName = document.createElement("h2");
            productName.textContent = product.name;
            productName.setAttribute("class", "container");
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            const textdiv =document.createElement("div");
            const productPrice = document.createElement("p");
            productPrice.textContent = `Precio: USD${product.cost}`;
            productPrice.setAttribute("class","textcont")
            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;
            productDescription.setAttribute("class", "textcont");
            const productSold = document.createElement("p");
            productSold.textContent = `Cantidad vendida: ${product.soldCount}`;
            productSold.setAttribute("class", "productsold");
            cartbttn = document.createElement("button");
            cartbttn.innerHTML = "comprar";
            cartbttn.setAttribute("class", "cartbttn");

            textdiv.appendChild(productName);
            textdiv.appendChild(productDescription);
            textdiv.appendChild(productPrice);
            textdiv.appendChild(cartbttn);
            productDiv.appendChild(productSold);
            productDiv.appendChild(productImage);
            productDiv.appendChild(productId);
            productDiv.appendChild(textdiv);
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


