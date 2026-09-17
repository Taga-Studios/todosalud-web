import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const ASSETS = {
  logo: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Cfit%3Dcrop%2Cq%3D95/RyI6fLOGiYFfhlfF/logo-todo-salud-blanco-saDHZ74gkwAPfYfQ.png',
  hero: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D1120%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/co.pnggdg-uOZM6XQjZW1UABbY.png',
  heroMobile: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D375%2Ch%3D511%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/co.pnggdg-uOZM6XQjZW1UABbY.png',
  products: 'https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D768%2Ch%3D1113%2Cfit%3Dcrop/RyI6fLOGiYFfhlfF/chatgpt-image-2-feb-2026-01_04_03-0wN6TwdUhU11qAdw.png',
  lab: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85',
  trust: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=85',
  service: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85',
};

const WHATSAPP_NUMBER = '584145642629';

const PRODUCTS = [
  { category: 'CURACIÓN', title: 'Gasas Estériles', description: 'Sobres de gasas estériles de algodón hidrófilo para limpieza y protección de heridas.', crop: 'gasa' },
  { category: 'INYECTABLES', title: 'Jeringas Desechables', description: 'Jeringas estériles de alta calidad y deslizamiento suave. Disponibles en varias medidas.', crop: 'jeringa' },
  { category: 'QUIRÚRGICO', title: 'Compresas Estériles', description: 'Compresas absorbentes de alta calidad, diseñadas para procedimientos quirúrgicos y control de fluidos.', crop: 'compresa' },
  { category: 'VENOCLISIS', title: 'Equipo Macro Gotero', description: 'Equipo de venoclisis normogotero estéril con cámara flexible y filtro de fluidos.', crop: 'macro' },
  { category: 'INYECTABLES', title: 'Jeringa 3cc Luer Lock', description: 'Jeringa descartable de 3cc con aguja 21G x 1 1/2. Conexión Luer Lock segura.', crop: 'jeringa-wide' },
  { category: 'QUIRÚRGICO', title: 'Compresa de Laparotomía', description: 'Compresa prelavada de gran absorción para procedimientos y atención hospitalaria.', crop: 'compresa-wide' },
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
            <div className="trust-badges"><span><b className="award-icon">✓</b>Certificación ISO</span><span><b className="shield-icon">✓</b>Garantía de Calidad</span></div>
          </div>
          <picture className="hero-image"><source media="(max-width: 640px)" srcSet={ASSETS.heroMobile} /><img src={ASSETS.hero} alt="Profesional de la salud con productos R&M Descartables" /></picture>
        </div>
      </section>

      <section className="featured section">
        <SectionTitle title="Productos" accent="Destacados" subtitle="Descubre nuestra selección de artículos médicos más solicitados" />
        <div className="product-grid featured-grid">{PRODUCTS.slice(0, 3).map((product) => <ProductCard key={product.title} product={product} />)}</div>
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
      <div className={`product-image product-image--${product.crop}`}><img src={ASSETS.products} alt={product.title} /></div>
      <div className="product-content"><span className="product-category">{product.category}</span><h3>{product.title}</h3><p>{product.description}</p><a href={getWhatsAppUrl(`Hola, quisiera cotizar: ${product.title}`)} target="_blank" rel="noreferrer">Cotizar</a></div>
    </article>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', location: '', message: '' });
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
        <div className="footer-brand"><img src={ASSETS.logo} alt="Todo Salud" /><p>Distribuidora líder de artículos médicos desechables con marca propia.</p><div className="socials"><span>f</span><span>◎</span></div></div>
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
