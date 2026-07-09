const loginForm = document.querySelector(".login-form");
const passwordInput = document.querySelector('input[type="password"]');
const passwordBox = passwordInput.parentElement;
const loginButton = loginForm.querySelector('button[type="submit"]');

const toggleIcon = document.createElement("i");

toggleIcon.className = "fa-solid fa-eye";

toggleIcon.style.cursor = "pointer";

passwordBox.appendChild(toggleIcon);

toggleIcon.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        toggleIcon.className = "fa-solid fa-eye-slash";

    } else {

        passwordInput.type = "password";
        toggleIcon.className = "fa-solid fa-eye";

    }

});

loginForm.addEventListener("submit", e => {

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {

        alert("Please fill in all fields.");
        return;

    }

    loginButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

    loginButton.disabled = true;

    setTimeout(() => {

        loginButton.innerHTML = "Login";
        loginButton.disabled = false;

        alert("Frontend Login Successful!");

        window.location.href = "index.html";

    }, 1800);

});

document.querySelectorAll(".input-box input").forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.style.transform = "translateY(-2px)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.transform = "translateY(0)";

    });

});

document.querySelector(".google-btn").addEventListener("click", () => {

    alert("Google Login will be available after backend integration.");

});