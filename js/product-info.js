const selectedProductId = localStorage.getItem('selectedProductId');

if (selectedProductId) {
    fetch(`https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`) 
        .then(response => response.json())
        .then(productData => {
            const productosinfo = document.getElementById('product-info');
            productosinfo.innerHTML = `
                <h2>${productData.name}</h2>
                <p>${productData.description}</p>
                <p>Precio: ${productData.currency} ${productData.cost}</p>
            `;

            const productImages = productData.images;
            const productImage = document.getElementById('product-image');
            const prevButton = document.getElementById('prev-button');
            const nextButton = document.getElementById('next-button');

            let currentImageIndex = 0;

            function updateImage() {
                const imageUrl = productImages[currentImageIndex];
                productImage.src = imageUrl;
            }

            prevButton.addEventListener('click', () => {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateImage();
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentImageIndex < productImages.length - 1) {
                    currentImageIndex++;
                    updateImage();
                }
            });
            updateImage();
        })
        .catch(error => {
            console.error("Error al cargar los detalles del producto:", error);
        });
} else {
    console.error("No se ha seleccionado un producto.");
}