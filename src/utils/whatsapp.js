import { companyDetails } from '../data/company';
import { formatRs } from './pricing';

/**
 * WhatsApp deep-link for AT Solar Power Solutions.
 */
export const createWhatsAppLink = (
  productOrTitle,
  customPrice = null,
  phone = companyDetails.whatsapp,
) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  if (typeof productOrTitle === 'object' && productOrTitle !== null) {
    const p = productOrTitle;
    const message = `Assalam-o-Alaikum AT Solar Power Solutions! I am interested in:
📌 *Product:* ${p.name}
🏷️ *Brand:* ${p.brand || 'N/A'}
🔖 *SKU:* ${p.sku || p.id || 'N/A'}
⚡ *Capacity/Specs:* ${p.watts || p.efficiency || p.capacity || 'Standard'}
💰 *Price Listed:* ${p.price || 'Price on request'}
📝 *Caption:* ${p.caption || p.shortDescription || '—'}

Please share current price, stock, PDF datasheet, and installation details. Thanks!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  const defaultMsg =
    typeof productOrTitle === 'string' && productOrTitle.trim()
      ? productOrTitle.startsWith('Assalam')
        ? productOrTitle
        : `Assalam-o-Alaikum AT Solar! I want to inquire about ${productOrTitle}. Please contact me.`
      : 'Assalam-o-Alaikum AT Solar Power Solutions! I want a free site visit and solar quotation.';

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;
};

/** Cart checkout message */
export const createCartWhatsAppLink = (
  cartItems,
  cartTotal,
  phone = companyDetails.whatsapp,
) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const lines = (cartItems || [])
    .map(
      (i, idx) =>
        `${idx + 1}. *${i.name}* × ${i.qty || 1} — ${i.price || formatRs(i.numericPrice)}`,
    )
    .join('\n');

  const message = `Assalam-o-Alaikum AT Solar Power Solutions!
🛒 *Cart / Order inquiry*

${lines}

💵 *Estimated subtotal:* ${formatRs(cartTotal)}

Please confirm stock, final quote, delivery & installation. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
