/**
 * Ensure every product has e-commerce fields (caption, PDF, offer, gallery, stock).
 * Admin can override any field; missing ones get sensible defaults.
 */
export function normalizeProduct(product) {
  if (!product) return product;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [
            'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
          ];

  const features =
    Array.isArray(product.features) && product.features.length > 0
      ? product.features
      : [
          product.technology,
          product.watts ? `${product.watts} rated` : null,
          product.efficiency ? `${product.efficiency} efficiency` : null,
          product.warranty ? 'Manufacturer warranty' : null,
        ].filter(Boolean);

  return {
    ...product,
    sku: product.sku || String(product.id || '').toUpperCase(),
    caption: product.caption || product.technology || product.brand || '',
    shortDescription:
      product.shortDescription ||
      (product.description ? String(product.description).slice(0, 140) : ''),
    description: product.description || '',
    images,
    image: product.image || images[0],
    pdfUrl: product.pdfUrl || null,
    pdfLabel: product.pdfLabel || 'Company Datasheet (PDF)',
    offer: product.offer || null,
    compareAtPrice: product.compareAtPrice || null,
    inStock: product.inStock !== false,
    stockQty: product.stockQty ?? 25,
    features,
    tags: product.tags || [],
  };
}

export function normalizeProducts(list) {
  return (list || []).map(normalizeProduct);
}
