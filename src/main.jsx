import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const ASSETS = {
  logo: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Cfit%3Dcrop%2Cq%3D95/RyI6fLOGiYFfhlfF/logo-todo-salud-blanco-saDHZ74gkwAPfYfQ.png',
  hero: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D1120%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/co.pnggdg-uOZM6XQjZW1UABbY.png',
  iso: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D1113%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/chatgpt-image-2-feb-2026-01_04_03-0wN6TwdUhU11qAdw.png',
  quality: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D640%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/insurance-G9g4BwLR7sX5kHDe.png',
  product: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D640%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/1-FPQaHaTxMWzbOD2s.png',
  productsHero: 'https://images.unsplash.com/photo-1702788176231-04b19d9e3131?auto=format&fit=crop&w=1920',
  ana: 'https://images.unsplash.com/photo-1683349379021-7877469bcf71?auto=format&fit=crop&h=112&w=112',
  luis: 'https://images.unsplash.com/photo-1603823998094-ebcdbb5d9f18?auto=format&fit=crop&h=112&w=112',
};

const WHATSAPP_URL = 'https://wa.me/584145642629?text=Hola%2C+podrian+darme+m%C3%A1s+informaci%C3%B3n+de+sus+producto%3F';

function useRouter() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setPathname(path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return { pathname, navigate };
}

function App() {
  const { pathname, navigate } = useRouter();

  let page = <Home navigate={navigate} />;
  if (pathname.startsWith('/productos')) page = <Products />;
  if (pathname.startsWith('/contactanos')) page = <Contact />;

  return (
    <div className="site">
      <Header pathname={pathname} navigate={navigate} />
      <main>{page}</main>
    </div>
  );
}

function Header({ pathname, navigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo-button" type="button" onClick={() => go('/')} aria-label="Todo Salud, ir al inicio">
          <img src={ASSETS.logo} alt="Todo Salud c.a logo" />
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <button className={pathname === '/' ? 'active' : ''} onClick={() => go('/')}>Inicio</button>
          <button className={pathname.startsWith('/productos') ? 'active' : ''} onClick={() => go('/productos')}>Productos</button>
          <button className={pathname.startsWith('/contactanos') ? 'active' : ''} onClick={() => go('/contactanos')}>Contactanos</button>
        </nav>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Navegación móvil">
        <button onClick={() => go('/')}>Inicio</button>
        <button onClick={() => go('/productos')}>Productos</button>
        <button onClick={() => go('/contactanos')}>Contactanos</button>
      </nav>
    </header>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="hero-copy">
            <h1>Artículos Médicos de Alta Calidad</h1>
            <p>
              Distribuidora líder en artículos médicos desechables con marca propia. Confianza, calidad y servicio excepcional para profesionales de la salud.
            </p>
            <div className="hero-actions">
              <button className="button button-light" type="button" onClick={() => navigate('/productos')}>
                Ver Produtos
              </button>
              <a className="button button-ghost" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Contacto
              </a>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img src={ASSETS.hero} alt="" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="iso-section">
        <div className="iso-inner">
          <div className="section-heading">
            <h2>Certificación ISO</h2>
          </div>
          <div className="iso-image-wrap">
            <img src={ASSETS.iso} alt="" />
          </div>
        </div>
      </section>

      <section className="quality-section">
        <div className="quality-grid">
          <div className="quality-card quality-card-image">
            <img src={ASSETS.quality} alt="" />
          </div>
          <div className="quality-card quality-card-image">
            <img src={ASSETS.product} alt="" />
          </div>
        </div>
        <div className="quality-heading">
          <h2>Garantía de Calidad</h2>
        </div>
      </section>
    </>
  );
}

function Products() {
  return (
    <>
      <section className="products-hero" aria-label="Productos Todo Salud">
        <img src={ASSETS.productsHero} alt="Smiling female healthcare professional holding medical disposable gloves box." />
      </section>

      <section className="testimonials-section">
        <div className="testimonials-grid">
          <Testimonial
            quote="Productos confiables y entrega rápida, justo lo que necesitaba para mi clínica."
            name="Ana M."
            image={ASSETS.ana}
          />
          <Testimonial
            quote="Calidad excelente y precios accesibles, siempre vuelvo a comprar aquí."
            name="Luis R."
            image={ASSETS.luis}
          />
        </div>
      </section>
    </>
  );
}

function Testimonial({ quote, name, image }) {
  return (
    <article className="testimonial">
      <div className="stars" aria-label="5 estrellas">★★★★★</div>
      <p>{quote}</p>
      <div className="testimonial-author">
        <img src={image} alt="" />
        <strong>{name}</strong>
      </div>
    </article>
  );
}

function Contact() {
  return (
    <section className="contact-page">
      <div className="contact-card">
        <h3>Ubicación</h3>
        <p className="contact-description">Encuentra nuestra oficina central para atención y despacho rápido de tus pedidos.</p>

        <div className="contact-block">
          <h6>Dirección</h6>
          <p>P/B, EDIF. Madeira, Carrera 16, esquina de la C. 38, Barquisimeto 3001, Lara, Venezuela</p>
        </div>

        <div className="contact-block">
          <h6>Horario</h6>
          <p>Lun a Vie 9:00am/ 6:00pm</p>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
