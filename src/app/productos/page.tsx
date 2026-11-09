"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProducts, type Product } from "../../services/products";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getProducts({ refresh: false, signal: controller.signal })
      .then(setProducts)
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          cause instanceof Error
            ? cause.message
            : "No fue posible consultar los productos.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  function reloadProducts() {
    setLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  }

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("es");
    if (!normalizedSearch) return products;

    return products.filter((product) =>
      `${product.sku} ${product.name}`.toLocaleLowerCase("es").includes(normalizedSearch),
    );
  }, [products, search]);

  const storeCount = useMemo(
    () => new Set(products.flatMap((product) => product.availability.map((item) => item.clubCode))).size,
    [products],
  );
  const availableCount = products.filter((product) =>
    product.availability.some((item) => item.isAvailable && item.availableQuantity > 0),
  ).length;

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
          <div className="products-breadcrumb"><Link href="/inicio">Inicio</Link><span>/</span><span>Consultar productos</span></div>
          <div className="products-title-row">
            <div>
              <span className="products-eyebrow"><span /> CONSULTA DE INVENTARIO · PRICESMART</span>
              <h1>Productos</h1>
              <p>Consulta el catálogo y revisa la disponibilidad por tienda.</p>
            </div>
            <button
              className="products-refresh-button"
              type="button"
              onClick={reloadProducts}
              disabled={loading}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M16.5 8A6.7 6.7 0 0 0 4 5.5L2.5 7M3.5 12A6.7 6.7 0 0 0 16 14.5l1.5-1.5" />
                <path d="M2.5 3.5V7h3.5M17.5 16.5V13H14" />
              </svg>
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </section>

        {error && (
          <div className="products-error" role="alert">
            <span className="products-error-icon" aria-hidden="true">!</span>
            <div>
              <strong>No se pudo cargar el catálogo</strong>
              <p>{error}</p>
              <span>Verifica que la API local esté iniciada y que permita solicitudes desde el frontend.</span>
            </div>
            <button type="button" onClick={reloadProducts}>Reintentar</button>
          </div>
        )}

        <section className="products-stats" aria-label="Resumen del inventario">
          <div className="products-stat-card">
            <span className="products-stat-icon stat-products-icon" aria-hidden="true">▦</span>
            <div><span>Productos registrados</span><strong>{loading && products.length === 0 ? "—" : products.length}</strong></div>
          </div>
          <div className="products-stat-card">
            <span className="products-stat-icon stat-available-icon" aria-hidden="true">✓</span>
            <div><span>Con disponibilidad</span><strong>{loading && products.length === 0 ? "—" : availableCount}</strong></div>
          </div>
          <div className="products-stat-card">
            <span className="products-stat-icon stat-stores-icon" aria-hidden="true">⌖</span>
            <div><span>Tiendas consultadas</span><strong>{loading && products.length === 0 ? "—" : storeCount}</strong></div>
          </div>
        </section>

        <section className="products-catalog" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <h2 id="catalog-title">Catálogo de productos</h2>
              <p>{loading && products.length === 0 ? "Conectando con el inventario..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? "producto" : "productos"}`}</p>
            </div>
            <label className="catalog-search">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.2 13.2 4 4" /></svg>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nombre o SKU"
                aria-label="Buscar por nombre o SKU"
              />
              <kbd>⌕</kbd>
            </label>
          </div>

          {loading && products.length === 0 ? (
            <div className="products-loading" role="status">
              <span className="loading-spinner" />
              <span>Consultando productos...</span>
            </div>
          ) : error && products.length === 0 ? (
            <div className="products-empty">
              <span aria-hidden="true">!</span>
              <strong>Catálogo no disponible</strong>
              <p>Revisa la conexión con la API e inténtalo de nuevo.</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="product-list">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-main">
                    <div className="product-box-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                        <path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v8.5" />
                      </svg>
                    </div>
                    <div className="product-name-block">
                      <span className="product-sku">SKU {product.sku}</span>
                      <h3>{product.name}</h3>
                    </div>
                    <div className="product-checked">
                      <span>Última consulta</span>
                      <strong>{formatDate(product.lastCheckedAt)}</strong>
                    </div>
                  </div>
                  <div className="product-stores">
                    {product.availability.map((item) => (
                      <div className="store-stock" key={item.id}>
                        <span className={`store-stock-indicator ${item.isAvailable && item.availableQuantity > 0 ? "is-in-stock" : "is-out-of-stock"}`} />
                        <div className="store-stock-details">
                          <span>{item.clubName}</span>
                          <strong>{item.isAvailable && item.availableQuantity > 0 ? `${item.availableQuantity} disponibles` : "Sin existencias"}</strong>
                        </div>
                        <span className={`store-stock-status ${item.isAvailable && item.availableQuantity > 0 ? "status-in-stock" : "status-out-of-stock"}`}>
                          {item.isAvailable && item.availableQuantity > 0 ? "Disponible" : "Agotado"}
                        </span>
                      </div>
                    ))}
                    {product.availability.length === 0 && (
                      <p className="no-stock-data">Aún no hay información de disponibilidad para este producto.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <span aria-hidden="true">⌕</span>
              <strong>{products.length ? "No encontramos coincidencias" : "Todavía no hay productos"}</strong>
              <p>{products.length ? "Prueba con otro nombre o SKU." : "Cuando registres productos, aparecerán aquí."}</p>
              {search && <button type="button" onClick={() => setSearch("")}>Limpiar búsqueda</button>}
            </div>
          )}
        </section>

        <footer className="products-footer">
          <span><span className="footer-brand-dot" /> Nexo Stock <span className="portal-footer-separator">·</span> Consulta de inventario</span>
          <span>DATOS PROPORCIONADOS POR LA API LOCAL</span>
        </footer>
      </div>
    </main>
  );
}
