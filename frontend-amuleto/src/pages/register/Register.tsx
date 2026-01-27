import { useState } from 'react';
import './Register.css';
import brandIcon from '../../assets/icons/icono-bello-amuleto.png';

const Register = () => {
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
								<label className="register-label" htmlFor="register-email">Correo</label>
								<input
									id="register-email"
									className="register-input"
									type="email"
									placeholder="Correo electrónico"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
							</div>

							<div className="register-field">
								<label className="register-label" htmlFor="register-password">Contraseña</label>
								<input
									id="register-password"
									className="register-input"
									type="password"
									placeholder="Contraseña"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="new-password"
								/>
							</div>

							<label className="register-terms">
								<input
									className="register-checkbox"
									type="checkbox"
									checked={acceptedTerms}
									onChange={(e) => setAcceptedTerms(e.target.checked)}
								/>
								<span>Aceptar los Terminos y Condiciones</span>
							</label>

							<button className="register-submit" type="submit">Registrar</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Register;
