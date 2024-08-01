document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addEmployee");
    const allCheckbox = document.querySelector(".checkbox-all");
    const noneCheckbox = document.querySelector(".checkbox-none");
    const checkboxes = document.querySelectorAll(".checkbox-item");

    // Function to handle the "All" checkbox change event
    function handleAllCheckboxChange() {
        if (allCheckbox.checked) {
            checkboxes.forEach((checkbox) => (checkbox.checked = true));
            noneCheckbox.checked = false;
        } else {
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
        }
    }

    // Function to handle the "None" checkbox change event
    function handleNoneCheckboxChange() {
        if (noneCheckbox.checked) {
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
            allCheckbox.checked = false;
        }
    }

    // Function to handle individual checkbox change events
    function handleIndividualCheckboxChange(event) {
        const targetIndex = Array.from(checkboxes).indexOf(event.target);

        // Ensure all preceding checkboxes are checked if a checkbox is selected
        if (event.target.checked) {
            for (let i = 0; i <= targetIndex; i++) {
                checkboxes[i].checked = true;
            }
        } else {
            // Ensure all succeeding checkboxes are unchecked if a checkbox is deselected
            for (let i = targetIndex; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }

        // Check if all checkboxes are checked
        const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
        const noneChecked = Array.from(checkboxes).every((checkbox) => !checkbox.checked);

        if (allChecked) {
            allCheckbox.checked = true;
            noneCheckbox.checked = false;
        } else if (noneChecked) {
            noneCheckbox.checked = true;
            allCheckbox.checked = false;
        } else {
            allCheckbox.checked = false;
            noneCheckbox.checked = false;
        }
    }

    // Add event listeners to the checkboxes
    allCheckbox.addEventListener("change", handleAllCheckboxChange);
    noneCheckbox.addEventListener("change", handleNoneCheckboxChange);
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleIndividualCheckboxChange);
    });

    form.addEventListener("submit", function (event) {
        let isValid = true;
        const checked = Array.from(checkboxes).some((checkbox) => checkbox.checked);

        if (!checked && !allCheckbox.checked && !noneCheckbox.checked) {
            document.getElementById("checkboxError").textContent =
                "This field is mandatory.";
            isValid = false;
        } else {
            document.getElementById("checkboxError").textContent = "";
        }

        // Validate First Name
        const firstName = document.getElementById("firstName").value;
        const firstNameError = document.getElementById("firstNameError");
        firstNameError.textContent = "";
        const nameRegex = /^[A-Za-z]+$/;
        if (!firstName) {
            firstNameError.textContent = "This field is required.";
            isValid = false;
        } else if (firstName.length < 1 || firstName.length > 65) {
            firstNameError.textContent =
                "First name must be between 1 and 65 characters.";
            isValid = false;
        } else if (!nameRegex.test(firstName)) {
            firstNameError.textContent =
                "First name cannot contain numbers, spaces, or special characters.";
            isValid = false;
        }

        // Validate Middle Name (optional)
        const middleName = document.getElementById("middleName").value;
        const middleNameError = document.getElementById("middleNameError");
        middleNameError.textContent = "";
        if (middleName.length > 65) {
            middleNameError.textContent = "Middle name must be up to 65 characters.";
            isValid = false;
        } else if (/\d/.test(middleName)) {
            middleNameError.textContent = "Middle name cannot contain numbers.";
            isValid = false;
        }

        // Validate Last Name
        const lastName = document.getElementById("lastName").value;
        const lastNameError = document.getElementById("lastNameError");
        lastNameError.textContent = "";
        if (!lastName) {
            lastNameError.textContent = "This field is required.";
            isValid = false;
        } else if (lastName.length < 1 || lastName.length > 65) {
            lastNameError.textContent =
                "Last name must be between 1 and 65 characters.";
            isValid = false;
        } else if (/\d/.test(lastName)) {
            lastNameError.textContent = "Last name cannot contain numbers.";
            isValid = false;
        }

        // Validate Department
        const department = document.getElementById("department").value;
        const departmentError = document.getElementById("departmentError");
        departmentError.textContent = "";
        if (!department) {
            departmentError.textContent = "This field is required.";
            isValid = false;
        }

        // Validate Passport Number
        const passportNumber = document.getElementById("passportNumber").value;
        const passportNumberError = document.getElementById("passportNumberError");
        passportNumberError.textContent = "";
        const passportRegex = /^[A-Z]{1,2}\d{6,9}$/;
        if (!passportNumber) {
            passportNumberError.textContent = "This field is required.";
            isValid = false;
        } else if (!passportRegex.test(passportNumber)) {
            passportNumberError.textContent = "Invalid passport number.";
            isValid = false;
        }

        // Validate Date of Birth
        const birthday = document.getElementById("birthday").value;
        const birthdayError = document.getElementById("birthdayError");
        birthdayError.textContent = "";
        if (!birthday) {
            birthdayError.textContent = "This field is required.";
            isValid = false;
        } else {
            const today = new Date();
            const birthDate = new Date(birthday);
            if (birthDate > today) {
                birthdayError.textContent = "Future date cannot be selected.";
                isValid = false;
            } else {
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                    age--;
                }
                if (age < 18) {
                    birthdayError.textContent = "Age should be above 18.";
                    isValid = false;
                }
            }
        }

        // Validate Date of Joining
        const dateOfJoining = document.getElementById("dateOfJoining").value;
        const dateOfJoiningError = document.getElementById("dateOfJoiningError");
        dateOfJoiningError.textContent = "";
        if (!dateOfJoining) {
            dateOfJoiningError.textContent = "This field is required.";
            isValid = false;
        } else {
            const today = new Date();
            const joiningDate = new Date(dateOfJoining);
            if (joiningDate > today) {
                dateOfJoiningError.textContent = "Future date cannot be selected.";
                isValid = false;
            }
        }

        // Validate Onsite Date of Joining
        const onsiteDOJ = document.getElementById("onsiteDOJ").value;
        const onsiteDOJError = document.getElementById("onsiteDOJError");
        onsiteDOJError.textContent = "";
        const indianDOJ = new Date(dateOfJoining);
        const onsiteJoiningDate = new Date(onsiteDOJ);
        if (!onsiteDOJ) {
            onsiteDOJError.textContent = "This field is Required.";
            isValid = false;
        } else if (onsiteJoiningDate < indianDOJ) {
            onsiteDOJError.textContent = "Onsite date of joining cannot be earlier than Indian date of joining.";
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    // Initial call to handle states when the page is loaded
    updateCheckboxes();


});

