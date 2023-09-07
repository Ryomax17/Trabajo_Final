const productInfoDiv = document.getElementById("prod info container");

const productIdInfo = localStorage.getItem("id"); /* 6/9/23 revisar */
console.log(productIdInfo)
if (productIdInfo) {
    const PRODS_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productIdInfo}.json`;
  

// Realizar la petición HTTP
fetch(PRODS_INFO_URL) /* 6/9/23 Me esta dando como que no selecciono ningun prod */
    .then(response => response.json())
    .then(data => {

        const id = data.id;
       
        /* Titulo */
        const titulo = document.getElementById("product name h4") 
        titulo.textContent = data.name;

        /* Precio */
        const subtprecio = document.createElement("h5");
        subtprecio.textContent = `Precio`;
        subtprecio.setAttribute("class", "subtitulo");
        const costo =  data.cost;
        const moneda = data.currency;
        const precioCompleto = moneda + " " + costo;
        precioCompleto.setAttribute("class", "txt");
        subtprecio.appendChild(precioCompleto);

        /* Descripción */
        const subtdescription = document.createElement("h5");
        subtdescription.textContent = `Descripción`;
        subtdescription.setAttribute("class", "subtitulo");
        const description = data.description;
        description.setAttribute("class", "txt");
        subtdescription.appendChild(description);
        
        /* Categoria */
        const subtcategoria = document.createElement("h5");
        subtcategoria.textContent = `Categoria`;
        subtcategoria.setAttribute("class", "subtitulo");
        const categoria = data.category;
        categoria.setAttribute("class", "txt");
        subtcategoria.appendChild(categoria);

        /* Cantidad vendida */
        const subtcantidad = document.createElement("h5");
        subtcantidad.textContent = `Cantidad vendida`;
        subtcantidad.setAttribute("class", "subtitulo");
        const cantidad = data.soldCount;
        cantidad.setAttribute("class", "txt");
        subtcantidad.appendChild(cantidad);

        /* Imagenes */
        const subtimagenes = document.createElement("h5");
        subtimagenes.textContent = `Imagenes ilustrativas`;
        subtimagenes.setAttribute("class", "subtitulo");
        const imagenes = data.images;
            // Acceder a cada imagen en el arreglo "images" usando un bucle for
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                console.log("Imagen " + (i + 1) + ":", image);
            }
        subtimagenes.appendChild(imagenes);
        
        productInfoDiv.appendChild(subtprecio);
        productInfoDiv.appendChild(subtdescription);
        productInfoDiv.appendChild(subtcategoria);
        productInfoDiv.appendChild(subtcantidad);
        productInfoDiv.appendChild(subtimagenes);
    
    })
    .catch(error => {
        console.error("Error al cargar la informacion del producto:", error);
    });

} else {
    // Maneja el caso en el que no se haya seleccionado.
    console.error("No se ha seleccionado un producto.");
  };