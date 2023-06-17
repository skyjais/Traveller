
// Retrived from Local Storage

var placeName = document.querySelector('.place-name');

var storedData = JSON.parse(localStorage.getItem('book-now'));

placeName.innerHTML = `
    <img src= /${storedData.Image} alt="" class="place-image">
    <h2>${storedData.Place}</h2>
    <p><ion-icon name="location"></ion-icon> ${storedData.Location}</p>
`


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
        Children: numOfChildren
    };
    console.log(payment);
    localStorage.setItem('payment', JSON.stringify(payment));
    // window.location.href = "payment.html";
});
