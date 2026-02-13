import { useState } from 'react';
import './Register.css';
import brandIcon from '../../assets/icons/icono-bello-amuleto.png';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '../../validations/auth/registerValidation';
import type { RegisterFormErrors, RegisterFormValues } from '../../validations/auth/registerValidation';
import { register } from '../../services/auth';

const Register = () => {
	const [values, setValues] = useState<RegisterFormValues>({
		name: '',
		email: '',
		telefono: '',
		direccion: '',
		password: '',
		confirmPassword: '',
		acceptedTerms: false,
	});
	const [errors, setErrors] = useState<RegisterFormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);
		const nextErrors = validateRegisterForm(values);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		const payload = {
			nombre: values.name.trim(),
			email: values.email.trim(),
			password: values.password,
			...(values.telefono?.trim() ? { telefono: values.telefono.trim() } : {}),
			...(values.direccion?.trim() ? { direccion: values.direccion.trim() } : {}),
		};

		console.debug('[register] payload', payload);

		try {
			setIsSubmitting(true);
			await register(payload);
			navigate('/login');
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Error al registrar';
			setSubmitError(message);
		} finally {
			setIsSubmitting(false);
		}
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
										if (submitError) setSubmitError(null);
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
										if (submitError) setSubmitError(null);
									}}
									autoComplete="email"
								/>
								{errors.email ? <p className="register-error">{errors.email}</p> : null}
							</div>

							<div className="register-field">
								<label className="register-label" htmlFor="register-phone">Teléfono (opcional)</label>
								<input
									id="register-phone"
									className={`register-input${errors.telefono ? ' register-input-error' : ''}`}
									type="tel"
									placeholder="Teléfono"
									value={values.telefono ?? ''}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, telefono: e.target.value }));
										if (errors.telefono) setErrors((prev) => ({ ...prev, telefono: undefined }));
										if (submitError) setSubmitError(null);
									}}
									autoComplete="tel"
								/>
								{errors.telefono ? <p className="register-error">{errors.telefono}</p> : null}
							</div>

							<div className="register-field">
								<label className="register-label" htmlFor="register-address">Dirección (opcional)</label>
								<input
									id="register-address"
									className={`register-input${errors.direccion ? ' register-input-error' : ''}`}
									type="text"
									placeholder="Dirección"
									value={values.direccion ?? ''}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, direccion: e.target.value }));
										if (errors.direccion) setErrors((prev) => ({ ...prev, direccion: undefined }));
										if (submitError) setSubmitError(null);
									}}
									autoComplete="street-address"
								/>
								{errors.direccion ? <p className="register-error">{errors.direccion}</p> : null}
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
										if (submitError) setSubmitError(null);
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
										if (submitError) setSubmitError(null);
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
										if (submitError) setSubmitError(null);
									}}
								/>
								<span>Aceptar los Terminos y Condiciones</span>
							</label>
							{errors.acceptedTerms ? (
								<p className="register-error">{errors.acceptedTerms}</p>
							) : null}

							{submitError ? <p className="register-submit-error">{submitError}</p> : null}

							<button className="register-submit" type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Registrando...' : 'Registrar'}
							</button>

							<p>Ya tienes cuenta? <strong className="login-link" onClick={() => navigate('/login')}>Inicia sesión</strong></p>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Register;
