export type RegisterFormValues = {
	name: string;
	email: string;
	telefono?: string;
	direccion?: string;
	password: string;
	confirmPassword: string;
	acceptedTerms: boolean;
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

const isEmailLike = (value: string) => {
	const v = value.trim();
	if (!v) return false;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
	const errors: RegisterFormErrors = {};

	if (!values.name.trim()) {
		errors.name = 'El nombre es obligatorio';
	} else if (values.name.trim().length < 2) {
		errors.name = 'El nombre debe tener al menos 2 caracteres';
	}

	if (!values.email.trim()) {
		errors.email = 'El correo es obligatorio';
	} else if (!isEmailLike(values.email)) {
		errors.email = 'Ingresa un correo válido';
	}

	if (!values.password) {
		errors.password = 'La contraseña es obligatoria';
	} else if (values.password.length < 6) {
		errors.password = 'La contraseña debe tener al menos 6 caracteres';
	}

	if (values.telefono && values.telefono.trim()) {
		const digits = values.telefono.replace(/\D/g, '');
		if (digits.length < 7) {
			errors.telefono = 'Ingresa un teléfono válido';
		}
	}

	if (values.direccion && values.direccion.trim()) {
		if (values.direccion.trim().length < 5) {
			errors.direccion = 'Ingresa una dirección válida';
		}
	}

	if (!values.confirmPassword) {
		errors.confirmPassword = 'Confirma tu contraseña';
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'Las contraseñas no coinciden';
	}

	if (!values.acceptedTerms) {
		errors.acceptedTerms = 'Debes aceptar los términos y condiciones';
	}

	return errors;
};
