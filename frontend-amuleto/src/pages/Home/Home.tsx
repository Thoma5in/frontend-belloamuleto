import React from 'react';
import './Home.css';
import { CreditCard, Zap, ShieldCheck, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bello Amuleto</h1>
          <p className="subtitle">Accesorios que cuentan tu historia</p>
          <p className="description">Piezas delicadas, elegantes y hechas para resaltar tu esencia.</p>
        </div>
      </section>

      {/* Explora Section */}
      <section className="section-container">
        <h2 className="section-title">Explora</h2>
        <div className="categories-grid">
          {[
            { name: 'Dualls', img: 'https://placehold.co/400x400?text=Dualls' }, // Aquí se coloca la imagen
            { name: 'Cadenas', img: 'https://placehold.co/400x400?text=Cadenas' }, // Aquí se coloca la imagen
            { name: 'Aretes', img: 'https://placehold.co/400x400?text=Aretes' } // Aquí se coloca la imagen
          ].map((cat, i) => (
            <div key={i} className="category-card">
              <div className="category-image">
                <img src={cat.img} alt={cat.name} />
                {i === 0 && <button className="nav-arrow left" aria-label="Previous"><ChevronLeft size={24} /></button>}
                {i === 2 && <button className="nav-arrow right" aria-label="Next"><ChevronRight size={24} /></button>}
              </div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nuestras Lineas */}
      <section className="section-container lines-section">
        <h2 className="section-title">Nuestras Lineas</h2>

        <div className="line-item">
          <div className="line-info">
            <h3>Linea Delicados</h3>
            <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos para diseños para probar el arte visual antes de insertar el texto final.</p>
          </div>
          <div className="line-image">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/800x600?text=Linea+Delicados" alt="Linea Delicados" />
          </div>
        </div>

        <div className="line-item reverse">
          <div className="line-info">
            <h3>Linea MaxiCollar</h3>
            <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos para diseños para probar el arte visual antes de insertar el texto final.</p>
          </div>
          <div className="line-image">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/800x600?text=Linea+MaxiCollar" alt="Linea MaxiCollar" />
          </div>
        </div>
      </section>

      {/* Novedades */}
      <section className="section-container">
        <h2 className="section-title">Novedades</h2>
        <div className="novedades-banner">
          <div className="novedades-image">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/800x600?text=Novedades" alt="Edición Limitada" />
          </div>
          <div className="novedades-content">
            <h3>Edición Limitada</h3>
            <span className="title">Cadenas con letra</span>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="section-container">
        <h2 className="section-title">Galería de Fotos</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/600x400?text=Galeria+1" alt="Gallery 1" />
          </div>
          <div className="gallery-item">
            <div className="placeholder-image">Próximamente:<br />Nuevos Diseños</div>
          </div>
          <div className="gallery-item">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/600x400?text=Galeria+3" alt="Gallery 3" />
          </div>
          <div className="gallery-item">
            <div className="placeholder-image">Placeholder:<br />Foto de Cliente</div>
          </div>
          <div className="gallery-item">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/600x400?text=Galeria+5" alt="Gallery 5" />
          </div>
          <div className="gallery-item">
            <div className="placeholder-image">Bello Amuleto<br />En proceso...</div>
          </div>
          <div className="gallery-item">
            {/* Aquí se coloca la imagen */}
            <img src="https://placehold.co/600x400?text=Galeria+7" alt="Gallery 7" />
          </div>
        </div>
      </section>

      {/* Te ofrecemos */}
      <section className="section-container">
        <h2 className="section-title">Te ofrecemos</h2>
        <div className="features-grid">
          <div className="feature-item">
            <CreditCard className="feature-icon" size={48} />
            <h4>Pagos en Línea</h4>
            <p>O recoge en tienda de forma segura.</p>
          </div>
          <div className="feature-item">
            <Zap className="feature-icon" size={48} />
            <h4>Diseños Únicos</h4>
            <p>Joyas que cuentan historias únicas.</p>
          </div>
          <div className="feature-item">
            <ShieldCheck className="feature-icon" size={48} />
            <h4>Garantía</h4>
            <p>Calidad asegurada en cada pieza.</p>
          </div>
          <div className="feature-item">
            <Globe className="feature-icon" size={48} />
            <h4>Hecho en Colombia</h4>
            <p>Producto con sello nacional.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;