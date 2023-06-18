// All html tag select by id
let addPlace = document.querySelector("#addPlace");
let addingform = document.querySelector("#addingForm");
let deletePlace = document.querySelector("#deletePlace");
let deletingform = document.querySelector("#deletingForm");
let editPlace = document.querySelector("#editPlace");
let editForm = document.querySelector("#editForm");
let addBtn = document.getElementById("post-btn");
let deleteBtn = document.getElementById("delete-btn");
let editBtn = document.getElementById("edit-btn");
let editIdInput = document.getElementById("editId");
let editTitleInput = document.getElementById("editCountry");
let editCityInput = document.getElementById("editCity");
let editImageInput = document.getElementById("editImageUrl");
let editPriceInput = document.getElementById("editPrice");

// Add Post method
addBtn.addEventListener("click", function () {
  event.preventDefault();
  let addTitleInput = document.getElementById("addTitle").value;
  let addCityInput = document.getElementById("addCity").value;
  let addMainImageInput = document.getElementById("addMainImageUrl").value;
  let addPriceInput = document.getElementById("addPrice").value;
  let obj = {
    title: addTitleInput,
    city: addCityInput,
    image: addMainImageInput,
    price: addPriceInput,
  };
  if (
    addTitleInput !== "" &&
    addCityInput !== "" &&
    addMainImageInput !== "" &&
    addPriceInput !== ""
  ) {
    swal("Good job!", `Data posted successfuly`, "success").then(() => {
      obj = "";
    });
    fetch(`https://traveller-63nk.onrender.com/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  } else {
    swal("Error", "Please fillout all filed", "error");
  }
  addingform.reset();
});

deleteBtn.addEventListener("click", function () {
  event.preventDefault();
  let deleteId = document.getElementById("deleteId").value;
  fetch(`https://traveller-63nk.onrender.com/products/${deleteId}`, {
    method: "DELETE",
  });
  deletingform.reset();
  alert("Data Deleted successfuly");
});

// Add Put method
editBtn.addEventListener("click", function () {
  event.preventDefault();
  let editIdInput2 = document.getElementById("editId").value;
  let editTitleInput2 = document.getElementById("editCountry").value;
  let editCityInput2 = document.getElementById("editCity").value;
  let editImageInput2 = document.getElementById("editImageUrl").value;
  let editPriceInput2 = document.getElementById("editPrice").value;
  let obj = {
    title: editTitleInput2,
    city: editCityInput2,
    image: editImageInput2,
    price: editPriceInput2,
  };
  if(editIdInput2 !== "" &&
  editTitleInput2 !== "" &&
  editCityInput2 !== "" &&
  editPriceInput2 !== ""){
    fetch(`https://traveller-63nk.onrender.com/products/${editIdInput2}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  swal("Good job!", `Edit posted successfuly`, "success").then(() => {
    obj = "";
  });
  }
  else {
    swal("Error", "Please fillout all filed", "error");
  }
  editForm.reset();
  
});

// Add place form visible
addPlace.addEventListener("click", function () {
  addingForm.style = "display : block";
  deletingform.style = "display : none";
  editForm.style = "display : none";
});
// Delete place form visible
deletePlace.addEventListener("click", function () {
  deletingform.style = "display : block";
  editForm.style = "display : none";
  addingForm.style = "display : none";
});
// Edit place form visible
editPlace.addEventListener("click", function () {
  editForm.style = "display : block";
  addingForm.style = "display : none";
  deletingform.style = "display : none";
});

// Fetch All data from api
let AllData = [];
let currentPage = 1;
let limit = 9;
let paginationContainer = document.getElementById("pagination-container");
let tableBody = document.getElementById("tableBody");
fetchData(currentPage, limit);
async function fetchData(currentPage, limit) {
  try {
    let res = await fetch(
      `https://traveller-63nk.onrender.com/products?_page=${currentPage}&_limit=${limit}`
    );
    let total = parseInt(res.headers.get("X-Total-Count"));
    let totalPage = Math.ceil(total / limit);
    displayButton(totalPage, limit);
    let data = await res.json();
    console.log(data);
    AllData = data;
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}
// Display All data in table format
function displayData(data) {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td1.innerHTML = item.title;
    td2.innerHTML = item.city;
    td3.innerHTML = item.image;
    td4.innerHTML = item.price;
    td5.innerText = "Delete";
    td5.className = "deleteAdminBtn";
    td5.style = "background:red";
    td5.addEventListener("click", function () {
      event.preventDefault();
      fetch(`https://traveller-63nk.onrender.com/products/${item.id}`, {
        method: "DELETE",
      });
      deletingform.reset();
      alert("Data Deleted successfuly");
    });
    td6.innerText = "Edit";
    td6.className = "editAdminBtn";
    td6.style = "background:yellow";
    td6.addEventListener("click", function () {
      editIdInput.value = item.id;
      editTitleInput.value = item.title;
      editCityInput.value = item.city;
      editImageInput.value = item.image;
      editPriceInput.value = item.price;
    });
    tr.append(td1, td2, td3, td4, td5, td6);
    tableBody.append(tr);
  });
}

// Search Data
const searchInput = document.querySelector(".searchLogo input");
const searchButton = document.querySelector("#search-button");


searchInput.addEventListener("input", () => {
  const searching = searchInput.value.trim().toLowerCase();
  const filterdata = AllData.filter((el) => {
    return el.city.toLowerCase().includes(searching) || el.title.toLowerCase().includes(searching);
  });
  displayData(filterdata);
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

// Total data count
let totalDataCount = document.getElementById("count-destination");
async function total(){
  try {
    let res = await fetch("https://traveller-63nk.onrender.com/products")
    let data = await res.json();
    totalDataCount.innerHTML = `Total Destination : ${data.length}`
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
total()