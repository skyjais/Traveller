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



// Retrived from Local Storage

var placeName = document.querySelector('.place-name');

var storedData = JSON.parse(localStorage.getItem('detail-data'));

placeName.innerHTML = `
    <img src= "${storedData.image.startsWith('https')?storedData.image:`/${storedData.image}`}" alt="" class="place-image">
`


var placeElement = document.getElementById('place');
var priceElement = document.getElementById('price');

placeElement.innerHTML = `Place:<span class='place-highlight'> <ion-icon name="location-outline"></ion-icon>  ` + storedData.city + `, ` + storedData.country + `</span>`;
priceElement.innerHTML = "Price: <span class='price-highlight'>₹ " + storedData.price + "/-</span>";

// form page
var form = document.querySelector('.submit-btn');

form.addEventListener('click', function (e) {
    e.preventDefault();
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var checkIn = document.querySelector('input[data-placeholder="Check-in"]').value;
    var checkOut = document.querySelector('input[data-placeholder="Check-out"]').value;
    var numOfAdults = document.getElementById('guest').value;
    var numOfChildren = document.getElementById('children').value;

    var payment = {
        Name: firstName + " " + lastName,
        email: email,
        gender: gender ? gender.value : "",
        check_In: checkIn,
        check_Out: checkOut,
        Adults: numOfAdults,
        Children: numOfChildren,
        Place: storedData.country,
        Location: storedData.city,
        Price: storedData.price
    };
    console.log(payment);
    localStorage.setItem('payment', JSON.stringify(payment));
    window.location.href = "/htmls/Payment.html";
});