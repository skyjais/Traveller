// HTML elements
let container = document.getElementById("container")
let sortLowToHigh = document.getElementById("sort-low-to-high");
let sortHighToLow = document.getElementById("sort-high-to-low");
let paginationContainer = document.getElementById("pagination-container");

//Global Elements
let currentPage = 1;
let limit = 9;
let data = [];

// Fetch data on page load
fetchData(currentPage, limit);

// Fetch data from API
async function fetchData(page,limit){
    try {
        LoadAnimation();
        let res = await fetch(`https://traveller-63nk.onrender.com/india?_page=${page}&_limit=${limit}`)
        let total= res.headers.get("X-Total-Count");
        let total_page= Math.ceil(total/limit);
        displayButton(total_page,limit)
        data = await res.json()
        console.log(data)
        displayData(data)
    } catch (error) {
        console.log(error)
    }
}

// Display data in the container
function displayData(data){
    container.innerHTML = "";
    let childContainer = document.createElement("div")
    childContainer.className = "child"
    data.forEach((item)=>{
        childContainer.append(createCard(item))
    })
    container.append(childContainer)
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
      localStorage.setItem("detail-data", JSON.stringify(obj))
      window.location.href = "city.html";
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
function LoadAnimation(){
    container.innerHTML="";
    let img= document.createElement("img");
    img.src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif";

    container.append(img);
}



