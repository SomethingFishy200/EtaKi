let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function validateForm() {
  var emailInput = document.querySelectorAll('.email__input');
  var inputValue = emailInput.value.toLowerCase(); // Convert input to lowercase
  console.log(emailInput);
  // Validate if inputValue contains 'moyna'
  if (inputValue=='moyna') {
    window.location.href = "https://drive.google.com/file/d/13RhNSGSjved7ZLERW7-7v9j5hDYDS7PV/view?usp=drive_link";

  } else {
    // If 'moyna' is not found, display an error message
    alert('Your nickname is not correct.');
    return false;
  }
}
