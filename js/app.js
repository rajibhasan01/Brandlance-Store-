const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    let sccc = `fas fa-star text-warning`;
    console.log("valvd", sccc);
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 text-center p-3 card-design rounded-3" >
      <div class="bg-white mx-auto px-5 py-4 my-3 rounded-3">
          <img id="image-file" class="card-img-top product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <div class="mt-auto">
      <p>
      <i class="${sccc}"></i> ${product.rating.rate}/5 (${product.rating.count})
      </p>
      <p id="titleCase">Category: ${product.category}</p>
      <h2 class="text-muted">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now bg-secondary text-white btn m-2"><i class="fas fa-cart-plus text-warning"></i> Add to cart</button>
      <button id="details-btn" class="btn btn-primary my-2" onclick="loadSingleItem(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Details</button>
      <div>
    </div>
      `;
    document.getElementById("container-box").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted <= 200) {
    setInnerText("delivery-charge", 20);
  }

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// display single item
const loadSingleItem = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySingleItem(data));
}




const displaySingleItem = data => {
  console.log(data.title);
  const containerForItem = document.getElementById('container-single-item');
  // clear inner content
  containerForItem.textContent = '';
  // set image url
  source = data.image;
  const rating = data.rating.rate;
  console.log(rating);
  const starArr = starCount(rating);

  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
            <img src=${source} class="card-img-top w-50 mx-auto py-4 image" alt="...">
            <button class="btn-close me-2 m-auto cross-btn p-2" data-bs-dismiss="modal"></button>
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p id="titleCase" class="card-text text-secondary">${data.category} </p>
                <p class="card-text text-muted">${data.description}</p>
                <div class="d-md-flex justify-content-md-between">
                <p class="card-text"> <span class="text-danger fw-normal">Ratings :</span> <span class="text-dark"> ${data.rating.rate}</span> <br>

                <span><i class="${starArr[0] ? starArr[0] : ''} text-warning"></i><i class="${starArr[1] ? starArr[1] : ''} text-warning"></i><i class="${starArr[2] ? starArr[2] : ''} text-warning"></i><i class="${starArr[3] ? starArr[3] : ''} text-warning"></i><i class="${starArr[4] ? starArr[4] : ''} text-warning"></i></span> <br>
<span class="text-secondary">${data.rating.count} Person rated this product</span></p >
  <h5 class="text-success fw-bold">Price: <span class="text-muted">$${data.price}</span></h5>
                </div >
  <div class="d-md-flex justify-content-md-end">
    <a href="##" target="_blank" class="btn btn-warning"><i class="fas fa-cart-plus"></i> Add to Cart</a>
  </div>
            </div >
  `;
  containerForItem.appendChild(div);
}


const starCount = number => {

  let ratingNumber = Math.floor(number);
  let remainNumber = (number - ratingNumber).toFixed(1) * 10;
  console.log(ratingNumber, remainNumber);
  let count = 0;

  if (remainNumber === 0) {
    count = 0;
  }
  else if (remainNumber >= 5) {
    ratingNumber += 1;
  }
  else if (remainNumber <= 5) {
    count = 1;
  }

  let starArray = [];
  starArray.splice(0, starArray.length)

  for (i = 0; i < 5; i++) {
    if (ratingNumber) {
      starArray.push(`fas fa-star`)
      ratingNumber--;
    }
    else if (count === 1) {
      starArray.push(`fas fa-star-half`)
      count--;
    }

  }
  return starArray;

}