// JavaScript for theme toggle
const themeToggle = document.getElementById('theme-toggle');
let themeEnabled = false;

themeToggle.addEventListener('click', () => {
    if (!themeEnabled) {
        // Add the theme stylesheet link
        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = 'css/theme.css'; // path to your theme stylesheet
        themeLink.id = 'theme-stylesheet';
        document.head.appendChild(themeLink);
        themeEnabled = true;
    } else {
        // Remove the theme stylesheet link
        document.getElementById('theme-stylesheet').remove();
        themeEnabled = false;
    }
});

// Function to show sections based on navigation clicks
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}


// Initialize validation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const visitorForm = document.getElementById("myform");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        if (validateForm()) {
            document.getElementById("visitor-form").style.display = "none";
            alert("Thank you for visiting!");
        }
    });

    // Show Visitor Form
    const logVisitButton = document.createElement("button");
    logVisitButton.innerText = "Log Visit";
    logVisitButton.addEventListener("click", () => {
        showSection("visitor-form");
    });
    document.querySelector("header").appendChild(logVisitButton);
});

// Validate Form Functionality
function validateForm() {
    let isValid = true;
    // Validate required fields
    const requiredFields = ["first-name", "last-name", "address", "city", "state", "zip", "phone", "email"];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            setElementValidity(fieldId, false, "This field is required.");
            isValid = false;
        } else {
            setElementValidity(fieldId, true, "");
        }
    });

    // Custom validation for State
    const stateField = document.getElementById("state");
    const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA"]; // Add more states
    if (!stateAbbreviations.includes(stateField.value.toUpperCase())) {
        setElementValidity("state", false, "Invalid state abbreviation.");
        isValid = false;
    } else {
        setElementValidity("state", true, "");
    }

    // At least one checkbox selected
    const checkboxes = document.querySelectorAll('input[name="find-us"]:checked');
    if (checkboxes.length === 0) {
        setElementValidity("find-us", false, "At least one option must be selected.");
        isValid = false;
    } else {
        setElementValidity("find-us", true, "");
    }

    return isValid;
}

function setElementValidity(fieldId, isValid, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("was-validated");
    field.setCustomValidity(isValid ? "" : message);
    const errorDiv = field.nextElementSibling;
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}
