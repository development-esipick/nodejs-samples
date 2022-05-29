/**
 * Check if email is valid
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
	if (!email) {
		return false;
	}
	const emailValidPattern = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
	return emailValidPattern.test(email);
};

/**
 * Check if username is valid. Rules: At least 8 characters. It must contain numbers, lowercase letters and uppercase letters.
 * @param {string} username
 * @returns {boolean}
 */
const isValidUsername = (username) => {
	if (!username) {
		return false;
	}
	const usernameValidPattern = new RegExp(/[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/);
	return usernameValidPattern.test(username);
};

/**
 * Check if password is secure. Rules: At least 8 characters. It must contain numbers, lowercase letters and uppercase letters. The spaces are not allowed. Only english characters are allowed. This characters are not allowed: { } ( ) | ~ € ¿ ¬
 * @param {string} password
 * @returns {boolean}
 */
const isStrongPassword = (password) => {
	if (!password) {
		return false;
	}
	const passwordValidPattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/);
	return passwordValidPattern.test(password);
};

module.exports = {
	isValidEmail: isValidEmail,
	isValidUsername: isValidUsername,
	isStrongPassword: isStrongPassword
}
