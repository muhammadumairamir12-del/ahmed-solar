/** Price / offer helpers for AT Solar shop */

export function parseNumericPrice(price) {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  return Number(String(price).replace(/[^0-9]/g, '')) || 0;
}

export function formatRs(amount) {
  if (!amount && amount !== 0) return 'Price on request';
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
}

/** Returns { displayPrice, compareAt, percent, hasOffer, label } */
export function getOfferPricing(product) {
  const base = product.numericPrice || parseNumericPrice(product.price);
  const offer = product.offer || null;

  if (!offer) {
    return {
      displayPrice: product.price || formatRs(base) || 'Price on request',
      compareAt: null,
      percent: 0,
      hasOffer: false,
      label: null,
      numeric: base,
    };
  }

  const percent = Number(offer.percent) || 0;
  const compareAt =
    offer.compareAt ||
    product.compareAtPrice ||
    product.price ||
    formatRs(base);
  const discounted =
    offer.salePrice != null
      ? parseNumericPrice(offer.salePrice)
      : percent > 0
        ? Math.round(base * (1 - percent / 100))
        : base;

  return {
    displayPrice: formatRs(discounted),
    compareAt,
    percent,
    hasOffer: true,
    label: offer.label || `${percent}% OFF`,
    numeric: discounted,
  };
}
