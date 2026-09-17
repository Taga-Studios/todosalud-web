import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const ASSETS = {
  logo: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Cfit%3Dcrop%2Cq%3D95/RyI6fLOGiYFfhlfF/logo-todo-salud-blanco-saDHZ74gkwAPfYfQ.png',
  hero: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D1120%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/co.pnggdg-uOZM6XQjZW1UABbY.png',
  certification: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D1113%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/chatgpt-image-2-feb-2026-01_04_03-0wN6TwdUhU11qAdw.png',
  quality: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D640%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/insurance-G9g4BwLR7sX5kHDe.png',
  productAccent: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D640%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/1-FPQaHaTxMWzbOD2s.png',
  productsHero: 'https://images.unsplash.com/photo-1702788176231-04b19d9e3131?auto=format&fit=crop&w=1920&q=86',
  testimonialOne: 'https://images.unsplash.com/photo-1683349379021-7877469bcf71?auto=format&fit=crop&w=128&q=85',
  testimonialTwo: 'https://images.unsplash.com/photo-1603823998094-ebcdbb5d9f18?auto=format&fit=crop&w=128&q=85',
};

const WHATSAPP_URL = 'https://wa.me/';

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path) => {
    if (path === window.location.pathname) return;
    window.history.pushState({}, '', path);
    setPathname(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [pathname, navigate];
}

function App() {
  const [pathname, navigate] = usePathname();

  let page = <Home navigate={navigate} />;
  if (pathname.startsWith('/productos')) page = <Products navigate={navigate} />;
  if (pathname.startsWith('/contactanos')) page = <Contact />;

  return (
    <div className="site-shell">
      <Header pathname={pathname} navigate={navigate} />
      <main>{page}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ pathname, navigate }) {
  const [open, setOpen] = useState(false);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="topbar">
      <div className="nav-wrap">
        <button className="brand" type="button" onClick={() => go('/')} aria-label="Ir al inicio">
          <img src={ASSETS.logo} alt="Todo Salud c.a" />
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <NavButton active={pathname === '/'} onClick={() => go('/')}>Inicio</NavButton>
          <NavButton active={pathname.startsWith('/productos')} onClick={() => go('/productos')}>Productos</NavButton>
          <NavButton active={pathname.startsWith('/contactanos')} onClick={() => go('/contactanos')}>Contáctanos</NavButton>
        </nav>

        <button
          type="button"
          className={`menu-button ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-panel ${open ? 'is-open' : ''}`}>
        <button onClick={() => go('/')}>Inicio</button>
        <button onClick={() => go('/productos')}>Productos</button>
        <button onClick={() => go('/contactanos')}>Contáctanos</button>
      </div>
    </header>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button type="button" className={active ? 'active' : ''} onClick={onClick}>
      {children}
    </button>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero section-dark">
        <div className="hero-copy reveal-copy">
          <span className="eyebrow">Todo Salud C.A.</span>
          <h1>Artículos Médicos de Alta Calidad</h1>
          <p>
            Soluciones confiables en productos médicos desechables para clínicas,
            profesionales y distribuidores del sector salud.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={() => navigate('/productos')}>
              Ver productos
            </button>
            <a className="btn btn-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Contacto
            </a>
          </div>
        </div>
        <div className="hero-media image-frame image-frame-tall">
          <img src={ASSETS.hero} alt="Productos médicos Todo Salud" />
        </div>
      </section>

      <section className="split-section section-light">
        <div className="split-media image-frame">
          <img src={ASSETS.certification} alt="Control y certificación de calidad" />
        </div>
        <div className="split-copy">
          <span className="eyebrow eyebrow-dark">Calidad controlada</span>
          <h2>Certificación ISO</h2>
          <p>
            Trabajamos con procesos enfocados en consistencia, seguridad y confianza para acompañar el trabajo diario del sector médico.
          </p>
          <div className="feature-row">
            <Feature icon="✓" title="Estándares" text="Procesos orientados a calidad y trazabilidad." />
            <Feature icon="+" title="Sector salud" text="Atención especializada para necesidades médicas." />
          </div>
        </div>
      </section>

      <section className="split-section split-reverse section-mist">
        <div className="split-copy">
          <span className="eyebrow eyebrow-dark">Respaldo Todo Salud</span>
          <h2>Garantía de Calidad</h2>
          <p>
            Seleccionamos productos pensados para ofrecer una experiencia confiable, práctica y consistente desde el pedido hasta la entrega.
          </p>
          <button className="text-link" type="button" onClick={() => navigate('/contactanos')}>
            Hablar con nuestro equipo <span>→</span>
          </button>
        </div>
        <div className="split-media image-frame">
          <img src={ASSETS.quality} alt="Garantía y respaldo Todo Salud" />
        </div>
      </section>

      <section className="cta-strip">
        <div>
          <span className="eyebrow">Atención comercial</span>
          <h2>¿Necesitas abastecer tu clínica o negocio?</h2>
        </div>
        <button className="btn btn-white" type="button" onClick={() => navigate('/contactanos')}>
          Contáctanos
        </button>
      </section>
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">
      <span className="feature-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Products({ navigate }) {
  const categories = [
    ['Protección', 'Insumos para apoyar protocolos de seguridad e higiene.'],
    ['Desechables', 'Productos prácticos para uso clínico y atención diaria.'],
    ['Consumibles', 'Opciones para consultorios, centros médicos y distribuidores.'],
  ];

  return (
    <>
      <section className="page-hero products-page-hero">
        <img src={ASSETS.productsHero} alt="Profesional de salud con suministros médicos" />
        <div className="page-hero-overlay" />
        <div className="page-hero-copy">
          <span className="eyebrow">Catálogo Todo Salud</span>
          <h1>Productos médicos para el trabajo de todos los días</h1>
          <p>Calidad, disponibilidad y atención comercial cercana.</p>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading centered">
          <span className="eyebrow eyebrow-dark">Nuestras líneas</span>
          <h2>Soluciones para profesionales de la salud</h2>
          <p>Una selección organizada para facilitar compras recurrentes y abastecimiento.</p>
        </div>

        <div className="category-grid">
          {categories.map(([title, text], index) => (
            <article className="category-card" key={title}>
              <div className={`category-art category-art-${index + 1}`}>
                {index === 1 && <img src={ASSETS.productAccent} alt="Suministro médico" />}
                {index !== 1 && <span>{index === 0 ? '+' : '✓'}</span>}
              </div>
              <div className="category-body">
                <span className="card-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials section-mist">
        <div className="section-heading centered">
          <span className="eyebrow eyebrow-dark">Experiencias</span>
          <h2>Confianza que se construye pedido a pedido</h2>
        </div>
        <div className="testimonial-grid">
          <Testimonial
            image={ASSETS.testimonialOne}
            quote="La atención es rápida y el proceso de compra resulta sencillo para nuestra operación."
            name="Cliente Todo Salud"
          />
          <Testimonial
            image={ASSETS.testimonialTwo}
            quote="Buena disponibilidad y acompañamiento cuando necesitamos reponer insumos."
            name="Cliente recurrente"
          />
        </div>
      </section>

      <section className="product-bottom-cta">
        <h2>¿Buscas un producto específico?</h2>
        <p>Cuéntanos qué necesitas y te ayudamos a revisar disponibilidad.</p>
        <button className="btn btn-primary" type="button" onClick={() => navigate('/contactanos')}>
          Consultar
        </button>
      </section>
    </>
  );
}

function Testimonial({ image, quote, name }) {
  return (
    <article className="testimonial-card">
      <div className="stars" aria-label="5 estrellas">★★★★★</div>
      <p>“{quote}”</p>
      <div className="testimonial-author">
        <img src={image} alt="" />
        <span>{name}</span>
      </div>
    </article>
  );
}

function Contact() {
  return (
    <section className="contact-page">
      <div className="contact-intro">
        <span className="eyebrow eyebrow-dark">Todo Salud C.A.</span>
        <h1>Contáctanos</h1>
        <p>
          Estamos disponibles para ayudarte con pedidos, disponibilidad y atención comercial.
        </p>
      </div>

      <div className="contact-grid">
        <article className="contact-card featured-contact">
          <span className="contact-icon">⌖</span>
          <h2>Ubicación</h2>
          <p>Encuentra nuestra oficina central para atención y despacho de pedidos.</p>
          <div className="contact-detail">
            <strong>Dirección</strong>
            <span>P/B, EDIF. Madeira, Carrera 16, esquina de la C. 38, Barquisimeto 3001, Lara, Venezuela</span>
          </div>
          <div className="contact-detail">
            <strong>Horario</strong>
            <span>Lun a Vie · 9:00 am a 6:00 pm</span>
          </div>
        </article>

        <article className="contact-card contact-action-card">
          <span className="contact-icon">✦</span>
          <h2>Atención comercial</h2>
          <p>Consulta productos y disponibilidad directamente con nuestro equipo.</p>
          <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Abrir WhatsApp
          </a>
        </article>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={ASSETS.logo} alt="Todo Salud c.a" />
        <p>Productos médicos confiables y atención para el sector salud.</p>
      </div>
      <div className="footer-links">
        <button type="button" onClick={() => navigate('/')}>Inicio</button>
        <button type="button" onClick={() => navigate('/productos')}>Productos</button>
        <button type="button" onClick={() => navigate('/contactanos')}>Contáctanos</button>
      </div>
      <span className="copyright">© {new Date().getFullYear()} Todo Salud C.A.</span>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
