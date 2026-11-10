"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createProduct } from "../../../services/products";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCreated(false);

    const productName = name.trim();
    const productSku = sku.trim();
    if (!productName || !productSku) {
      setError("Ingresa el nombre y el SKU del producto.");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct({ name: productName, sku: productSku });
      setName("");
      setSku("");
      setCreated(true);
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "No fue posible registrar el producto. Inténtalo de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="products-page">
      <div className="products-container">
        <header className="products-header">
          <Link className="portal-brand" href="/inicio" aria-label="Volver al inicio">
            <span className="portal-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M7 23V9l18 14V9" />
                <path d="M4 26h24" />
              </svg>
            </span>
            <span>nexo<span>stock</span></span>
          </Link>
          <Link className="products-back-link" href="/inicio">
            <span aria-hidden="true">←</span> Inicio
          </Link>
        </header>

        <section className="products-intro">
          <div className="products-breadcrumb">
            <Link href="/inicio">Inicio</Link><span>/</span>
            <span>Crear productos PriceSmart</span>
          </div>
          <div className="products-title-row">
            <div>
              <span className="products-eyebrow"><span /> GESTIÓN DE CATÁLOGO · PRICESMART</span>
              <h1>Crear producto</h1>
              <p>Registra un producto nuevo con su nombre y SKU.</p>
            </div>
          </div>
        </section>

        <section className="create-product-layout" aria-label="Formulario de creación de producto">
          <div className="create-product-card">
            <div className="create-product-heading">
              <span className="create-product-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
                  <path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5M18.5 12v5M16 14.5h5" />
                </svg>
              </span>
              <div>
                <h2>Información del producto</h2>
                <p>Completa los datos para agregarlo al catálogo.</p>
              </div>
            </div>

            {error && (
              <div className="create-product-feedback feedback-error" role="alert">
                <span aria-hidden="true">!</span>
                <p>{error}</p>
              </div>
            )}
            {created && (
              <div className="create-product-feedback feedback-success" role="status">
                <span aria-hidden="true">✓</span>
                <p>Producto creado correctamente. <Link href="/productos">Ver catálogo</Link></p>
              </div>
            )}

            <form className="create-product-form" onSubmit={handleSubmit}>
              <label htmlFor="product-name">Nombre del producto <span>*</span></label>
              <input
                id="product-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ej. Batería de ollas Tramontina"
                autoComplete="off"
                required
                disabled={submitting}
              />
              <span className="create-field-hint">Escribe el nombre con el que identificarás el producto.</span>

              <label htmlFor="product-sku">SKU <span>*</span></label>
              <input
                id="product-sku"
                name="sku"
                type="text"
                value={sku}
                onChange={(event) => setSku(event.target.value)}
                placeholder="Ej. 492258"
                autoComplete="off"
                required
                disabled={submitting}
              />
              <span className="create-field-hint">El código SKU debe coincidir con el identificador del producto.</span>

              <div className="create-product-actions">
                <Link className="create-cancel-button" href="/inicio">Cancelar</Link>
                <button className="create-submit-button" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="create-button-spinner" aria-hidden="true" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      Crear producto
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="create-product-aside">
            <div className="create-aside-mark" aria-hidden="true">i</div>
            <h2>Un catálogo organizado empieza aquí.</h2>
            <p>Al crear el producto, quedará registrado en el sistema y estará disponible para consultar desde el catálogo.</p>
            <div className="create-aside-divider" />
            <div className="create-aside-tip">
              <span aria-hidden="true">✓</span>
              <p>Verifica el nombre y el SKU antes de guardar para evitar registros duplicados.</p>
            </div>
          </aside>
        </section>

        <footer className="products-footer">
          <span><span className="footer-brand-dot" /> Nexo Stock <span className="portal-footer-separator">·</span> Gestión de catálogo</span>
          <span>PRICESMART</span>
        </footer>
      </div>
    </main>
  );
}
