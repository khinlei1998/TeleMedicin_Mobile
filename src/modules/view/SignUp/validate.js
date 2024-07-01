const validate = (values, props) => {
    const errors = {};
    if (!values.name) {
        errors.name = "This value is required.";
    }
    if (!values.age) {
        errors.age = "This value is required.";
    }
    if (!values.phone_number) {
        errors.phone_number = "This value is required.";
    }
    if (!String(values.phone_number).match(new RegExp(/^[0-9\b]+$/))) {
        errors.phone_number = "Please enter only number.";
    }

    if (!values.password) {
        errors.password = "This value is required.";
    }

    return errors;
};

export default validate;
