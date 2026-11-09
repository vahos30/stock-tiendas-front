"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/inicio");
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Acceso a Nexo Stock">
        <div className="showcase-panel">
          <header className="brand">
            <div className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M7 23V9l18 14V9" />
                <path d="M4 26h24" />
              </svg>
            </div>
            <span>nexo<span className="brand-light">stock</span></span>
          </header>

          <div className="showcase-copy">
            <div className="eyebrow"><span /> CONTROL INTELIGENTE DE INVENTARIO</div>
            <h1>Tu negocio,<br />siempre en <span>existencia.</span></h1>
            <p>
              Consulta tus productos, revisa el stock y toma mejores decisiones
              desde un solo lugar.
            </p>
          </div>

          <div className="inventory-preview" aria-label="Vista previa del inventario">
            <div className="preview-top">
              <div>
                <span className="preview-label">VISTA GENERAL</span>
                <h2>Inventario</h2>
              </div>
              <span className="preview-dots" aria-hidden="true">···</span>
            </div>
            <div className="preview-stats">
              <div>
                <span className="stat-icon mint">▦</span>
                <span className="preview-label">Productos</span>
                <strong>1,284</strong>
              </div>
              <div>
                <span className="stat-icon lime">↗</span>
                <span className="preview-label">Disponibles</span>
                <strong>96.8%</strong>
              </div>
            </div>
            <div className="stock-heading">
              <span>Actividad de stock</span>
              <span className="period-pill">Esta semana⌄</span>
            </div>
            <div className="chart" aria-hidden="true">
              <div className="chart-lines"><i /><i /><i /></div>
              <div className="chart-bars">
                <i style={{ height: "36%" }} /><i style={{ height: "54%" }} />
                <i style={{ height: "45%" }} /><i style={{ height: "72%" }} />
                <i style={{ height: "57%" }} /><i style={{ height: "84%" }} />
                <i style={{ height: "68%" }} /><i style={{ height: "100%" }} />
                <i style={{ height: "77%" }} /><i style={{ height: "90%" }} />
                <i style={{ height: "64%" }} /><i style={{ height: "82%" }} />
              </div>
              <div className="chart-days"><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span></div>
            </div>
          </div>

          <div className="showcase-footer">
            <span className="online-dot" /> Una forma más clara de llevar tu inventario
            <span className="footer-version">NEXO STOCK · 2026</span>
          </div>
        </div>

        <div className="form-panel">
          <div className="mobile-brand brand">
            <div className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none"><path d="M7 23V9l18 14V9" /><path d="M4 26h24" /></svg>
            </div>
            <span>nexo<span className="brand-light">stock</span></span>
          </div>
          <div className="form-content">
            <div className="welcome-tag">BIENVENIDO DE NUEVO</div>
            <h2>Qué bueno tenerte<br className="desktop-break" /> por aquí.</h2>
            <p className="form-intro">Ingresa a tu cuenta para continuar.</p>

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-wrap">
                <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4" width="15" height="12" rx="2" /><path d="m3.5 5.5 6.5 5 6.5-5" /></svg>
                <input id="email" name="email" type="email" placeholder="tu@empresa.com" autoComplete="username" required />
              </div>

              <div className="password-label">
                <label htmlFor="password">Contraseña</label>
                <button className="text-button" type="button" onClick={() => setMessage("La recuperación de contraseña estará disponible al conectar la API.")}>
                  ¿La olvidaste?
                </button>
              </div>
              <div className="input-wrap">
                <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3.5" y="8.5" width="13" height="9" rx="2" /><path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" /></svg>
                <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" required />
                <button className="visibility-button" type="button" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 3l14 14M8.6 8.6a2 2 0 0 0 2.8 2.8" /><path d="M8.2 4.3A8.8 8.8 0 0 1 10 4c4.5 0 7.5 5 7.5 5a12 12 0 0 1-2.4 2.8M5.2 5.2C3.4 6.4 2.5 9 2.5 9s3 5 7.5 5c.6 0 1.2-.1 1.7-.2" /></svg>
                  ) : (
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2.5 10s3-5 7.5-5 7.5 5 7.5 5-3 5-7.5 5-7.5-5-7.5-5Z" /><circle cx="10" cy="10" r="2" /></svg>
                  )}
                </button>
              </div>

              <div className="form-options">
                <label className="remember-option"><input type="checkbox" name="remember" /> <span>Recordarme</span></label>
                <span className="secure-note"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 13 3v4c0 3.4-2.1 5.8-5 7.5C5.1 12.8 3 10.4 3 7V3l5-1.5Z" /><path d="m6 7.5 1.4 1.4L10 6.3" /></svg> Acceso seguro</span>
              </div>

              <button className="submit-button" type="submit">
                Iniciar sesión <span aria-hidden="true">→</span>
              </button>
              {message && <p className="form-message" role="status">{message}</p>}
            </form>

            <div className="form-divider"><span>TODO LO QUE NECESITAS</span></div>
            <div className="feature-note">
              <div className="feature-icon"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 4.5h14v11H3z" /><path d="M3 8h14M7 8v7.5M12 8v7.5" /></svg></div>
              <div><strong>Tu inventario, bajo control</strong><span>Encuentra productos y consulta existencias al instante.</span></div>
            </div>
          </div>
          <footer className="form-footer"><span>© 2026 Nexo Stock</span><span>Hecho para crecer contigo <b>✳</b></span></footer>
        </div>
      </section>
    </main>
  );
}
