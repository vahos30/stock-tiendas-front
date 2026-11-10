import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio | Nexo Stock",
  description: "Administra productos e inventario desde un solo lugar.",
};

function BrandMark() {
  return (
    <span className="portal-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 23V9l18 14V9" />
        <path d="M4 26h24" />
      </svg>
    </span>
  );
}

export default function Inicio() {
  return (
    <main className="portal-page">
      <div className="portal-container">
        <header className="portal-header">
          <a className="portal-brand" href="/inicio" aria-label="Nexo Stock, inicio">
            <BrandMark />
            <span>nexo<span>stock</span></span>
          </a>
          <div className="portal-header-right">
            <span className="portal-header-caption">PORTAL DE INVENTARIO</span>
            <span className="portal-header-divider" />
            <span className="portal-company">
              <span className="company-mark" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M3 8h14v9H3zM2 8l2-5h12l2 5M7 17v-5h6v5M6 6h.01M10 6h.01M14 6h.01" />
                </svg>
              </span>
              <span>Multi-inventario</span>
            </span>
          </div>
        </header>

        <section className="portal-hero" aria-labelledby="portal-title">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-copy">
            <div className="portal-eyebrow"><span /> TU CENTRO DE OPERACIONES</div>
            <h1 id="portal-title">El inventario,<br /><span>bajo control.</span></h1>
            <p>Administra productos, consulta existencias y organiza tus catálogos desde un solo lugar.</p>
            <div className="hero-meta">
              <span className="hero-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none"><path d="M3 5.5h14v11H3zM6 3.5v4M14 3.5v4M3 9h14" /></svg>
              </span>
              <span>Gestión centralizada</span>
              <span className="hero-meta-separator">·</span>
              <span>Múltiples tiendas</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-glow" />
            <div className="hero-art-ring ring-back" />
            <div className="hero-art-ring ring-front" />
            <div className="hero-cube">
              <svg viewBox="0 0 150 150" fill="none">
                <path d="m75 24 48 27v53l-48 27-48-27V51l48-27Z" />
                <path d="m27 51 48 28 48-28M75 79v52M51 38l48 28v21" />
                <path d="m43 63 17 10v19L43 82V63Z" />
              </svg>
            </div>
            <span className="art-spark spark-one">✳</span>
            <span className="art-spark spark-two">✦</span>
            <span className="art-dot art-dot-one" />
            <span className="art-dot art-dot-two" />
          </div>
          <div className="hero-index"><span>01</span> / 02</div>
        </section>

        <section className="modules-section" aria-labelledby="modules-title">
          <div className="modules-heading">
            <div>
              <div className="section-kicker">EMPIEZA POR AQUÍ</div>
              <h2 id="modules-title">¿Qué necesitas hacer?</h2>
              <p>Selecciona una herramienta para continuar.</p>
            </div>
            <div className="modules-count"><span>02</span> MÓDULOS</div>
          </div>

          <div className="module-grid">
            <article className="module-card module-card-search">
              <div className="module-card-top">
                <span className="module-icon search-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 4.2 4.2M8 8.5h5.5M8 11h4M8 13.5h2.5" />
                  </svg>
                </span>
                <span className="module-number">MÓDULO 01</span>
              </div>
              <div className="module-card-copy">
                <span className="module-category">CONSULTA DE INVENTARIO</span>
                <h3>Consultar productos<br /><span>PriceSmart</span></h3>
                <p>Encuentra productos y consulta su información y disponibilidad.</p>
              </div>
              <div className="module-card-bottom">
                <span className="module-status module-status-ready"><i /> Consulta disponible</span>
                <Link className="module-action module-action-ready" href="/productos" aria-label="Abrir consulta de productos PriceSmart">
                  Consultar <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="module-card-decoration" aria-hidden="true">01</div>
            </article>

            <article className="module-card module-card-create">
              <div className="module-card-top">
                <span className="module-icon create-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
                    <path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5M16.5 5.5l-8 4.7" />
                    <path d="M18.5 12v5M16 14.5h5" />
                  </svg>
                </span>
                <span className="module-number">MÓDULO 02</span>
              </div>
              <div className="module-card-copy">
                <span className="module-category">GESTIÓN DE CATÁLOGO</span>
                <h3>Crear productos<br /><span>PriceSmart</span></h3>
                <p>Registra nuevos productos y prepara su información para el catálogo.</p>
              </div>
              <div className="module-card-bottom">
                <span className="module-status module-status-ready"><i /> Creación disponible</span>
                <Link className="module-action module-action-ready" href="/productos/crear" aria-label="Crear productos PriceSmart">
                  Crear <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="module-card-decoration" aria-hidden="true">02</div>
            </article>
          </div>
        </section>

        <footer className="portal-footer">
          <span><span className="footer-brand-dot" /> Nexo Stock <span className="portal-footer-separator">·</span> Gestión de inventario</span>
          <span>PLATAFORMA MULTI-TIENDA <span className="portal-footer-separator">/</span> 2026</span>
        </footer>
      </div>
    </main>
  );
}
