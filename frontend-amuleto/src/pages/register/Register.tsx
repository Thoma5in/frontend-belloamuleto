import { useState } from 'react';
import './Register.css';
import brandIcon from '../../assets/icons/icono-bello-amuleto.png';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '../../validations/auth/registerValidation';
import type { RegisterFormErrors, RegisterFormValues } from '../../validations/auth/registerValidation';

const Register = () => {
	const [values, setValues] = useState<RegisterFormValues>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		acceptedTerms: false,
	});
	const [errors, setErrors] = useState<RegisterFormErrors>({});
	const navigate = useNavigate();

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const nextErrors = validateRegisterForm(values);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		// UI-only screen (no backend yet)
		void values;
	};

	return (
		<div className="register-page">
			<div className="register-brand" aria-label="Bello Amuleto">
				<span className="register-brand-text">Bello</span>
				<img className="register-brand-icon" src={brandIcon} alt="" aria-hidden="true" />
				<span className="register-brand-text">Amuleto</span>
			</div>

			<main className="register-main">
				<section className="register-card" aria-labelledby="register-title">
					<div className="register-card-inner">
						<h1 id="register-title" className="register-title">Registrarse</h1>

						<form className="register-form" onSubmit={onSubmit}>
							<div className="register-field">
								<label className="register-label" htmlFor="register-name">Nombre</label>
								<input
									id="register-name"
									className={`register-input${errors.name ? ' register-input-error' : ''}`}
									type="text"
									placeholder="Nombre"
									value={values.name}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, name: e.target.value }));
										if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
									}}
									autoComplete="name"
								/>
								{errors.name ? <p className="register-error">{errors.name}</p> : null}
							</div>

							<div className="register-field">
								<label className="register-label" htmlFor="register-email">Correo</label>
								<input
									id="register-email"
									className={`register-input${errors.email ? ' register-input-error' : ''}`}
									type="email"
									placeholder="Correo electrónico"
									value={values.email}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, email: e.target.value }));
										if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
									}}
									autoComplete="email"
								/>
								{errors.email ? <p className="register-error">{errors.email}</p> : null}
							</div>

							<div className="register-field">
								<label className="register-label" htmlFor="register-password">Contraseña</label>
								<input
									id="register-password"
									className={`register-input${errors.password ? ' register-input-error' : ''}`}
									type="password"
									placeholder="Contraseña"
									value={values.password}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, password: e.target.value }));
										if (errors.password || errors.confirmPassword) {
											setErrors((prev) => ({
												...prev,
												password: undefined,
												confirmPassword: undefined,
											}));
										}
									}}
									autoComplete="new-password"
								/>
								{errors.password ? <p className="register-error">{errors.password}</p> : null}
							</div>

							<div className="register-field">
								<label className="register-label" htmlFor="register-confirm-password">Confirmar contraseña</label>
								<input
									id="register-confirm-password"
									className={`register-input${errors.confirmPassword ? ' register-input-error' : ''}`}
									type="password"
									placeholder="Confirmar contraseña"
									value={values.confirmPassword}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, confirmPassword: e.target.value }));
										if (errors.confirmPassword) {
											setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
										}
									}}
									autoComplete="new-password"
								/>
								{errors.confirmPassword ? (
									<p className="register-error">{errors.confirmPassword}</p>
								) : null}
							</div>

							<label className="register-terms">
								<input
									className="register-checkbox"
									type="checkbox"
									checked={values.acceptedTerms}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, acceptedTerms: e.target.checked }));
										if (errors.acceptedTerms) setErrors((prev) => ({ ...prev, acceptedTerms: undefined }));
									}}
								/>
								<span>Aceptar los Terminos y Condiciones</span>
							</label>
							{errors.acceptedTerms ? (
								<p className="register-error">{errors.acceptedTerms}</p>
							) : null}

							<button className="register-submit" type="submit">Registrar</button>

							<p>Ya tienes cuenta? <strong className="login-link" onClick={() => navigate('/login')}>Inicia sesión</strong></p>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Register;
