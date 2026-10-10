/** Extra e-commerce fields merged onto catalog products by id */
export const commerceExtras = {
  'panel-jinko-tiger-neo-585w': {
    sku: 'JK-TIGER-585',
    caption: 'Tier-1 N-Type TOPCon — best for homes & hybrid systems',
    shortDescription:
      'Ultra-high efficiency 585W module with low degradation — ideal for Islamabad rooftops.',
    offer: { percent: 8, label: 'Hot Deal' },
    compareAtPrice: 'Rs. 24,500',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Jinko Tiger Neo Datasheet (PDF)',
    features: [
      'N-Type TOPCon dual glass',
      '22.65% module efficiency',
      '30-year linear power warranty',
      'Excellent low-light performance',
    ],
    inStock: true,
    stockQty: 120,
    tags: ['offer', 'featured', 'residential'],
  },
  'panel-longi-hi-mo-6-580w': {
    sku: 'LG-HIMO6-580',
    caption: 'Premium HPBC aesthetics + heat tolerance',
    offer: { percent: 5, label: 'Season Sale' },
    compareAtPrice: 'Rs. 23,400',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Longi Hi-MO 6 Datasheet (PDF)',
    features: ['HPBC cell tech', 'Clean black look', '15-year product warranty'],
    tags: ['offer', 'featured'],
  },
  'panel-canadian-hiKu7-665w': {
    sku: 'CS-HIKU7-665',
    caption: 'Commercial bifacial — extra rear-side generation',
    offer: { percent: 10, label: 'Commercial Offer' },
    compareAtPrice: 'Rs. 28,700',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Canadian Solar BiHiKu7 Datasheet (PDF)',
    features: ['Bifacial dual glass', 'Up to +25% rear gain', 'Utility / C&I ready'],
    tags: ['offer', 'commercial'],
  },
  'inv-growatt-sph-10000tl3': {
    sku: 'GW-SPH-10K',
    caption: '10kW 3-phase hybrid with UPS / EPS backup',
    offer: { percent: 7, label: 'Inverter Deal' },
    compareAtPrice: 'Rs. 515,000',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Growatt SPH Datasheet (PDF)',
    features: ['Dual MPPT', 'EPS emergency output', 'Smart monitoring'],
    tags: ['offer', 'hybrid'],
  },
  'inv-huawei-sun2000-10ktl': {
    sku: 'HW-SUN2000-10K',
    caption: 'AI arc-fault protection · silent cooling',
    offer: { percent: 6, label: 'Smart Choice' },
    compareAtPrice: 'Rs. 552,000',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Huawei SUN2000 Datasheet (PDF)',
    features: ['AFCI AI safety', 'IP65 outdoor', '10-year warranty option'],
    tags: ['offer', 'on-grid'],
  },
  'bat-pylontech-us5000': {
    sku: 'PY-US5000',
    caption: 'Modular LiFePO4 rack battery — 6000+ cycles',
    offer: { percent: 9, label: 'Storage Offer' },
    compareAtPrice: 'Rs. 350,000',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Pylontech US5000 Datasheet (PDF)',
    features: ['95% DoD', 'Smart BMS', 'Stackable modules'],
    tags: ['offer', 'lithium'],
  },
  'bat-inverex-wall-mount-10k': {
    sku: 'INV-PW-10K',
    caption: 'Wall-mount powerwall look for modern homes',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Inverex PowerWall Datasheet (PDF)',
    features: ['10.2 kWh usable class', 'Wall mounted', 'Home backup ready'],
    tags: ['lithium'],
  },
  'inv-foxess-h3-12kw': {
    sku: 'FX-H3-12K',
    caption: '12kW three-phase hybrid for large homes',
    offer: { percent: 4, label: 'Bundle Ready' },
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Fox ESS H3 Datasheet (PDF)',
  },
  'inv-deye-12kw-three-phase': {
    sku: 'DY-12K-SG04',
    caption: 'Parallel-ready hybrid · generator support',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Deye Hybrid Datasheet (PDF)',
  },
  'stand-l3-heavy-galvanized': {
    sku: 'STR-L3-GI',
    caption: 'Hot-dip GI L3 structure — wind resistant',
    offer: { percent: 12, label: 'Structure Sale' },
    compareAtPrice: 'Rs. 21,000',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Structure Spec Sheet (PDF)',
  },
  'wire-fast-cables-6mm-dc': {
    sku: 'FC-DC-6MM-100',
    caption: 'UV-resistant solar DC cable — 100m coil',
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'Solar DC Cable Spec (PDF)',
  },
  'vfd-invt-gd100-15kw': {
    sku: 'INVT-GD100-15',
    caption: 'Solar pump drive — diesel replacement',
    offer: { percent: 5, label: 'Agri Offer' },
    pdfUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    pdfLabel: 'INVT Solar VFD Datasheet (PDF)',
  },
};

export function applyCommerceExtras(products) {
  return (products || []).map((p) => {
    const extra = commerceExtras[p.id] || {};
    return { ...p, ...extra };
  });
}
