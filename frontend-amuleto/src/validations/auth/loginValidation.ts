export type LoginFormValues = {
	email: string;
	password: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const isEmailLike = (value: string) => {
	const v = value.trim();
	if (!v) return false;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
	const errors: LoginFormErrors = {};

	if (!values.email.trim()) {
		errors.email = 'El correo es obligatorio';
	} else if (!isEmailLike(values.email)) {
		errors.email = 'Ingresa un correo válido';
	}

	if (!values.password) {
		errors.password = 'La contraseña es obligatoria';
	}

	return errors;
};
