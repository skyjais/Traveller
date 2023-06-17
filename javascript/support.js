
// -------------FAQs
const articles = document.querySelectorAll(".toggle-article");

articles.forEach(article => {
  const message = article.nextElementSibling;
  const icon = article.querySelector("ion-icon");

  article.addEventListener("click", function() {
    if (message.style.display === "none") {
      message.style.display = "block";
      icon.setAttribute("name", "chevron-down-outline");
    } else {
      message.style.display = "none";
      icon.setAttribute("name", "chevron-up-outline");
      
    }
  });
});

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
