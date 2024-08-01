
$(document).ready(function () {
    const $form = $('#addEmployee');
    const $allCheckbox = $('.checkbox-all');
    const $noneCheckbox = $('.checkbox-none');
    const $checkboxes = $('.checkbox-item');
    const $medicalInsuranceCheckboxes = $('.custom-checkbox-container input[type="checkbox"]');
    const $onsiteIdStatus = $('#onsiteIdStatus');
    const $employeeStatus = $('#employeeStatus');
    const $passportStatus = $('#passportStatus');
    const $fileInputs = $('input[type="file"]');

    // Initially disable Medical Insurance checkboxes and subsequent fields
    $medicalInsuranceCheckboxes.prop('disabled', true);
    $employeeStatus.prop('disabled', true);
    $passportStatus.prop('disabled', true);
    $fileInputs.prop('disabled', true);

    function updateCheckboxState() {
        console.log("in")
        const allChecked = $checkboxes.length === $checkboxes.filter(':checked').length;
        const noneChecked = $checkboxes.filter(':checked').length === 0;

        $allCheckbox.prop('checked', allChecked);
        $noneCheckbox.prop('checked', noneChecked);

        // Enable the Employee Status field if "All" is checked
        $employeeStatus.prop('disabled', !allChecked).val('');;
    }

    $allCheckbox.change(function () {
        $checkboxes.prop('checked', this.checked);
        if (this.checked) {
            $noneCheckbox.prop('checked', false);
        }
        updateCheckboxState();
    });

    $noneCheckbox.change(function () {
        if (this.checked) {
            $checkboxes.prop('checked', false);
            $allCheckbox.prop('checked', false);
            updateCheckboxState(); // Disable next field if "None" is selected
        }
    });

    $checkboxes.change(function () {
        updateCheckboxState();
    });

    $onsiteIdStatus.change(function () {
        const selectedValue = $(this).val();
        if (selectedValue === "id received") {
            $medicalInsuranceCheckboxes.prop('disabled', false); // Enable checkboxes if valid option is selected
        } else {
            $medicalInsuranceCheckboxes.prop('disabled', true); // Keep them disabled otherwise
            $medicalInsuranceCheckboxes.prop('checked', false); // Uncheck all checkboxes
            updateCheckboxState();
        }
    });

    $employeeStatus.change(function () {
        const selectedValue = $(this).val();
        // Enable Passport Status when Employee Status is "Active"
        if (selectedValue === "active") {
            $passportStatus.prop('disabled', false);
        } else {
            $passportStatus.prop('disabled', true).val(''); // Reset and disable Passport Status
            $fileInputs.prop('disabled', true).val(''); // Reset file inputs
        }
    });

    $passportStatus.change(function () {
        const selectedValue = $(this).val();
        // Enable file inputs when Passport Status is "Returned To Employee"
        if (selectedValue === "returnedtoemployee") {
            $fileInputs.prop('disabled', false);
        } else {
            $fileInputs.prop('disabled', true).val(''); // Reset file inputs
        }
    });

    $form.submit(function (event) {
        let isValid = true;

        const fields = [
            { id: "firstName", mandatory: true, min: 1, max: 65, pattern: /^[A-Za-z]+$/, message: "First name must be between 1 and 65 characters, and contain only letters." },
            { id: "middleName", max: 65, pattern: /^[a-zA-Z]*$/, message: "Middle name can be up to 65 characters, and contain only letters." },
            { id: "lastName", mandatory: true, min: 1, max: 65, pattern: /^[A-Za-z]+$/, message: "Last name must be between 1 and 65 characters, and contain only letters." },
            { id: "department", mandatory: true, message: "This field is mandatory." },
            { id: "passportNumber", mandatory: true, pattern: /^[A-Z]{1,2}\d{6,9}$/, message: "Invalid passport number." },
            { id: "birthday", mandatory: true, checkDate: true, minAge: 18, message: "Future date cannot be selected. Age should be above 18." },
            { id: "dateOfJoining", mandatory: true, checkDate: true, message: "Future date cannot be selected." },
            { id: "onsiteDOJ", mandatory: true, checkOnsiteDOJ: true, message: "Date should come after Joining Date." },
            { id: "indMedRep", mandatory: true, message: "This field is required." },
            { id: "visaDoc", mandatory: true, message: "This field is required." },
            { id: "workPermit", mandatory: true, message: "This field is required." },
            { id: "onsiteVisaStatus", mandatory: true, message: "This field is required." },
            { id: "travelOnsite", mandatory: true, message: "This field is required." },
            { id: "onsiteDOJ", mandatory: true, message: "This field is required." },
            { id: "medReport", mandatory: true, message: "This field is required." },
            { id: "visaStamp", mandatory: true, message: "This field is required." },
            { id: "onsiteIdStatus", mandatory: true, message: "This field is required." },
            { id: "hrComments", mandatory: true, message: "This field is required." },
            { id: "passportStatus", mandatory: true, message: "This field is required." },
            { id: "employeeStatus", mandatory: true, message: "This field is required." },
        ];

        fields.forEach(({ id, mandatory, min, max, pattern, message, checkDate, minAge, checkOnsiteDOJ }) => {
            const $field = $(`#${id}`);
            const value = $field.val().trim();
            const $error = $(`#${id}Error`);
            $error.text('');

            if ($field.is(':disabled')) return;

            if (mandatory && !value) {
                $error.text("This field is required.");
                isValid = false;
                return;
            }

            if (value.length < min || value.length > max) {
                $error.text(message);
                isValid = false;
                return;
            }

            if (pattern && !pattern.test(value)) {
                $error.text(message);
                isValid = false;
                return;
            }

            if (checkDate) {
                const today = new Date();
                const dateValue = new Date(value);
                if (dateValue > today) {
                    $error.text(message);
                    isValid = false;
                    return;
                }
                if (minAge && today.getFullYear() - dateValue.getFullYear() < minAge) {
                    $error.text(message);
                    isValid = false;
                    return;
                }
            }

            if (checkOnsiteDOJ) {
                const doj = new Date($('#dateOfJoining').val());
                const onsiteDOJ = new Date(value);
                if (onsiteDOJ <= doj) {
                    $error.text(message);
                    isValid = false;
                    return;
                }
            }
        });

        if (!$checkboxes.is(':checked') && !$allCheckbox.is(':checked') && !$noneCheckbox.is(':checked')) {
            $('#checkboxError').text('This field is mandatory.');
            isValid = false;
        } else {
            $('#checkboxError').text('');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    const indianDOJField = $('#dateOfJoining');
    const onsiteDOJField = $('#onsiteDOJ');
    
    indianDOJField.on('change', () => {
        const indianDOJ = new Date(indianDOJField.val());
        if (onsiteDOJField.val()) {
            const onsiteDOJ = new Date(onsiteDOJField.val());
            if (onsiteDOJ > indianDOJ) {
                onsiteDOJField.val('');
                $('#onsiteDOJError').text('Onsite date of joining cannot be earlier than Indian date of joining.');
            } else {
                $('#onsiteDOJError').text('');
            }
        }
    });

    onsiteDOJField.on('change', () => {
        const indianDOJ = new Date(indianDOJField.val());
        const onsiteDOJ = new Date(onsiteDOJField.val());
        if (onsiteDOJ > indianDOJ) {
            $('#onsiteDOJError').text('Onsite date of joining cannot be earlier than Indian date of joining.');
        } else {
            $('#onsiteDOJError').text('');
        }
    });
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
        "employeeStatus",
        "passportStatus",
    ];
    const onsiteDOJval = $('#onsiteDOJ').val().trim();
    const dependencies = {
        "indMedRep": { next: "visaDoc", values: ["fit"] },
        "visaDoc": { next: "workPermit", values: ["collected"] },
        "workPermit": { next: "onsiteVisaStatus", values: ["received"] },
        "onsiteVisaStatus": { next: "travelOnsite", values: ["received"] },
        "travelOnsite": { next: "onsiteDOJ", values: ["booked"] },
        "onsiteDOJ": { next: "medReport", values: [onsiteDOJval] },
        "medReport": { next: "visaStamp", values: ["1st test fit", "2nd test fit"] },
        "visaStamp": { next: "onsiteIdStatus", values: ["received"] },
        // No need to automatically enable employeeStatus after onsiteIdStatus
    };

    function updateFieldState(currentField, nextField, values) {
        if (values.includes(currentField.val())) {
            if (nextField.attr('id') === 'employeeStatus') {
                // Only enable based on checkboxes
                updateCheckboxState();
            } else {
                nextField.prop('disabled', false);
            }
        } else {
            nextField.prop('disabled', true).val(''); // Reset field value
            disableFollowingFields(nextField);
        }
    }

    function disableFollowingFields(startField) {
        const startIndex = fields.indexOf(startField.attr('id'));
        for (let i = startIndex + 1; i < fields.length; i++) {
            const $field = $(`#${fields[i]}`);
            $field.prop('disabled', true).val(''); // Reset and disable field
        }
        $fileInputs.prop('disabled', true).val(''); // Reset file inputs
    }

    $.each(dependencies, (currentId, { next, values }) => {
        const $currentField = $(`#${currentId}`);
        const $nextField = $(`#${next}`);
        $currentField.change(() => {
            disableFollowingFields($currentField); // Reset and disable all following fields
            updateFieldState($currentField, $nextField, values);
        });
    });
});

