// const productListDiv = document.getElementById("product-list");

// const categoriaId = localStorage.getItem("catID");

// const productsArray = [];

// if (categoriaId) {
//     // Construye la URL de los productos utilizando el identificador de categoría almacenado.
//     const PRODS_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;
  

// // Realizar la petición HTTP
// fetch(PRODS_URL)
//     .then(response => response.json())
//     .then(data => {

//         document.getElementById("categoria").innerHTML = `Aquí verás todos los productos de la categoría ${data.catName}`;
//         let containerProduct = document.getElementById("product-list");
//         // Manipular los datos recibidos y mostrar en el HTML
//         const products = data["products"];

//         for (let i = 0; i < products.length; i++) {
//             const product = products[i];
//             console.log(product);

        
        
//         containerProduct.innerHTML += `
//         <div id="${product.id}" class="list-group-item list-group-item-action cursor-active">
//             <div class="row">
//                 <div class="col-3">
//                     <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
//                 </div>
//                 <div class="col">
//                     <div class="d-flex w-100 justify-content-between">
//                         <h4 class="mb-1">${product.name}</h4>
//                         <small class="text-muted">${product.soldCount} artículos</small>
//                         </div>
//                         <p class="mb-1">${product.description}</p>
//                         <small class="mb-1 txtcont">${product.currency}${product.cost} </small>
//                         <input id "id${product.id} class="cartbttn" type= "button" value= "Comprar"> 
//                 </div>
//             </div>
//         </div>
//         `;
            
//         };
//     })
//     .catch(error => {
//         console.error("Error al cargar los productos:", error);
//     });

// } else {
//     // Maneja el caso en el que no se haya seleccionado una categoría.
//     console.error("No se ha seleccionado una categoría de productos.");
//   }
// function ordena() {
//     result = []
//     fetch(PRODUCTS_URL)
//         .then(response => response.json())
//         .then(data => {
//             // Manipular los datos recibidos y mostrar en el HTML
//             const products = data["products"];
//             for (let i = 0; i < products.length; i++) {
//                 const products = products[i];
//             }
//         })
// }