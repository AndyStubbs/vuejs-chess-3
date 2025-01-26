"use strict";

const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 256;
const PASSWORD_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export function usePasswordValidate() {
	function validate(pass) {
		const errors = [];
		const remaining = Math.max(MIN_PASS_LENGTH - pass.length, 0);
		if (remaining > 0) {
			errors.push(`${remaining} character(s)`);
		}
		if (!pass.match(/[a-z]/)) {
			errors.push("lowercase");
		}
		if (!pass.match(/[A-Z]/)) {
			errors.push("uppercase");
		}
		if (!pass.match(/[0-9]/)) {
			errors.push("number");
		}
		if (!pass.match(PASSWORD_REGEX)) {
			errors.push("special");
		}
		if (pass.length > MAX_PASS_LENGTH) {
			errors.push("too long");
		}
		if (errors.length > 0) {
			return "Missing:  " + errors.join(" - ");
		}
		return "";
	}

	return {
		validate,
	};
}
