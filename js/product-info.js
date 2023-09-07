
const productInfoDiv = document.getElementById("prod info container");

const productIdInfo = localStorage.getItem("id"); /* 6/9/23 revisar */

if (productIdInfo) {
    const PRODS_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productIdInfo}.json`;
  

// Realizar la petición HTTP
fetch(PRODS_INFO_URL) /* 6/9/23 Me esta dando como que no selecciono ningun prod */
    .then(response => response.json())
    .then(data => {

        const product = data["product"];
        for (let i = 0; i < product.length; i++) { /* 6/9/23 REVISAR EL FOR, no creo que vaya */
            const product = product[i];

            /* Titulo del producto */
            const productNameHeading = document.getElementById("product name h4");
            productNameHeading.textContent = product.name;
            
            /* Precio */
            const productPriceHeading = document.createElement("h5");
            productPriceHeading.textContent = `Precio`;
            productPriceHeading.setAttribute("class","subtitle prods info");

            const productPrice = document.createElement("p");
            productPrice.textContent = `${product.cost}`;
            productPrice.setAttribute("id","precio");

            const productCurrency = document.createElement("p");
            productCurrency.textContent = `${product.currency} `;
            productCurrency.setAttribute("id","moneda");

            /* Precio + Moneda (lo que se muestra en la pagina) */
            const precioCompleto = productCurrency + productPrice;

            /* Descripción */
            const productDescHeading = document.createElement("h5");
            productDescHeading.textContent = `Descripción`;
            productDescHeading.setAttribute("class","subtitle prods info");
            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;
            productDescription.setAttribute("id", "descrip");

            /* Categoría */
            const productCatHeading = document.createElement("h5");
            productCatHeading.textContent = `Categoría`;
            productCatHeading.setAttribute("class","subtitle prods info");
            const productCategory = document.createElement("p");
            productCategory.textContent = `${product.category}`;
            productCategory.setAttribute("id", "cat");

            /* Cantidad vendida */
            const productSoldHeading = document.createElement("h5");
            productSoldHeading.textContent = `Cantidad vendida`;
            productSoldHeading.setAttribute("class","subtitle prods info");
            const productCantVendida = document.createElement("p");
            productCantVendida.textContent = `${product.soldCount}`;
            productCantVendida.setAttribute("id", "cantvendida");

            /* Imagenes */
            const productImgHeading = document.createElement("h5");
            productImgHeading.textContent = `Imagenes ilustrativas`;
            productImgHeading.setAttribute("class","subtitle prods info");
            const productImg = document.createElement("img");
            productImg.src = product.image;                 /* 6/9/23 REVISAR QUE MUESTRE TODAS LAS IMAGENES */
            productCantVendida.setAttribute("id", "img");

            /* 6/9/23: Falta agregar productos relacionados */
          
            productInfoDiv.appendChild(productNameHeading);
            productInfoDiv.appendChild(productPriceHeading);
            productInfoDiv.appendChild(precioCompleto);
            productInfoDiv.appendChild(productDescHeading);
            productInfoDiv.appendChild(productDescription);
            productInfoDiv.appendChild(productCatHeading);
            productInfoDiv.appendChild(productCategory);
            productInfoDiv.appendChild(productSoldHeading);
            productInfoDiv.appendChild(productCantVendida);
            productInfoDiv.appendChild(productImgHeading);
            productInfoDiv.appendChild(productImg);
        };
    })
    .catch(error => {
        console.error("Error al cargar la informacion del producto:", error);
    });

} else {
    // Maneja el caso en el que no se haya seleccionado.
    console.error("No se ha seleccionado un producto.");
  };