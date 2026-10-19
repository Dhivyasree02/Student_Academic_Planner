
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

async function sendRequest(path, data) {
    const response = await fetch("/api/" + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Request failed");
    }

    return result;
}

// REGISTER
if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const msg = document.getElementById("msg");
        msg.textContent = "Registering...";

        try {
            const result = await sendRequest("register", {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value
            });

            msg.textContent = result.message;

            if (result.message === "Registration successful") {
                window.location.href = "/login.html";
            }
        } catch (error) {
            msg.textContent = error.message;
        }
    });
}

// LOGIN
if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const msg = document.getElementById("msg");
        msg.textContent = "Checking login...";

        try {
            const result = await sendRequest("login", {
                email: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value
            });

            sessionStorage.setItem("email", result.email);
            sessionStorage.setItem("studentName", result.name);

            window.location.href = "/dashboard.html";
        } catch (error) {
            msg.textContent = error.message;
        }
    });
}

// DASHBOARD
const welcome = document.getElementById("welcome");

if (welcome) {
    const name = sessionStorage.getItem("studentName");

    if (!sessionStorage.getItem("email")) {
        window.location.href = "/login.html";
    } else {
        welcome.textContent = "Welcome, " + (name || "Student") + "!";
    }
}

// LOGOUT
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("studentName");
        window.location.href = "/login.html";
    });
}
