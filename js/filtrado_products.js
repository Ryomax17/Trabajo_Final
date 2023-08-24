const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Precios";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort((a, b) => parseInt(b.cost) - parseInt(a.cost));
    }
    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html";
}

function showCategoriesList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];
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
                                <small class="text-muted">${category.cost} artículos</small>
                            </div>
                            <p class="mb-1">${category.description}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;
    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showCategoriesList();
}

document.addEventListener("DOMContentLoaded", function (e) {
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
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
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
}});
