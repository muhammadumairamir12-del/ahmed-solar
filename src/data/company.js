/** AT Solar Power Solutions — brand & contact (from flyer + Facebook) */
export const companyDetails = {
  name: 'AT Solar Power Solutions',
  shortName: 'AT Solar',
  tagline: 'Clean Energy | Better Tomorrow',
  sloganUrdu: 'سورج سے روشنی، گھر میں خوشحالی',
  sloganEn: 'Light from the sun, prosperity at home',
  logo: '/images/logo.png',
  owner: 'Muhammad Ahmad',
  phone: '0330 0002629',
  phoneDisplay: '+92 330 0002629',
  whatsapp: '923300002629',
  email: 'muhammadahmadmuhammadahmad726@gmail.com',
  address:
    'Bahria Town Phase 6 Road, Police Foundation Block E, Islamabad',
  mapCoordinates: '33.5651, 73.0169',
  mapEmbed:
    'https://www.google.com/maps?q=Bahria+Town+Phase+6+Police+Foundation+Islamabad&output=embed',
  facebook: 'https://web.facebook.com/profile.php?id=61590614387007',
  hours: 'Monday – Saturday: 9:00 AM – 8:00 PM',
  heroImage: '/images/hero-flyer.jpg',
};

export const services = [
  {
    id: 'residential',
    title: 'Residential Solar Solutions',
    description:
      'Complete home solar systems — on-grid, hybrid, and off-grid — sized for your bill and backup needs.',
    icon: 'Home',
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial Systems',
    description:
      'High-capacity installations for offices, factories, and warehouses with net-metering support.',
    icon: 'Building2',
  },
  {
    id: 'net-metering',
    title: 'Net Metering Services',
    description:
      'End-to-end net-metering documentation and coordination with your local DISCO.',
    icon: 'FileCheck',
  },
  {
    id: 'upgrade',
    title: 'System Upgradation',
    description:
      'Upgrade existing panels, inverters, or batteries for better output and reliability.',
    icon: 'ArrowUpCircle',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description:
      'Cleaning, inspection, fault diagnosis, and ongoing after-sales support.',
    icon: 'Wrench',
  },
  {
    id: 'consultation',
    title: 'Free Site Visit & Consultation',
    description:
      'Professional on-site survey and advice with zero consultation charges.',
    icon: 'ClipboardCheck',
  },
  {
    id: 'structure',
    title: 'Solar Structure Work',
    description:
      'GI / aluminium mounting structures engineered for rooftop load and wind conditions.',
    icon: 'Layers',
  },
  {
    id: 'installation',
    title: 'Complete Solar Installation',
    description:
      'Turnkey installation — wiring, earthing, DB boxes, testing, and commissioning.',
    icon: 'Hammer',
  },
];

export const benefits = [
  { title: 'Save on Electricity Bills', icon: 'Wallet' },
  { title: '24/7 Backup Power', icon: 'BatteryCharging' },
  { title: 'Increase Property Value', icon: 'TrendingUp' },
  { title: 'Eco Friendly & Green Energy', icon: 'Leaf' },
  { title: 'Low Maintenance & Long Life', icon: 'ShieldCheck' },
];

export const packages = [
  {
    id: 'pkg-5kw',
    name: '5KW Hybrid Package',
    badge: 'Homes',
    capacity: '5KW',
    summary: 'Ideal for small to mid-size homes with essential backup.',
    highlight: false,
    equipment: [
      { name: 'Solar Panels 580W', qty: '9 Pieces' },
      { name: 'Hybrid Inverter 5KW', qty: '1 Piece' },
      { name: 'Lithium Battery 5.12KWH', qty: '1 Piece' },
      { name: 'Solar Structure GI / Aluminium', qty: 'Complete Set' },
      { name: 'DC & AC Wiring + DB Boxes', qty: 'Complete' },
      { name: 'Earthing + Installation Kit', qty: 'Complete' },
    ],
  },
  {
    id: 'pkg-7kw',
    name: '7KW Solar System — Complete Setup',
    badge: 'Best Seller',
    capacity: '7KW',
    summary:
      'Our flagship complete package — panels, hybrid inverter, lithium battery, structure & full installation kit.',
    highlight: true,
    equipment: [
      { name: 'Solar Panels 580W', qty: '12 Pieces' },
      { name: 'Hybrid Inverter 7KW', qty: '1 Piece' },
      { name: 'Lithium Battery 5.12KWH', qty: '1 Piece' },
      { name: 'Solar Structure GI / Aluminium', qty: 'Complete Set' },
      { name: 'DC Cable 4mm', qty: '1 Coil' },
      { name: 'DC DB Box Complete', qty: '1 Piece' },
      { name: 'AC DB Box Complete', qty: '1 Piece' },
      { name: 'MC4 Connectors Complete Set', qty: '1 Set' },
      { name: 'AC Cable Complete', qty: '1 Coil' },
      { name: 'Earthing Set Complete', qty: '1 Set' },
      { name: 'PVC Pipes & Accessories', qty: 'Complete' },
      { name: 'Installation Kit', qty: 'Complete' },
    ],
  },
  {
    id: 'pkg-10kw',
    name: '10KW Hybrid Package',
    badge: 'Large Homes',
    capacity: '10KW',
    summary: 'For larger homes and small commercial loads with stronger backup.',
    highlight: false,
    equipment: [
      { name: 'Solar Panels 580W', qty: '18 Pieces' },
      { name: 'Hybrid Inverter 10KW', qty: '1 Piece' },
      { name: 'Lithium Battery 5.12KWH', qty: '2 Pieces' },
      { name: 'Solar Structure GI / Aluminium', qty: 'Complete Set' },
      { name: 'DC & AC Wiring + DB Boxes', qty: 'Complete' },
      { name: 'Earthing + Installation Kit', qty: 'Complete' },
    ],
  },
  {
    id: 'pkg-15kw',
    name: '15KW Commercial Package',
    badge: 'Commercial',
    capacity: '15KW',
    summary: 'Offices and shops needing higher generation and net metering.',
    highlight: false,
    equipment: [
      { name: 'Solar Panels 580W', qty: '26 Pieces' },
      { name: 'Hybrid / On-Grid Inverter 15KW', qty: '1 Piece' },
      { name: 'Lithium Battery Bank', qty: 'As Required' },
      { name: 'Heavy Structure + Full Cabling', qty: 'Complete' },
      { name: 'Net Metering Support', qty: 'Included' },
      { name: 'Installation & Commissioning', qty: 'Complete' },
    ],
  },
];

export const policies = [
  'Customer provides material — we only charge the installation fee (when applicable).',
  'Transparent pricing — no hidden costs.',
  '100% satisfaction guaranteed.',
  'Free site visit — professional advice with no charges.',
];
