document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        alert("All fields are required!");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Form submitted successfully!");
    this.reset();
});

document.getElementById("addImage").addEventListener("click", function() {
    let url = document.getElementById("imageURL").value.trim();
    if (url) {
        let img = document.createElement("img");
        img.src = url;
        img.alt = "Gallery Image";
        img.addEventListener("click", () => img.remove()); // Remove image on click
        document.getElementById("gallery").appendChild(img);
        document.getElementById("imageURL").value = "";
    } else {
        alert("Please enter an image URL.");
    }
});
