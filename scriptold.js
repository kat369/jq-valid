// Form-validation

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addEmployee");
  const allCheckbox = document.querySelector(".checkbox-all");
  const noneCheckbox = document.querySelector(".checkbox-none");
  const checkboxes = document.querySelectorAll(".checkbox-item");
  const employeeStatusField = document.getElementById("employeeStatus");
 
  // Function to handle the "All" checkbox change event
  function handleAllCheckboxChange() {
    if (allCheckbox.checked) {
      checkboxes.forEach((checkbox) => (checkbox.checked = true));
      noneCheckbox.checked = false;
      employeeStatusField.disabled = false;
    } else {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      employeeStatusField.disabled = true;
    }
  }
 
  // Function to handle the "None" checkbox change event
  function handleNoneCheckboxChange() {
    if (noneCheckbox.checked) {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      allCheckbox.checked = false;
      employeeStatusField.disabled = true;
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
 
    // Enable the next field if the first checkbox is checked
    if (checkboxes[0].checked) {
      employeeStatusField.disabled = false;
    } else {
      employeeStatusField.disabled = true;
    }
 
    // Check if all specific checkboxes are checked
    const specificCheckboxesChecked = Array.from(checkboxes).slice(0, 5).every((checkbox) => checkbox.checked);
 
    if (specificCheckboxesChecked) {
      allCheckbox.checked = true;
      noneCheckbox.checked = false;
      employeeStatusField.disabled = false;
    } else {
      allCheckbox.checked = false;
    }
 
    // Check if no checkboxes are checked
    const noneChecked = Array.from(checkboxes).every((checkbox) => !checkbox.checked);
 
    if (noneChecked) {
      noneCheckbox.checked = true;
      allCheckbox.checked = false;
      employeeStatusField.disabled = true;
    } else {
      noneCheckbox.checked = false;
    }
  }
 
  // Add event listeners to the checkboxes
  allCheckbox.addEventListener("change", handleAllCheckboxChange);
  noneCheckbox.addEventListener("change", handleNoneCheckboxChange);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleIndividualCheckboxChange);
  });
  // Add event listeners to the checkboxes
  allCheckbox.addEventListener("change", handleAllCheckboxChange);
  noneCheckbox.addEventListener("change", handleNoneCheckboxChange);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleIndividualCheckboxChange);
  });

  document
    .getElementById("addEmployee")
    .addEventListener("submit", function (event) {
      const fields = [
        {
          id: "firstName",
          errorId: "firstNameError",
          mandatory: true,
          message: "This field is required",
          min: 1,
          max: 65,
          lengthMessage: "First name must be between 1 and 65 characters.",
          pattern: /^[A-Za-z]+$/,
          patternMessage:
            "First name cannot contain numbers, spaces, or special characters.",
        },
        {
          id: "middleName",
          errorId: "middleNameError",
          mandatory: false,
          message: "This field is required",
          max: 65,
          lengthMessage: "Middle name must be up to 65 characters",
          pattern: /^[a-zA-Z]*$/,
          patternMessage:
            "Middle name cannot contain numbers, spaces, or special characters.",
        },
        {
          id: "lastName",
          errorId: "lastNameError",
          mandatory: true,
          message: "This field is required",
          min: 1,
          max: 65,
          lengthMessage: "Last name must be between 1 and 65 characters.",
          pattern: /^[A-Za-z]+$/,
          patternMessage:
            "Last name cannot contain numbers, spaces, or special characters.",
        },
        {
          id: "department",
          errorId: "departmentError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "passportNumber",
          errorId: "passportNumberError",
          mandatory: true,
          message: "This field is required",
          pattern: /^[A-Z]{1,2}\d{6,9}$/,
          patternMessage: "Invalid passport number.",
        },
        {
          id: "birthday",
          errorId: "birthdayError",
          mandatory: true,
          message: "This field is required",
          checkDate: true,
          dateMessage: "Future date cannot be selected.",
          minAge: 18,
          ageMessage: "Age should be above 18.",
        },
        {
          id: "dateOfJoining",
          errorId: "dateOfJoiningError",
          mandatory: true,
          message: "This field is required",
          checkDate: true,
          dateMessage: "Future date cannot be selected.",
        },
        {
          id: "indMedRep",
          errorId: "indMedRepError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "visaDoc",
          errorId: "visaDocError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "workPermit",
          errorId: "workPermitError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "onsiteVisaStatus",
          errorId: "onsiteVisaStatusError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "travelOnsite",
          errorId: "travelOnsiteError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "onsiteDOJ",
          errorId: "onsiteDOJError",
          mandatory: true,
          checkOnsiteDOJ: true,
          message: "This field is required",
          errorMessage: "Date Should come after Joining Date.",
        },
        {
          id: "medReport",
          errorId: "medReportError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "visaStamp",
          errorId: "visaStampError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "onsiteIdStatus",
          errorId: "onsiteIdStatusError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "hrComments",
          errorId: "hrCommentsError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "employeeStatus",
          errorId: "employeeStatusError",
          mandatory: true,
          message: "This field is required",
        },
        {
          id: "passportStatus",
          errorId: "passportStatusError",
          mandatory: true,
          message: "This field is required",
        },
      ];

      let isValid = true;

      fields.forEach(
        ({
          id,
          errorId,
          mandatory,
          message,
          pattern,
          patternMessage,
          checkDate,
          checkOnsiteDOJ,
          minAge,
          dateMessage,
          ageMessage,
          min,
          max,
          lengthMessage,
          errorMessage,
        }) => {
          const currentField = document.getElementById(id);
          const inpValue = document.getElementById(id).value;
          const errorElement = document.getElementById(errorId);

          // Clear previous error
          errorElement.innerText = "";
          if (currentField.disabled === false) {
            if (mandatory) {
              if (inpValue === "") {
                errorElement.innerText = message;
                isValid = false;
                return;
              }

              // Length validate
              if (inpValue.length < min || inpValue.length > max) {
                errorElement.innerText = lengthMessage;
                isValid = false;
                return;
              }

              // Pattern validation
              if (pattern && !pattern.test(inpValue)) {
                errorElement.innerText = patternMessage;
                isValid = false;
                return;
              }

              // date and age validation
              if (checkDate) {
                const today = new Date();
                const birthDate = new Date(inpValue);
                if (birthDate > today) {
                  errorElement.innerText = dateMessage;
                  isValid = false;
                  return;
                } else {
                  let age = today.getFullYear() - birthDate.getFullYear();
                  const monthDiff = today.getMonth() - birthDate.getMonth();
                  if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                  ) {
                    age--;
                  }
                  if (age < minAge) {
                    errorElement.innerText = ageMessage;
                    isValid = false;
                    return;
                  }
                }

              }
            } else {
              // Length validate
              if (inpValue.length < min || inpValue.length > max) {
                errorElement.innerText = lengthMessage;
                isValid = false;
                return;
              }
              // Pattern validation
              if (pattern && !pattern.test(inpValue)) {
                errorElement.innerText = patternMessage;
                isValid = false;
                return;
              }
            }
          } else {
          }

          // Basic required field validation
          const checked = Array.from(checkboxes).some(
            (checkbox) => checkbox.checked
          );

          if (!checked && !allCheckbox.checked && !noneCheckbox.checked) {
            document.getElementById("checkboxError").textContent =
              "This field is mandatory.";
            isValid = false;
          } else {
            document.getElementById("checkboxError").textContent = "";
          }
        }
      );
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
  if (onsiteJoiningDate < indianDOJ) {
    onsiteDOJError.textContent = "Onsite date of joining cannot be earlier than Indian date of joining.";
      isValid = false;
  } 

      if (!isValid) {
        event.preventDefault();
      }
    });
  updateCheckboxes();
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
              if (currentFieldId === "onsiteDOJ" || currentFieldId === "dateOfJoining") {
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
        document.getElementById(fields[i]).value = "";
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
  enableNextField("dateOfJoining", "indMedRep");
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




