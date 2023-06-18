
// All html tag select by id
let addPlace = document.querySelector("#addPlace");
let addingform = document.querySelector("#addingForm");
let deletePlace = document.querySelector("#deletePlace");
let deletingform = document.querySelector("#deletingForm");
let correctPlace = document.querySelector("#correctPlace");
let correctionForm = document.querySelector("#correctionForm");
let categorySelect = document.getElementById("category");
let  categorySelect2 = document.getElementById("category2")
let addBtn = document.getElementById("post-btn")
let deleteBtn = document.getElementById("delete-btn")


// Add Post method
addBtn.addEventListener("click",function(){
    event.preventDefault()
    let addTitleInput = document.getElementById("addTitle").value
    let addCityInput = document.getElementById("addCity").value
    let addMainImageInput = document.getElementById("addMainImageUrl").value
    let addPriceInput = document.getElementById("addPrice").value
    let obj = {
        title : addTitleInput,
        city : addCityInput,
        image : addMainImageInput,
        price : addPriceInput
    }
    fetch(`https://traveller-63nk.onrender.com/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        addingform.reset();
        alert("News Posted successfuly");
})
// Add delete method
deleteBtn.addEventListener("click",function(){
    event.preventDefault()
    let deleteId = document.getElementById("deleteId").value;
    fetch(`https://traveller-63nk.onrender.com/products/${deleteId}`,{
        method: "DELETE",
    })
    deletingform.reset();
    alert("News Deleted successfuly");
})

// add place form visible
addPlace.addEventListener("click",function(){
    addingForm.style = "display : block"
    deletingform.style = "display : none"
    correctionForm.style = "display : none"
})
// delete place form visible
deletePlace.addEventListener("click",function(){
    deletingform.style = "display : block"
    correctionForm.style = "display : none"
    addingForm.style = "display : none"
})
// correct place form visible
correctPlace.addEventListener("click",function(){
    correctionForm.style = "display : block"
    addingForm.style = "display : none"
    deletingform.style = "display : none"
})


