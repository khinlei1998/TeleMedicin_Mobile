const validate = (values, props) => {
	const errors = {};

	if (!values.payment) {
		errors.payment = "Payment Field is required.";
	} 
   
	return errors;
};

export default validate;
