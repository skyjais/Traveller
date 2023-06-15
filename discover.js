
let container = document.getElementById("container")
fetchData()
async function fetchData(){
    try {
        let res = await fetch("https://traveller-63nk.onrender.com/products")
        let data = await res.json()
        console.log(data)
        displayData(data)
    } catch (error) {
        console.log(error)
    }
}
function displayData(data){
    container.innerHTML = "";
    let childContainer = document.createElement("div")
    childContainer.className = "child"
    data.forEach((item)=>{
        childContainer.append(creatCard(item))
    })
    container.append(childContainer)
}
function creatCard(item){
    let card = document.createElement("div")
    card.className = "card"
    let cardImg = document.createElement("div")
    cardImg.className = "card-image"
    let image = document.createElement("img")
    image.src = item.image
    cardImg.append(image)
    let cardBody = document.createElement("div")
    cardBody.className = "card-body"
    let cardTitle = document.createElement("h2")
    cardTitle.className = "card-title"
    cardTitle.innerHTML = item.title
    let divSecond = document.createElement("div")
    divSecond.className = "div-second";
    let logoImg = document.createElement("img")
    logoImg.className = "logo-img"
    logoImg.src = "http://pluspng.com/img-png/png-location-location-black-png-image-4231-1200.png"
    let cardLocation = document.createElement("span")
    cardLocation.className = "card-location"
    cardLocation.innerHTML = item.city;
    let cardDesc = document.createElement("p")
    cardDesc.className = "card-discription"
    cardDesc.innerHTML = item.discription
    let divFirst = document.createElement("div")
    divFirst.className = "div-first"
    let cardPrice = document.createElement("h3")
    cardPrice.className = "card-price"
    cardPrice.innerHTML = `₹${item.price}`
    let cardBtn = document.createElement("button")
    cardBtn.className = "card-btn";
    cardBtn.innerText = "Explore"
    cardBtn.addEventListener("click",function(){
        window.location.href = "india.html"
    })
    divSecond.append(logoImg,cardLocation)
    divFirst.append(cardPrice,cardBtn)
    cardBody.append(cardTitle,divSecond,cardDesc,divFirst)
    card.append(cardImg,cardBody)
    return card
}
console.log("yash")

let citySearchBtn = document.getElementById("city-search-btn");

citySearchBtn.addEventListener("click",function(){
    
})

let div = document.createElement("div")
div.className = "yash"
