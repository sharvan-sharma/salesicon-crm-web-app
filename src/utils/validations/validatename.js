const validateName = (name) => {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if (name.match(letterNumber)) {
        return true;
    } else {
        return false;
    }
}

export default validateName