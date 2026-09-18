import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const ASSETS = {
  logo: '/assets/logo-todo-salud.png',
  hero: '/assets/productos-rm.jpg',
  heroMobile: '/assets/productos-rm.jpg',
  qualityIcon: '/assets/calidad-cumplimiento.png',
  serviceIcon: '/assets/atencion-personalizada.png',
  lab: '/assets/valor-calidad.png',
  trust: '/assets/valor-transparencia.png',
  service: '/assets/valor-atencion.png',
};

const WHATSAPP_NUMBER = '584145642629';

const FEATURED_PRODUCTS = [
  { category: 'CURACIÓN', title: 'Gasas Estériles', description: 'Sobres de gasas estériles de algodón hidrófilo para limpieza y protección de heridas.', image: '/assets/gasas-esteriles.png', crop: 'gasa' },
  { category: 'INYECTABLES', title: 'Jeringas Desechables', description: 'Jeringas estériles de alta calidad y deslizamiento suave. Disponibles en varias medidas (3cc, 5cc, 10cc, 20cc).', image: '/assets/jeringas-desechables.png', crop: 'jeringa' },
  { category: 'QUIRÚRGICO', title: 'Compresas Estériles', description: 'Compresas absorbentes de alta calidad, diseñadas para procedimientos quirúrgicos y control de fluidos.', image: '/assets/compresas-esteriles.png', crop: 'compresa' },
];

const PRODUCTS = [
  FEATURED_PRODUCTS[2],
  { category: 'VENOCLISIS', title: 'Equipo Macro Gotero', description: 'Equipo de venoclisis normogotero estéril con cámara flexible y filtro de fluidos.', image: '/assets/equipo-macrogotero.png', crop: 'macro' },
  { category: 'INYECTABLES', title: 'Jeringa 3cc Luer Lock', description: 'Jeringa descartable de 3cc con aguja 21G x 1 1/2. Conexión Luer Lock segura.', image: '/assets/jeringa-3cc.png', crop: 'jeringa-3cc' },
  { category: 'INYECTABLES', title: 'Jeringa 20cc', description: 'Jeringa de gran capacidad (20ml) para administración de medicamentos o alimentación.', image: '/assets/jeringa-20cc.png', crop: 'jeringa-20cc' },
  { category: 'INYECTABLES', title: 'Jeringa 5cc', description: 'Jeringa estándar de 5ml. Versatilidad para inyecciones intramusculares o intravenosas.', image: '/assets/jeringas-desechables.png', crop: 'jeringa' },
  FEATURED_PRODUCTS[0],
];

function useRouter() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
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
  useEffect(() => {
    document.title = pathname.startsWith('/contactanos')
      ? 'Contacto Todo Salud C.A - Productos Médicos | Todo Salud c.a'
      : 'Todo Salud C.A: Productos Médicos Confiables | Todo Salud c.a';
  }, [pathname]);
  let page = <Home navigate={navigate} />;
  if (pathname.startsWith('/productos')) page = <Products />;
  if (pathname.startsWith('/contactanos')) page = <Contact />;
  return (
    <div className="site">
      <Header pathname={pathname} navigate={navigate} />
      <main>{page}</main>
      <Footer navigate={navigate} />
      <a className="whatsapp-float" href={getWhatsAppUrl('Hola, podrían darme más información de sus productos?')} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><span>☏</span></a>
    </div>
  );
}

