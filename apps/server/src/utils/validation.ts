const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Requires at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const isValidEmail = (email: string): boolean => emailRegex.test(email);
export const isValidPassword = (password: string): boolean =>
  passwordRegex.test(password);
