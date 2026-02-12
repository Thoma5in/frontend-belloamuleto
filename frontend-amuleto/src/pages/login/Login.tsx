import { useState } from 'react';
import './Login.css';
import brandIcon from '../../assets/icons/icono-bello-amuleto.png';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../validations/auth/loginValidation';
import type { LoginFormErrors, LoginFormValues } from '../../validations/auth/loginValidation';

const Login = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
	const [errors, setErrors] = useState<LoginFormErrors>({});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const nextErrors = validateLoginForm(values);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		// UI-only screen (no backend yet)
		void values;
	};

	return (
		<div className="login-page">
			<div className="login-brand" aria-label="Bello Amuleto">
				<span className="login-brand-text">Bello</span>
				<img className="login-brand-icon" src={brandIcon} alt="" aria-hidden="true" />
				<span className="login-brand-text">Amuleto</span>
			</div>

			<main className="login-main">
				<section className="login-card" aria-labelledby="login-title">
					<div className="login-card-inner">
						<h1 id="login-title" className="login-title">Iniciar Sesión</h1>

						<form className="login-form" onSubmit={onSubmit}>
							<div className="login-field">
								<label className="login-label" htmlFor="login-email">Correo</label>
								<input
									id="login-email"
									className={`login-input${errors.email ? ' login-input-error' : ''}`}
									type="email"
									placeholder="Correo electrónico"
									value={values.email}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, email: e.target.value }));
										if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
									}}
									autoComplete="email"
								/>
								{errors.email ? <p className="login-error">{errors.email}</p> : null}
							</div>

							<div className="login-field">
								<label className="login-label" htmlFor="login-password">Contraseña</label>
								<input
									id="login-password"
									className={`login-input${errors.password ? ' login-input-error' : ''}`}
									type="password"
									placeholder="Contraseña"
									value={values.password}
									onChange={(e) => {
										setValues((prev) => ({ ...prev, password: e.target.value }));
										if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
									}}
									autoComplete="current-password"
								/>
								{errors.password ? <p className="login-error">{errors.password}</p> : null}
							</div>

							<button className="login-submit" type="submit">Iniciar Sesión</button>
							<p>¿No tienes cuenta? <strong className="register-link" onClick={() => navigate('/register')}>Registrate</strong></p>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Login;