// Event listeners to restrict invalid characters
document.getElementById("firstName").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z]/g, "");
});
document.getElementById("middleName").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z]/g, "");
});
document.getElementById("lastName").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z]/g, "");
});
document
    .getElementById("passportNumber")
    .addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Z0-9]/g, "").slice(0, 11);
    });
// input field disable onchange

document.addEventListener("DOMContentLoaded", () => {
    const fields = [
        "indMedRep",
        "visaDoc",
        "workPermit",
        "onsiteVisaStatus",
        "travelOnsite",
        "onsiteDOJ",
        "medReport",
        "visaStamp",
        "onsiteIdStatus",
        "medicalInsCheck",
        "employeeStatus",
        "passportStatus",
    ];

    function enableNextField(
        currentFieldId,
        nextFieldId,
        validValue,
        extraValue
    ) {
        if (currentFieldId === "onsiteIdStatus") {
            const currentField = document.getElementById(currentFieldId);
            const nextField = document.querySelectorAll('#medicalInsCheck');

            currentField.addEventListener("change", () => {
                if (
                    currentField.value === validValue
                ) {
                    nextField.forEach(function (checkbox) {
                        checkbox.disabled = false;
                    })

                } else {
                    nextField.forEach(function (checkbox) {
                        checkbox.disabled = true;
                    })
                    disableFollowingFields(nextFieldId);
                }
            });
        } else {
            const currentField = document.getElementById(currentFieldId);
            const nextField = document.getElementById(nextFieldId);

            currentField.addEventListener("change", () => {
                if (currentFieldId === "onsiteDOJ") {
                    if (
                        currentField.value != ""
                    ) {
                        nextField.disabled = false;
                    } else {
                        nextField.disabled = true;
                        disableFollowingFields(nextFieldId);
                    }
                } else {
                    if (
                        currentField.value === validValue ||
                        currentField.value === extraValue || currentField.checked
                    ) {
                        nextField.disabled = false;
                    } else {
                        nextField.disabled = true;
                        disableFollowingFields(nextFieldId);
                    }
                }
            });
        }
    }

    function disableFollowingFields(startFieldId) {
        const startIndex = fields.indexOf(startFieldId);
        for (let i = startIndex + 1; i < fields.length; i++) {
            document.getElementById(fields[i]).disabled = true;
        }
    }

    // Ensure Onsite DOJ is not earlier than Indian DOJ
    const indianDOJField = document.getElementById("dateOfJoining");
    const onsiteDOJField = document.getElementById("onsiteDOJ");
    indianDOJField.addEventListener("change", () => {
        const indianDOJ = new Date(indianDOJField.value);
        if (onsiteDOJField.value) {
            const onsiteDOJ = new Date(onsiteDOJField.value);
            if (onsiteDOJ < indianDOJ) {
                onsiteDOJField.value = "";
                document.getElementById("onsiteDOJError").textContent =
                    "Onsite date of joining cannot be earlier than Indian date of joining.";
            } else {
                document.getElementById("onsiteDOJError").textContent = "";
            }
        }
    });

    onsiteDOJField.addEventListener("change", () => {
        const indianDOJ = new Date(indianDOJField.value);
        const onsiteDOJ = new Date(onsiteDOJField.value);
        if (onsiteDOJ < indianDOJ) {
            onsiteDOJField.value = "";
            document.getElementById("onsiteDOJError").textContent =
                "Onsite date of joining cannot be earlier than Indian date of joining.";
        } else {
            document.getElementById("onsiteDOJError").textContent = "";
        }
    });


    // Enable next field only if the current field has a specific valid value
    enableNextField("indMedRep", "visaDoc", "fit");
    enableNextField("visaDoc", "workPermit", "collected");
    enableNextField("workPermit", "onsiteVisaStatus", "received");
    enableNextField("onsiteVisaStatus", "travelOnsite", "received");
    enableNextField("travelOnsite", "onsiteDOJ", "booked");
    enableNextField("onsiteDOJ", "medReport");
    enableNextField("medReport", "visaStamp", "1st test fit", "2nd test fit");
    enableNextField("visaStamp", "onsiteIdStatus", "received");
    enableNextField("onsiteIdStatus", "medicalInsCheck", "id received");
    enableNextField("medicalInsCheck", "employeeStatus");
    enableNextField("employeeStatus", "passportStatus", "active");
});

