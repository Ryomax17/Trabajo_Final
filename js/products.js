const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Relevancia";
let currentProductArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
const ORDER_ASC_BY_PRICE = "1-10";
const ORDER_DESC_BY_PRICE = "10-1";
let search = document.getElementById("buscador");
let productsArray = [];

function redirectToProductInfo (productsId) {
  var productToExport = productsArray.find(product => product.id == productsId);
  productString = JSON.stringify(productToExport);
  localStorage.setItem('selectedProduct', productString);
  window.location.href = 'product-info.html';
};

function seleccionarNumero(numero) {
  document.getElementById('numeroSeleccionado').textContent = numero;
}

function showProductsList(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let products = array[i];
    console.log(products);
    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(products.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(products.cost) <= maxCount))
    ) {
      htmlContentToAppend += `
            <div id="${products.id}" class="list-group-item list-group-item-action cursor-active" >
            <div class="row">
            <div class="col-3">
            <img src="${products.image}" alt="${products.name}" class="img-thumbnail">
            </div>
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${products.name}</h4>
            <small class="text-muted">${products.soldCount} artículos</small>
            </div>
            <p class="mb-1">${products.description}</p>
            <small class="mb-1 txtcont">${products.currency}${products.cost} </small>
            <input id "id${products.id} class="cartbttn " type= "button" value= "Comprar" onclick="redirectToProductInfo('${products.id}')"> 
            </div>
            </div>
            </div>`;
    }
  }
  document.getElementById("product-list").innerHTML = htmlContentToAppend;
}

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
  } else {
    return p_result;
  }
}


function filterProductsByPrice() {
  const minPriceInput = document.getElementById("rangeFilterCountMin");
  const maxPriceInput = document.getElementById("rangeFilterCountMax");

  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);

  if (isNaN(minPrice) && isNaN(maxPrice)) {
    showProductsList(currentProductArray);
  } else {
    const filteredProducts = currentProductArray.filter(function (product) {
      return (
        (isNaN(minPrice) || product.cost >= minPrice) &&
        (isNaN(maxPrice) || product.cost <= maxPrice)
      );
    });
    showProductsList(filteredProducts);
  }
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}


//es lo mismo que sort and show categories solo que acomodado a a funcion de asc y desc
function sortAndShowAscAndDesc(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;
  if (categoriesArray != undefined) {
    currentProductArray = categoriesArray;
  }
  currentProductArray = sortCategoriesByPrice(
    currentSortCriteria,
    currentProductArray
  );
  showProductsList(currentProductArray);
}

document.addEventListener("DOMContentLoaded", function () {
  const productListDiv = document.getElementById("product-list");

  const categoriaId = localStorage.getItem("catID");

  if (categoriaId) {
    // Construye la URL de los productos utilizando el identificador de categoría almacenado.
    const PRODS_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;
    fetch(PRODS_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          productsArray = data.products;
          // Verificamos que "products" exista en el objeto
          currentProductArray = data.products;
          showProductsList(currentProductArray);
        } else {
          console.error("No se encontraron productos en el JSON.");
        }
      })
      .catch((error) => console.error("Error fetching JSON:", error));

    document.getElementById("sortAsc").addEventListener("click", function () {
      sortAndShowAscAndDesc(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
      sortAndShowAscAndDesc(ORDER_DESC_BY_PRICE);
    });

    document
      .getElementById("sortByCount")
      .addEventListener("click", function () {
        sortAndShowAscAndDesc(ORDER_BY_PROD_COUNT);
      });

    document
      .getElementById("clearRangeFilter")
      .addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        showProductsList(currentProductArray);
      });

    document
      .getElementById("rangeFilterCount")
      .addEventListener("click", function () {
        filterProductsByPrice();
        showProductsList();
      });

    search.addEventListener("input", (e) => {
      let inputText = e.target.value.toLowerCase().trim(); //obtiene el valor que tiene el input en cada momento-trim()me elimina los espacios en blanco que pueden haber-tolowercase cambia todo el texto a minuscula cuando es procesado para que me busque lo que quiero este usando mayus o minus.
      console.log(inputText);
      let mostrarfiltro = currentProductArray.filter(function (elmnt) {
        return (
          elmnt.name.toLowerCase().trim().includes(inputText) ||
          elmnt.description.toLowerCase().trim().includes(inputText)
        );
      });
      if (mostrarfiltro.length) {
        showProductsList(mostrarfiltro);
      } else {
        productListDiv.innerHTML =
          "No hay productos que coincidan con su busqueda";
      }
    });
  }
});