function Header({ pathname, navigate }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const go = (path) => { navigate(path); setOpen(false); };
  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo-button" type="button" onClick={() => go('/')} aria-label="Todo Salud, ir al inicio"><img src={ASSETS.logo} alt="Todo Salud c.a logo" /></button>
        <div className="header-actions">
          <nav className="desktop-nav" aria-label="Navegación principal">
            <button className={pathname === '/' ? 'active' : ''} onClick={() => go('/')}>Inicio</button>
            <button className={pathname.startsWith('/productos') ? 'active' : ''} onClick={() => go('/productos')}>Productos</button>
            <button className={pathname.startsWith('/contactanos') ? 'active' : ''} onClick={() => go('/contactanos')}>Contactanos</button>
          </nav>
          <button className="bag" type="button" aria-label="Carrito de compras"><span /></button>
          <button className={`hamburger ${open ? 'open' : ''}`} type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
        </div>
      </div>
      <nav className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Navegación móvil">
        <button className={pathname === '/' ? 'active' : ''} onClick={() => go('/')}>Inicio</button>
        <button className={pathname.startsWith('/productos') ? 'active' : ''} onClick={() => go('/productos')}>Productos</button>
        <button className={pathname.startsWith('/contactanos') ? 'active' : ''} onClick={() => go('/contactanos')}>Contactanos</button>
      </nav>
    </header>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Artículos Médicos<br />de <span>Alta Calidad</span></h1>
            <p>Distribuidora líder en artículos médicos desechables con marca propia. Confianza, calidad y servicio excepcional para profesionales de la salud.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" type="button" onClick={() => navigate('/productos')}>Ver Produtos</button>
              <a className="btn btn-outline" href={getWhatsAppUrl('Hola, podrían darme más información de sus productos?')} target="_blank" rel="noreferrer">Contacto</a>
            </div>
            <div className="trust-badges"><span><img src={ASSETS.serviceIcon} alt="" />Certificación ISO</span><span><img src={ASSETS.qualityIcon} alt="" />Garantía de Calidad</span></div>
          </div>
          <svg className="hero-image" viewBox="0 0 200 200" preserveAspectRatio="none" role="img" aria-label="Profesional de la salud con productos R&M Descartables">
            <defs><clipPath id="hero-blob"><path d="M1.97387 169.13C-5.79459 148.805 11.296 120.102 19.8413 98.9532C28.542 77.8041 28.3866 64.2082 36.1551 46.2178C43.7682 28.09 59.1497 5.56755 79.8138 0.898269C100.323 -3.63368 126.269 9.55016 150.662 27.678C175.21 45.6684 198.205 68.6028 199.914 92.9106C201.468 117.218 181.736 142.899 157.343 163.224C132.795 183.55 103.741 198.381 72.8222 199.892C42.0591 201.265 9.58696 189.455 1.97387 169.13Z" /></clipPath></defs>
            <image href={ASSETS.hero} width="200" height="200" preserveAspectRatio="none" clipPath="url(#hero-blob)" />
            <path className="hero-shape-border" d="M1.97387 169.13C-5.79459 148.805 11.296 120.102 19.8413 98.9532C28.542 77.8041 28.3866 64.2082 36.1551 46.2178C43.7682 28.09 59.1497 5.56755 79.8138 0.898269C100.323 -3.63368 126.269 9.55016 150.662 27.678C175.21 45.6684 198.205 68.6028 199.914 92.9106C201.468 117.218 181.736 142.899 157.343 163.224C132.795 183.55 103.741 198.381 72.8222 199.892C42.0591 201.265 9.58696 189.455 1.97387 169.13Z" />
          </svg>
        </div>
      </section>

      <section className="featured section">
        <SectionTitle title="Productos" accent="Destacados" subtitle="Descubre nuestra selección de artículos médicos más solicitados" />
        <div className="product-grid featured-grid">{FEATURED_PRODUCTS.map((product) => <ProductCard key={product.title} product={product} />)}</div>
      </section>

      <section className="about-section">
        <div className="section about-inner">
          <SectionTitle title="Comprometidos con La Salud y La Calidad" subtitle="En Todo Salud, trabajamos cada día para ofrecer soluciones seguras y accesibles al sector salud. Nuestros productos están diseñados para cumplir con los más altos estándares de higiene y protección, brindando tranquilidad y confianza en cada uso." />
          <article className="history-card">
            <h3>Nuestra Historia</h3>
            <p>Somos una empresa <strong>Venezolana</strong> dedicada a la <strong>Fabricación y Distribución de Productos Descartables</strong> bajo la marca <strong>R&amp;M Descartables.</strong></p>
            <p>Atendemos las necesidades de hospitales, clínicas, laboratorios, consultorios y empresas en todo el país, garantizando <strong>confianza, cumplimiento y atención personalizada.</strong></p>
          </article>
          <div className="mission-grid">
            <article><h3>MISIÓN</h3><p>Ofrecer productos descartables confiables y duraderos que aseguren la higiene y protección de nuestros clientes.</p></article>
            <article><h3>VISIÓN</h3><p>Ser una empresa líder en el mercado de insumos descartables, reconocida por su compromiso con la salud, la calidad y la atención cercana.</p></article>
          </div>
          <SectionTitle title="Nuestros Valores" subtitle="Los principios que guían nuestro compromiso con la salud" compact />
          <div className="values-grid">
            <ValueCard image={ASSETS.lab} title="Calidad y Cumplimiento">Garantizamos productos que cumplen con los más altos estándares de calidad e higiene del sector salud.</ValueCard>
            <ValueCard image={ASSETS.trust} title="Responsabilidad y Transparencia">Actuamos con integridad en cada proceso, manteniendo comunicación clara y honesta con nuestros clientes.</ValueCard>
            <ValueCard image={ASSETS.service} title="Atención Personalizada">Cada cliente es único. Ofrecemos un servicio cercano y adaptado a sus necesidades específicas.</ValueCard>
          </div>
        </div>
      </section>
    </>
  );
}

