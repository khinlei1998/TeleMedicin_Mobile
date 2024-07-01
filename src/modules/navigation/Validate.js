const validate = (values, props) => {
    const errors = {};
    if (!values.speciality) {
        errors.speciality = "This value is required.";
    }
    if (!values.township) {
        errors.township = "This value is required.";
    }
    if (!values.state) {
        errors.state = "This value is required.";
    }

   
    return errors;
};

export default validate;
