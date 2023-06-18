// HTML elements
let container = document.getElementById("container");
let citySearchBtn = document.getElementById("city-search-btn");
let cityInput = document.getElementById("city-input");
let paginationContainer = document.getElementById("pagination-container");
let selectCountry = document.getElementById("select-country");
let sortLowToHigh = document.getElementById("sort-low-to-high");
let sortHighToLow = document.getElementById("sort-high-to-low");

// Global variables
let currentPage = 1;
let limit = 9;
let data = [];


// Fetch data on page load
fetchData(currentPage, limit);

// Fetch data from API
async function fetchData(page, limit) {
  try {
    LoadAnimation();
    let res = await fetch(
      `https://traveller-63nk.onrender.com/products?_page=${page}&_limit=${limit}`
    );
    let total = parseInt(res.headers.get("X-Total-Count"));
    let totalPage = Math.ceil(total / limit);
    displayButton(totalPage, limit);
    data = await res.json();
    console.log("data", data);
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}

// Display data in the container
function displayData(data) {
  container.innerHTML = "";
  let childContainer = document.createElement("div");
  childContainer.className = "child";
  data.forEach((item) => {
    childContainer.append(createCard(item));
  });
  container.append(childContainer);
}

// Create card element
function createCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  let cardImg = document.createElement("div");
  cardImg.className = "card-image";
  let image = document.createElement("img");
  image.src = item.image;
  cardImg.append(image);
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let divFirst = document.createElement("div")
  divFirst.className = "div-first"
  let divLeft = document.createElement("div")
  divLeft.className = "div-left"
  let cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.innerHTML = item.title;
  let divRight = document.createElement("div")
  divRight.className = "div-right"
  let divCityLogo = document.createElement("div");
  divCityLogo.className = "div-city-logo";
  let logoImg = document.createElement("img");
  logoImg.className = "logo-img";
  logoImg.src =
    "http://pluspng.com/img-png/png-location-location-black-png-image-4231-1200.png";
  let cardLocation = document.createElement("span");
  cardLocation.className = "card-location";
  cardLocation.innerHTML = item.city;
  let divSecond = document.createElement("div");
  divSecond.className = "div-second";
  let cardPrice = document.createElement("h3");
  cardPrice.className = "card-price";
  cardPrice.innerHTML = `₹${item.price}`;
  let cardBtn = document.createElement("button");
  cardBtn.className = "card-btn";
  cardBtn.innerText = "Explore";
  let obj = {
    image: item.image,
    country : item.title,
    city : item.city,
    price : item.price,
  }
  cardBtn.addEventListener("click", function () {
    console.log(obj)
    localStorage.setItem("detail-data", JSON.stringify(obj))
    window.location.href = "city.html"
  });
  divCityLogo.append(logoImg, cardLocation);
  divLeft.append(cardTitle)
  divRight.append(divCityLogo)
  divFirst.append(divLeft,divRight)
  divSecond.append(cardPrice, cardBtn);
  cardBody.append( divFirst, divSecond);
  card.append(cardImg, cardBody);
  return card;
}

let timeoutId;

function searchData() {
  clearTimeout(timeoutId);

  // Set a new timeout
  timeoutId = setTimeout(() => {
    let query = cityInput.value.toLowerCase();
    let filteredData = data.filter((item) => {
      let country = item.title.toLowerCase();
      let citySearch = item.city.toLowerCase();
      return country.includes(query) || citySearch.includes(query);
    });
    if (filteredData.length === 0) {
      container.innerText = "No Result Found!";
      container.style = "text-align : center"
    } else {
      displayData(filteredData);
    }
  }, 1000);
}

cityInput.addEventListener("input", searchData);

// Filter data based on selected country
selectCountry.addEventListener("change", function () {
  let selectedCountry = selectCountry.value.toLowerCase();
  if (selectedCountry === "select country") {
    displayData(data);
  } else {
    let sortedData = data.filter((item) =>
      item.title.toLowerCase().includes(selectedCountry)
    );
    if(sortedData.length === 0){
      container.innerHTML = "No Result Found!"
      container.style = "text-align : center"
    }
    else {
      displayData(sortedData);
    }
  }
});

// Sort By Price
sortLowToHigh.addEventListener("click", function () {
  let sortData = data.sort((a, b) => a.price - b.price);
  displayData(sortData);
});

sortHighToLow.addEventListener("click", function () {
  let sortData = data.sort((a, b) => b.price - a.price);
  displayData(sortData);
});

// Create pagination button
function createButton(id, limit) {
  let button = document.createElement("button");
  button.className = "pagination-button";
  button.innerText = id;
  button.addEventListener("click", () => {
    currentPage = id;
    fetchData(currentPage, limit);
  });
  return button;
}

// Display pagination buttons
function displayButton(totalPage, limit) {
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    paginationContainer.append(createButton(i, limit));
  }
}

// Show loading animation
function LoadAnimation() {
  container.innerHTML = "";
  let img = document.createElement("img");
  img.src =
    "https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif";
  container.append(img);
}