function Products() {
  return <section className="catalog section"><SectionTitle title="Catálogo de" accent="Productos" subtitle="Calidad y confianza en cada insumo médico." /><div className="product-grid catalog-grid">{PRODUCTS.map((product) => <ProductCard key={product.title} product={product} />)}</div></section>;
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className={`product-image product-image--${product.crop}`}><img src={product.image} alt={product.title} /></div>
      <div className="product-content"><span className="product-category">{product.category}</span><h3>{product.title}</h3><p>{product.description}</p><a href={getWhatsAppUrl(`Hola quiero más información del producto ${product.title}`)} target="_blank" rel="noreferrer">Cotizar</a></div>
    </article>
  );
}

function Contact() {
  const requestedProduct = new URLSearchParams(window.location.search).get('producto');
  const [form, setForm] = useState({ name: '', location: '', message: requestedProduct ? `Quisiera cotizar: ${requestedProduct}` : '' });
  const submit = (event) => {
    event.preventDefault();
    const text = `Hola, soy ${form.name || 'un cliente'} desde ${form.location || 'Venezuela'}. ${form.message || 'Quisiera información sobre sus productos.'}`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };
  return (
    <section className="contact-page">
      <div className="contact-shell">
        <aside className="contact-intro"><span className="contact-orb contact-orb-top" /><span className="contact-orb contact-orb-bottom" /><div><h1>Hablemos</h1><p>Estamos aquí para ayudarte con tus necesidades de productos descartables médicos.</p><p>Escríbenos y recibirás atención personalizada de inmediato.</p></div></aside>
        <form className="contact-form" onSubmit={submit}>
          <label>Nombre completo<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre aquí" /></label>
          <label>Desde dónde nos escribes<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Ciudad, Estado" /></label>
          <label>Mensaje<textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="¿En qué productos estás interesado?" /></label>
          <button type="submit">Enviar a WhatsApp <span>●●</span></button>
        </form>
      </div>
      <div className="location section"><h2>Ubicación</h2><p>Encuentra nuestra oficina central para atención y despacho rápido de tus pedidos.</p><div className="location-grid"><article><span>Dirección</span><p>P/B, EDIF. Madeira, Carrera 16, esquina de la C. 38, Barquisimeto 3001, Lara, Venezuela</p></article><article><span>Horario</span><p>Lun a Vie 9:00am / 6:00pm</p></article></div></div>
    </section>
  );
}

function SectionTitle({ title, accent, subtitle, compact = false }) {
  return <header className={`section-title ${compact ? 'compact' : ''}`}><h2>{title}{accent && <> <span>{accent}</span></>}</h2>{subtitle && <p>{subtitle}</p>}</header>;
}

function ValueCard({ image, title, children }) {
  return <article className="value-card"><img src={image} alt="" /><div><h3>{title}</h3><p>{children}</p></div></article>;
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-grid section">
        <div className="footer-brand"><img src={ASSETS.logo} alt="Todo Salud" /><p>Distribuidora líder de artículos médicos desechables con marca propia.</p><div className="socials"><a href="https://www.facebook.com/todosalud.bqto" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a href="https://www.instagram.com/todosalud_bqto/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a></div></div>
        <div><h4>ENLACES RÁPIDOS</h4><button onClick={() => navigate('/')}>Inicio</button><button onClick={() => navigate('/productos')}>Productos</button><button onClick={() => navigate('/')}>Nosotros</button><button onClick={() => navigate('/contactanos')}>Contacto</button></div>
        <div><h4>CATEGORÍAS</h4><p>Artículos desechables</p><p>Marca Propia</p><p>Protección personal</p><p>Médico Instrumental</p></div>
        <div><h4>CONTACTO</h4><a href="tel:+584145642629">+58 414-5642629</a></div>
      </div>
      <div className="copyright">© 2026 TodoSalud C.A. Todos los derechos reservados.</div>
    </footer>
  );
}

function getWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
