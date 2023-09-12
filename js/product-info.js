const selectedProductJSON = localStorage.getItem('selectedProduct');
const selectedProduct = JSON.parse(selectedProductJSON);
productData = [];

async function obtenerDatos(select) {
    const respuesta = await fetch(`https://japceibal.github.io/emercado-api/products/${select}.json`);
    productData = await respuesta.json();
    return productData;
    console.log(productData);
  }

function addStars(starsQty) {
    if (starsQty < 1 || starsQty > 5) {
      return ''; 
    }
  
    let estrellasHTML = '';
  
    for (let i = 0; i < starsQty; i++) {
      estrellasHTML += '<span class="fa fa-star checked"></span>';
    }
  
    for (let i = starsQty; i < 5; i++) {
      estrellasHTML += '<span class="fa fa-star"></span>';
    }
  
    return estrellasHTML;
  }
  
  function showCommentsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        console.log(comments);
        let commentsSection = "";
        
        
            commentsSection += `
                <div class="comment">
                <span>${comments.user} - ${comments.dateTime} - </span>
                ${addStars(comments.score)}
                <p>${comments.description}</p>
                </div>
            `;
            document.getElementById("comments-container").innerHTML += commentsSection;  
      }
    }

if (selectedProduct) {
    obtenerDatos(selectedProduct.id);
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${selectedProduct.id}.json`) 
    .then(response => response.json())
    .then(data => {
        let commentsData = data;
        console.log(commentsData);
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
            showCommentsList(commentsData);
        })
        .catch(error => {
            console.error("Error al cargar los detalles del producto:", error);
        });
} else {
    console.error("No se ha seleccionado un producto.");
}