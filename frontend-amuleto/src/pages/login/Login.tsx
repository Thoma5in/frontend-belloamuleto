import { useState } from 'react';
import './Login.css';
import brandIcon from '../../assets/icons/icono-bello-amuleto.png';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// UI-only screen (no backend yet)
		void email;
		void password;
		void acceptedTerms;
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
									className="login-input"
									type="email"
									placeholder="Correo electrónico"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
							</div>

							<div className="login-field">
								<label className="login-label" htmlFor="login-password">Contraseña</label>
								<input
									id="login-password"
									className="login-input"
									type="password"
									placeholder="Contraseña"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="new-password"
								/>
							</div>

							<label className="login-terms">
								<input
									className="login-checkbox"
									type="checkbox"
									checked={acceptedTerms}
									onChange={(e) => setAcceptedTerms(e.target.checked)}
								/>
								<span>Aceptar los Terminos y Condiciones</span>
							</label>

							<button className="login-submit" type="submit">Iniciar Sesión</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Login;
