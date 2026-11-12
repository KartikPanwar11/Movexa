export const checkValidData = (email, password, isSignUp, name, confirmPassword) => {
  const isMailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!isMailValid) return "Enter a valid email address";

  if (!isSignUp) {
    if (password === "") return "Enter your password";
    return null;
  }

  if (name.trim() === "") return "Enter your name";

  const isPassValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);
  if (!isPassValid) return "Password needs 8+ characters with uppercase, lowercase, a number and a symbol";

  if (password !== confirmPassword) return "Passwords don't match";

  return null;
};

export const getAuthErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Sign in instead.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a minute and try again.";
    case "auth/network-request-failed":
      return "No internet connection. Check your network and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};
