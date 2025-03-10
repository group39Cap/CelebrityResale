document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const requirements = [
        { id: "length", regex: /.{8,}/ },
        { id: "number", regex: /\d/ },
        { id: "symbol", regex: /[!@#$%^&*(),.?":{}|<>]/ }
    ];

    // Toggle password visibility
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        this.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Real-time validation
    passwordInput.addEventListener("input", function () {
        let allValid = true;
        requirements.forEach(req => {
            const element = document.getElementById(req.id);
            if (req.regex.test(passwordInput.value)) {
                element.classList.add("valid");
            } else {
                element.classList.remove("valid");
                allValid = false;
            }
        });

        // Apply border color based on validity
        if (allValid) {
            passwordInput.classList.add("valid");
            passwordInput.classList.remove("invalid");
        } else {
            passwordInput.classList.remove("valid");
            passwordInput.classList.add("invalid");
        }
    });
});


const loginButton = document.querySelector(".login-btn");

loginButton.addEventListener('click', ()=>{
    console.log("hello")
    window.location.href = "/Login_page/index.html";
})