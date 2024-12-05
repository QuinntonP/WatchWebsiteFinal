const stateAbbreviations = ["AL", "AK", "AZ", "AR", /* other states */];

function checkRequired(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
        setElementValidity(fieldId, false, errorMessage);
        return false;
    }
    setElementValidity(fieldId, true, "");
    return true;
}

function setElementValidity(fieldId, isValid, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('was-validated');
    field.setCustomValidity(isValid ? "" : message);
    const errorDiv = field.nextElementSibling;
    errorDiv.textContent = message;
}

// Add other functions: checkFormat, validateState, etc.
