const validate = (values, props) => {
    const errors = {};
    if (!values.name) {
        errors.name = "This value is required.";
    }

    // if (!values.gender) {
    //     errors.gender = "This value is required.";
    // }

    if (!values.title) {
        errors.title = "This value is required.";
    }

    if (!values.description) {
        errors.description = "This value is required.";
    }
    return errors;
};

export default validate;
