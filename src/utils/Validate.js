
export const checkValidData = (email, password) => {

    const isMailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.text(email);

    const isPassValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if(!isMailValid) return "Email is not valid!!";
    if(!isPassValid) return "Password is not valid!!"

    return null;
};