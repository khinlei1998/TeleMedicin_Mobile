const validate = (values, props) => {
    const errors = {};
    if (!values.title) {
        errors.title = "Title is required.";
    }

    if (values.startDate === 'Invalid date') {
        errors.startDate = "This value is required.";
    }

    if (values.service_id == 'first') {
        errors.service_id = "Consultation Field is required.";
    }



    if (!values.patient_phoneno) {
        errors.patient_phoneno = "This value is required.";
    }
    if (!String(values.patient_phoneno).match(new RegExp(/^[0-9\b]+$/))) {
        errors.patient_phoneno = "Please enter only number.";
    }

    if (!values.patient_name) {
        errors.patient_name = "This value is required.";
    }
    if (!values.doc_available) {
        errors.doc_available = "Time Slot Field is required.";
    }

    if (values.p_name) {
        errors.dob = values.dob === 'Invalid date'
            ? 'Date Of Birth field is required'
            : undefined;

        errors.p_gender = !values.p_gender
            ? 'Gender field is required'
            : undefined;

    }


    return errors;
};

export default validate;
