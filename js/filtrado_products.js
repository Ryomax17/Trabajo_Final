const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Relevancia";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
const ORDER_ASC_BY_PRICE = "1-10"
const ORDER_DESC_BY_PRICE = "10-1"
let search = document.getElementById("buscador");


//Hace lo mismo que sortCategories pero ordena el array por precio
function sortCategoriesByPrice(criteria, array) {
    let p_result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        p_result = array.sort((a, b) => a.cost - b.cost);
        return p_result;
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        p_result = array.sort((a, b) => b.cost - a.cost);
        return p_result;
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        p_result = array.sort((a, b) => b.soldCount - a.soldCount);
        return p_result;
    }else{
        return p_result;
    }
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html";
}

function showCategoriesList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
            htmlContentToAppend += `
                <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${category.name}</h4>
                            </div>
                            <p class="mb-1 txtcont">${category.description}</p>
                            <p class="mb-1 txtcont" id="price"> Precio: ${category.cost}</p>
                        </div>
                        <div class="col-4">
                            <p id="soldprod">Articulos vendidos: ${category.soldCount}</P>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
}

//es lo mismo que sort and show categories solo que acomodado a a funcion de asc y desc
function sortAndShowAscAndDesc(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;
    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategoriesByPrice(currentSortCriteria, currentCategoriesArray);
    showCategoriesList(currentCategoriesArray);
}

document.addEventListener("DOMContentLoaded", function () {
    const productListDiv = document.getElementById("product-list");

const categoriaId = localStorage.getItem("catID");

    if (categoriaId) {
        // Construye la URL de los productos utilizando el identificador de categoría almacenado.
        const PRODS_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;
        fetch(PRODS_URL)
            .then(response => response.json())
            .then(data => {
                if (data.products) {  // Verificamos que "products" exista en el objeto
                    currentCategoriesArray = data.products;
                    showCategoriesList();
                } else {
                    console.error("No se encontraron productos en el JSON.");
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));

        document.getElementById("sortAsc").addEventListener("click", function () {
            sortAndShowAscAndDesc(ORDER_ASC_BY_PRICE);
        });

        document.getElementById("sortDesc").addEventListener("click", function () {
            sortAndShowAscAndDesc(ORDER_DESC_BY_PRICE);
        });

        document.getElementById("sortByCount").addEventListener("click", function () {
            sortAndShowAscAndDesc(ORDER_BY_PROD_COUNT);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
            minCount = undefined;
            maxCount = undefined;
            showCategoriesList();
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function () {
            minCount = parseInt(document.getElementById("rangeFilterCountMin").value) || undefined;
            maxCount = parseInt(document.getElementById("rangeFilterCountMax").value) || undefined;
            showCategoriesList();
        });

        search.addEventListener("input", e => {
            let inputText = e.target.value.toLowerCase().trim()//obtiene el valor que tiene el input en cada momento-trim()me elimina los espacios en blanco que pueden haber-tolowercase cambia todo el texto a minuscula cuando es procesado para que me busque lo que quiero este usando mayus o minus.
            console.log(inputText);
            let mostrarfiltro = currentCategoriesArray.filter(function (elmnt) {
                return elmnt.name.toLowerCase().trim().includes(inputText) || 
                elmnt.description.toLowerCase().trim().includes(inputText);
             })
            if (mostrarfiltro.length) {
                showCategoriesList(mostrarfiltro);
            } else {
                productListDiv.innerHTML="No hay productos que coincidan con su busqueda"
            }
        }
        
    )
    
    
    }


});


