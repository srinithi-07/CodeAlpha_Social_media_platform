

// ---------------- LOGIN ----------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${BASE_URL}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login Successful!");

                window.location.href = "index.html";

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

            alert("Server Error");

        }

    });

}

// ---------------- REGISTER ----------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("username").value;

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${BASE_URL}/auth/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    username,
                    email,
                    password

                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Registration Successful!");

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

            alert("Server Error");

        }

    });

}