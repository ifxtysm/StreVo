const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const googleButton = document.querySelector(".google-btn");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const response = await fetch("http://localhost:3000/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: email.value,

                password: password.value

            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful!");

            window.location.href = "index.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

});

googleButton.addEventListener("click", () => {

    alert("Google Login will be added in the next version.");

});