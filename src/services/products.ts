export interface ProductAvailability {
  id: number;
  productId: number;
  clubCode: string;
  clubName: string;
  isAvailable: boolean;
  availableQuantity: number;
  checkedAt: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  createdAt: string;
  lastCheckedAt: string;
  availability: ProductAvailability[];
}

const apiBaseUrl = process.env.NEXT_PUBLIC_STOCK_API_URL?.replace(/\/+$/, "");

export interface CreateProductRequest {
  name: string;
  sku: string;
}

function getApiErrorMessage(responseBody: string, status: number, statusText: string) {
  if (responseBody) {
    try {
      const body: unknown = JSON.parse(responseBody);
      if (typeof body === "object" && body !== null) {
        const errorBody = body as Record<string, unknown>;
        if (typeof errorBody.detail === "string") return errorBody.detail;
        if (typeof errorBody.message === "string") return errorBody.message;
        if (typeof errorBody.title === "string") return errorBody.title;
      }
    } catch {
      return responseBody;
    }

    return responseBody;
  }

  return `La API respondió con el estado ${status} ${statusText}.`;
}

export async function createProduct(product: CreateProductRequest): Promise<void> {
  if (!apiBaseUrl) {
    throw new Error("Falta configurar NEXT_PUBLIC_STOCK_API_URL en el archivo .env.local.");
  }

  const response = await fetch(`${apiBaseUrl}/api/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(getApiErrorMessage(responseBody, response.status, response.statusText));
  }
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;

  const product = value as Record<string, unknown>;
  return (
    typeof product.id === "number" &&
    typeof product.sku === "string" &&
    typeof product.name === "string" &&
    typeof product.createdAt === "string" &&
    typeof product.lastCheckedAt === "string" &&
    Array.isArray(product.availability) &&
    product.availability.every(
      (item: unknown) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Record<string, unknown>).id === "number" &&
        typeof (item as Record<string, unknown>).productId === "number" &&
        typeof (item as Record<string, unknown>).clubCode === "string" &&
        typeof (item as Record<string, unknown>).clubName === "string" &&
        typeof (item as Record<string, unknown>).isAvailable === "boolean" &&
        typeof (item as Record<string, unknown>).availableQuantity === "number" &&
        typeof (item as Record<string, unknown>).checkedAt === "string",
    )
  );
}

export async function getProducts(
  options: { refresh?: boolean } = {},
): Promise<Product[]> {
  if (!apiBaseUrl) {
    throw new Error("Falta configurar NEXT_PUBLIC_STOCK_API_URL en el archivo .env.local.");
  }

  const query = new URLSearchParams({
    refresh: String(options.refresh ?? false),
  });
  const response = await fetch(`${apiBaseUrl}/api/products?${query}`, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status} ${response.statusText}.`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error("La API devolvió una respuesta de productos con un formato inesperado.");
  }

  return data;
}
