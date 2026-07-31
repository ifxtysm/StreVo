const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const googleButton = document.querySelector(".google-btn");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        return;

    }

    try {

        const response = await fetch("http://localhost:3000/api/auth/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username: username.value,
                email: email.value,
                password: password.value

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Account created successfully!");

            window.location.href = "login.html";

        }

        else {

            alert(data.message || "Registration failed.");

        }

    }

    catch (error) {

        console.error(error);

        alert("Cannot connect to the server.");

    }

});

googleButton.addEventListener("click", () => {

    alert("Google Login will be added later.");

});