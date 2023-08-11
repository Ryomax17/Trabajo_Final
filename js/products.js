const productListDiv = document.getElementById("product-list");

// Realizar la petición HTTP
fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
        // Manipular los datos recibidos y mostrar en el HTML
        const products = data["products"];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
        
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement("h2");
            productName.textContent = product.name;

            const productPrice = document.createElement("p");
            productPrice.textContent = `Precio: USD${product.cost}`;

            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            const productSold = document.createElement("p");
            productSold.textContent = `Cantidad vendida: ${product.soldCount}`;

            productDiv.appendChild(productName);
            productDiv.appendChild(productDescription);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productSold);
            productDiv.appendChild(productImage);

            productListDiv.appendChild(productDiv);
        };
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });