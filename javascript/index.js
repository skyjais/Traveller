// registration
const regis = document.getElementById("registered");
regis.addEventListener("click", () => {
    window.location.href = "/htmls/SignUp.html"
})


// switching to name
const signInData = JSON.parse(localStorage.getItem("user-list"));

if (signInData) {
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        const shortenedName = signInData.name.substring(0, 2).toUpperCase();
        navRight.innerHTML = `
        <div class="newNav-right">
            <div>
                 <h3 class="emails">${shortenedName}</h3>
             </div>
             <div>
                 <a href="/htmls/https.html" id="navnewIcon"><ion-icon name="settings-outline"></ion-icon></a>
             </div>
        </div>
        `
    }
}



// pop up-
const subEmail = document.querySelector(".email-input");
const subscribeButton = document.querySelector(".email-subs button");

subscribeButton.addEventListener("click", () => {
    const email = subEmail.value.trim();

    if (email !== "") {
        swal("Good job!", `You have Subscribe to our Newsletter with ` + email, "success").then(() => {
            subEmail.value = "";
        });

    } else {
        swal("Error", "Enter the Email", "error");
    }
});


// Date display



// count down -------------------------------------

const countdownDate = new Date("2023-12-31T23:59:59").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 4)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        hours + " hrs " + minutes + " min " + seconds + " sec";

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "Countdown Finished";
    }
}, 1000);

// See More Sections-------------------------------
let About = [
    {
        img: "https://images.unsplash.com/photo-1552925690-47ab745613c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        heading: "HUNDREDS OF GUIDES",
        contexts: "New High - Quality Guides Added Each week"
    },
    {
        img: "https://www.freehindiwishes.com/wp-content/uploads/2020/10/Best-DP-Pics-of-Indian-Girls-22.jpg",
        heading: "LOCAL EXPERTS",
        contexts: "The largest network of local guides worldwide"
    },

]

let AboutCount = document.getElementById("div-1-2");

function aboutcnt(data) {
    AboutCount.innerHTML = "";

    data.forEach(el => {
        let card = document.createElement("div");
        card.classList.add("card");

        let imgDiv = document.createElement("div");
        imgDiv.classList.add("imgDiv");
        let image = document.createElement("img");
        image.src = el.img;
        image.classList.add("image");
        imgDiv.appendChild(image);

        let headDiv = document.createElement("div");
        headDiv.classList.add("headDiv");
        let txtdiv = document.createElement("h3");
        txtdiv.classList.add("txtdiv");
        txtdiv.textContent = el.heading;

        let cntxtDiv = document.createElement("p");
        cntxtDiv.classList.add("cntxtDiv");
        cntxtDiv.textContent = el.contexts;

        headDiv.append(txtdiv, cntxtDiv);
        card.append(imgDiv, headDiv);
        AboutCount.append(card);
    });
}
aboutcnt(About);

// -------------Ratings
const destinations = [
    {
        heading: "Popular place to Visit",
    },
    {
        image: "./image/machupicchu.jpg",
        placeName: "Scottland",
        rating: "4.5",
        cityCountry: "Peterland",
        days: "3 days"
    },
    {
        image: "image/mizoram.jpg",
        placeName: "India",
        rating: "4.5",
        cityCountry: "Mizoram",
        days: "5 days"
    },
    {
        image: "./image/italy.jpg",
        placeName: "Italy",
        rating: "4.5",
        cityCountry: "Mazandaran",
        days: "1 Day"
    },
    {
        image: "./image/venice.jpg",
        placeName: "America",
        rating: "5.0",
        cityCountry: "Marcoh",
        days: "2 days"
    },
]


function generatePlaces(places) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    places.forEach((place, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        if (index === 0 && place.heading) {
            const heading = document.createElement('h1');
            heading.textContent = place.heading;
            gridItem.appendChild(heading);
        } else {
            const imageDiv = document.createElement('div');
            const imageDiv1 = document.createElement('div');
            imageDiv.classList.add('grid-ele-img');
            const image = document.createElement('img');
            if (place.image) {
                image.src = place.image;
            }
            imageDiv.append(imageDiv1, image);

            imageDiv.addEventListener('click', () => {
                redirectToPage(place);
            });


            const contentDiv = document.createElement('div');
            contentDiv.classList.add('grid-ele-cont');
            const placeName = document.createElement('h3');
            if (place.placeName) {
                placeName.innerHTML = `<ion-icon name="location"></ion-icon>` + place.placeName;
            }

            const rating = document.createElement('p');
            if (place.rating) {
                rating.innerHTML = `<span class="rating-value">${place.rating}</span> <span class="stars"></span>`;
            }

            const cityCountry = document.createElement('p');
            if (place.cityCountry) {
                cityCountry.textContent = place.cityCountry;
            }

            const days = document.createElement('p');
            if (place.days) {
                days.textContent = place.days;
            }

            contentDiv.append(placeName, rating, cityCountry, days);
            gridItem.append(imageDiv, contentDiv);

        }

        gridContainer.appendChild(gridItem);
    });

    updateRatings();
}
function redirectToPage(place) {

    switch (place.placeName) {
        case 'Scottland':
            window.location.href = 'htmls/scottland.html';
            break;
        case 'India':
            window.location.href = 'htmls/india.html';
            break;
        case 'Italy':
            window.location.href = 'htmls/italy.html';
            break;
        case 'America':
            window.location.href = 'htmls/america.html';
            break;
        default:
            break;
    }
}

generatePlaces(destinations);

function updateRatings() {
    const ratingElements = document.querySelectorAll('.rating-value');

    ratingElements.forEach(ratingElement => {
        const rating = parseFloat(ratingElement.textContent);
        const roundedRating = Math.round(rating * 2) / 2;
        const starsElement = ratingElement.nextElementSibling;

        starsElement.innerHTML = '';

        for (let i = 0; i < Math.floor(roundedRating); i++) {
            const starIcon = document.createElement('ion-icon');
            starIcon.setAttribute('name', 'star');
            starIcon.style.color = 'orange';
            starsElement.appendChild(starIcon);
        }

        if (roundedRating % 1 !== 0) {
            const halfStarIcon = document.createElement('ion-icon');
            halfStarIcon.setAttribute('name', 'star-half');
            halfStarIcon.style.color = 'orange';
            starsElement.appendChild(halfStarIcon);
        }

        const remainingStars = 5 - Math.ceil(roundedRating);
        for (let i = 0; i < remainingStars; i++) {
            const emptyStarIcon = document.createElement('ion-icon');
            emptyStarIcon.setAttribute('name', 'star-outline');
            emptyStarIcon.style.color = 'orange';
            starsElement.appendChild(emptyStarIcon);
        }
    });
}


// Book Now -------------------------------
var bookNowButtons = document.querySelectorAll('.book-now');

bookNowButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        var divsContainer = button.closest('.divs');
        var image = divsContainer.querySelector('img').getAttribute('src');
        var place = divsContainer.querySelector('.place').textContent;
        var location = divsContainer.querySelector('.locations').textContent.trim();
        var packages = divsContainer.querySelector('.package').textContent;
        var price = Math.floor(Math.random() * 9000) + 1000;

        var bookingDetails = {
            image: image,
            country: place,
            city: location,
            Packages: packages,
            price: price
        };

        console.log(bookingDetails);
        localStorage.setItem('detail-data', JSON.stringify(bookingDetails));
        window.location.href = "htmls/bookNow.html";
    });
});


// -----------Testimonial


const testimonials = [
    {
        image: "image/girlpic2.jpg",
        content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and will give you complete",
        rating: "5.0",
        name: "Jhonson"
    },
    {
        image: "image/manpic.jpg",
        content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and will give you complete",
        rating: "5.0",
        name: "Jhonson"
    },
    {
        image: "https://www.freehindiwishes.com/wp-content/uploads/2020/10/Best-DP-Pics-of-Indian-Girls-22.jpg",
        content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and will give you complete",
        rating: "5.0",
        name: "Charlie"
    },
];

const testiContainer = document.querySelector('.testi');

testimonials.forEach(testimonial => {
    const testiItem = document.createElement('div');
    testiItem.classList.add('testi-item');

    const testiImage = document.createElement('div');
    testiImage.classList.add('testi-image');
    const image = document.createElement('img');
    image.src = testimonial.image;
    testiImage.appendChild(image);

    const testiCont = document.createElement('div');
    testiCont.classList.add('testi-cont');
    const content = document.createElement('p');
    content.textContent = testimonial.content;
    testiCont.appendChild(content);

    const testiAbt = document.createElement('div');
    testiAbt.classList.add('testi-abt');

    const rating = document.createElement('p');
    if (testimonial.rating) {
        rating.innerHTML = `<span class="rating-value">${testimonial.rating}</span> <span class="stars"></span>`;
    }

    const name = document.createElement('h2');
    name.textContent = "~ " + testimonial.name;
    testiAbt.append(rating, name);

    testiItem.append(testiImage, testiCont, testiAbt);
    testiContainer.appendChild(testiItem);
});

updateRatings();


//---------------------FUNCTIONALITIES
// ---------------------------------------

// Toggle the hamburger menu



// 2) Destinations from url
const baseUrl = "https://traveller-63nk.onrender.com/products"

const selectElement = document.getElementById('destination');


fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Destinations';
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        data.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = `destination${index + 1}`;
            option.textContent = `${item.city}, ${item.title}`;
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });



// Icon Chainging from LS
// "user-list"
// "user-list"

