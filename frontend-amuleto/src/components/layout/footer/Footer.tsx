import './Footer.css';
import { Instagram, Youtube } from 'lucide-react';
import logo from '../../../assets/icons/icono-bello-amuleto.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo and Socials Column */}
                <div className="footer-column brand-column">
                    <div className="footer-logo">
                        {/* Placeholder for the logo shown in the image */}
                        <div className="logo-placeholder">
                            <img src={logo} alt="Logo" className="footer-logo" />
                        </div>
                    </div>
                    <div className="social-icons">
                        <a href="#" aria-label="X (Twitter)" className="social-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4l11.733 16h4.267l-11.733 -16z" stroke="none" fill="currentColor" />
                                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="social-icon">
                            <Instagram size={20} />
                        </a>
                        <a href="#" aria-label="YouTube" className="social-icon">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                {/* Contact Column */}
                <div className="footer-column">
                    <h3>Contactános</h3>
                    <div className="footer-links">
                        <p>Bello Amuleto S.A.S</p>
                        <p>NIT: 123456789</p>
                        <p>Dirección: Calle cualquiera</p>
                        <p>Correo: bello@correo.com</p>
                        <p>Telefono: 123 4567891</p>
                    </div>
                </div>

                {/* Support Column */}
                <div className="footer-column">
                    <h3>Soporte</h3>
                    <ul className="footer-links">
                        <li><a href="#">Preguntas comunes</a></li>
                        <li><a href="#">Tratamiento de Datos</a></li>
                        <li><a href="#">Terminos y Condiciones</a></li>
                        <li><a href="#">Política de envíos</a></li>
                        <li><a href="#">Cambios y Devoluciones</a></li>
                    </ul>
                </div>

                {/* About Us Column */}
                <div className="footer-column">
                    <h3>Sobre Nosotros</h3>
                    <ul className="footer-links">
                        <li><a href="#">Quiénes Somos?</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Trabaja con Nosotros</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
