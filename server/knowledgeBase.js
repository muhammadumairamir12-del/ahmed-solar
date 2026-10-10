/**
 * Verified Knowledge Base for AT Solar Power Solutions (Islamabad)
 * Source of truth for Ahmed Assistant AI.
 */

export const companyProfile = {
  name: 'AT Solar Power Solutions',
  shortName: 'AT Solar',
  tagline: 'Clean Energy | Better Tomorrow',
  sloganUrdu: 'سورج سے روشنی، گھر میں خوشحالی',
  owner: 'Muhammad Ahmad',
  phone: '0330 0002629',
  phoneDisplay: '+92 330 0002629',
  whatsapp: '923300002629',
  email: 'muhammadahmadmuhammadahmad726@gmail.com',
  address: 'Bahria Town Phase 6 Road, Police Foundation Block E, Islamabad',
  city: 'Islamabad',
  coverageAreas: ['Islamabad', 'Rawalpindi', 'Bahria Town', 'DHA', 'Police Foundation', 'Soan Gardens', 'Gulberg Greens', 'All Twin Cities Sectors'],
  hours: 'Monday – Saturday: 9:00 AM – 8:00 PM (Closed Sundays)',
  freeServices: [
    'Free on-site roof survey and shading analysis',
    'Free preliminary solar system sizing and savings estimation',
    'Free quotation consultation with zero obligation',
  ],
  keyPolicies: [
    'Customer can provide materials — AT Solar can provide installation-only service when requested.',
    'Turnkey complete packages available with full warranty and documentation.',
    'Transparent pricing with zero hidden costs.',
    'End-to-end IESCO / DISCO Net Metering document processing and coordination.',
  ],
};

export const packages = [
  {
    id: 'pkg-5kw',
    name: '5KW Hybrid Package',
    capacity: '5KW',
    recommendedFor: 'Small to mid-size homes (5-7 Marla, 300-500 monthly units)',
    typicalAppliances: '1 Inverter AC (1.5 ton), 1 Refrigerator, 4-5 Fans, LED lights, TV, Water pump (intermittent)',
    equipment: [
      '9x 580W Tier-1 Mono PERC / N-Type Solar Panels',
      '1x 5KW Smart Hybrid Inverter with Wi-Fi Monitoring',
      '1x 5.12kWh Lithium LiFePO4 Battery or Tubular Battery Bank',
      'Galvanized Iron (GI) / Aluminium L2/L3 Rooftop Structure',
      'Pure Copper DC & AC Cables, Dual Breaker Distribution Boxes',
      'Complete Earthing Kit and Surge Protection (SPDs)',
    ],
    installationTime: '2 to 3 days',
  },
  {
    id: 'pkg-7kw',
    name: '7KW Solar System — Complete Flagship Setup',
    capacity: '7KW',
    badge: 'Best Seller',
    recommendedFor: 'Standard 10 Marla to 1 Kanal homes (600-900 monthly units)',
    typicalAppliances: '2 Inverter ACs (daytime), 1 Refrigerator/Deep Freezer, 1 HP Water Pump, Washing Machine, Iron, Fans, Lights',
    equipment: [
      '12x 580W Tier-1 Bifacial / N-Type Solar Panels',
      '1x 7KW Hybrid Inverter with LCD & Wi-Fi cloud monitoring',
      '1x 5.12kWh Wall-Mounted Lithium Battery (LiFePO4, 6000+ cycles)',
      'Heavy-duty GI / Aluminium Roof Mounting Structure',
      '1 Coil 4mm DC Solar Cable + Pure Copper AC Cable',
      'AC & DC IP65 DB Boxes with Schneider/TOMZN breakers & SPDs',
      'MC4 Connectors, PVC Conduit Piping, and Earthing Pit Set',
      'Complete Testing, Commissioning & IESCO Net Metering Support',
    ],
    installationTime: '2 to 4 days',
  },
  {
    id: 'pkg-10kw',
    name: '10KW Hybrid Package',
    capacity: '10KW',
    recommendedFor: 'Large 1 Kanal villas and double-unit houses (900-1400 monthly units)',
    typicalAppliances: '2-3 Inverter ACs, 2 Refrigerators, 1.5 HP Motor, Microwave, Full House Lighting, 24/7 Night Backup',
    equipment: [
      '18x 580W Tier-1 N-Type Panels',
      '1x 10KW Three-Phase or Single-Phase Hybrid Inverter',
      '2x 5.12kWh (Total 10.24kWh) Lithium Battery Bank',
      'Engineered Elevated or Rooftop Heavy GI Structure',
      'Complete Pure Copper Electrical Kit, DBs, Earthing & Lightning Arrester',
    ],
    installationTime: '3 to 5 days',
  },
  {
    id: 'pkg-15kw',
    name: '15KW Commercial Package',
    capacity: '15KW',
    recommendedFor: 'Offices, plazas, hospitals, schools, and commercial establishments (1500+ monthly units)',
    typicalAppliances: 'Multiple ACs, servers, office computers, heavy commercial loads, net-metering surplus export',
    equipment: [
      '26x 580W Tier-1 Commercial Solar Panels',
      '1x 15KW Three-Phase On-Grid / Hybrid Inverter',
      'Lithium storage bank configured to backup requirements',
      'Engineered Commercial Galvanized Steel Frame Structure',
      'Complete Three-Phase Electrical Infrastructure and Net Metering Commissioning',
    ],
    installationTime: '4 to 7 days',
  },
];

export const systemTypes = {
  onGrid: {
    name: 'On-Grid (Grid-Tied) System',
    description: 'System connects directly with the national electrical grid (IESCO/DISCO). Solar power generated during the day powers the house and excess units are exported to the grid via bidirectional Net Metering. Does NOT provide backup during load-shedding / power outage for safety reasons.',
    bestFor: 'Areas with zero or very rare load-shedding where primary goal is eliminating heavy electricity bills.',
    components: 'Solar panels, On-grid string inverter, Net meter, Mounting structure, DC/AC cabling.',
  },
  hybrid: {
    name: 'Hybrid Solar System',
    description: 'The most popular system in Islamabad. Combines solar power, battery storage, and grid connection. Powers loads from solar by day, stores extra power in lithium batteries for night/load-shedding, and exports excess daytime units to the grid through Net Metering.',
    bestFor: 'Pakistani homes and businesses wanting both bill reduction and uninterrupted 24/7 electricity during power outages.',
    components: 'Solar panels, Hybrid inverter with charger, Lithium / Tubular battery, Net meter, Structure, Cabling.',
  },
  offGrid: {
    name: 'Off-Grid (Standalone) System',
    description: 'Completely independent from the electrical utility grid. Relies 100% on solar panels and large battery banks (with optional generator backup).',
    bestFor: 'Remote farm houses, rural areas, or tube well applications where no electricity line exists.',
    components: 'Solar panels, Off-grid inverter, Battery bank, Structure, Wiring.',
  },
};

export const verifiedBrands = {
  panels: [
    { brand: 'Jinko Solar', model: 'Tiger Neo N-Type 585W TOPCon', efficiency: '22.65%', warranty: '12 Years Product, 30 Years Linear Power' },
    { brand: 'Longi Solar', model: 'Hi-MO 6 Scientist 580W HPBC', efficiency: '22.5%', warranty: '15 Years Product, 25 Years Power' },
    { brand: 'Canadian Solar', model: 'BiHiKu7 N-Type 665W Bifacial Dual Glass', efficiency: '21.4%', warranty: '12 Years Product, 30 Years Power' },
    { brand: 'JA Solar', model: 'DeepBlue 4.0 Pro 575W N-Type TOPCon', efficiency: '22.2%', warranty: '12 Years Product, 30 Years Power' },
    { brand: 'Trina Solar', model: 'Vertex N 695W i-TOPCon', efficiency: '22.4%', warranty: '12 Years Product, 30 Years Power' },
    { brand: 'Risen Energy', model: 'Hyper-ION HJT 700W Heterojunction', efficiency: '22.5%', warranty: '15 Years Product, 30 Years Power' },
  ],
  inverters: [
    { brand: 'Growatt', types: 'Hybrid & On-Grid (SPH series 5kW-15kW)', warranty: '5 Years Factory Warranty' },
    { brand: 'Huawei', types: 'On-Grid Smart Inverters (SUN2000 series)', warranty: '5-10 Years Factory Warranty' },
    { brand: 'Fox ESS', types: 'Hybrid & Storage Inverters', warranty: '5 Years Warranty' },
    { brand: 'Sungrow', types: 'Commercial & Residential On-Grid/Hybrid', warranty: '5 Years Warranty' },
    { brand: 'Solis', types: 'Reliable Dual/Triple MPPT Grid-tied & Hybrid', warranty: '5 Years Warranty' },
    { brand: 'Deye / Nitrox', types: 'Hybrid Inverters with Generator support', warranty: '5 Years Warranty' },
    { brand: 'Inverex', types: 'Nitrox, Yukon, Aerox hybrid models', warranty: '5 Years Warranty' },
  ],
  batteries: [
    { type: 'Lithium LiFePO4', brands: 'Pylontech, Inverex Lithium, Narada, Dyness', capacity: '5.12 kWh / 10 kWh', cycleLife: '6000+ cycles (10-15 years lifetime)', warranty: '5 to 10 Years Warranty' },
    { type: 'Deep Cycle Tubular', brands: 'Phoenix Tubular, Osaka Deep Cycle', capacity: '180Ah - 230Ah', cycleLife: '1200-1500 cycles (3-5 years)', warranty: '1 to 2 Years Warranty' },
  ],
};

export const verifiedFaqs = [
  {
    q: 'How long does solar installation take?',
    a: 'Residential physical installation (5kW – 25kW) takes 2 to 4 days for structure mounting, wiring, earthing, and commissioning. Net metering paperwork and green meter installation usually takes 2 to 4 weeks depending on the IESCO/DISCO schedule.',
  },
  {
    q: 'What warranties are provided?',
    a: 'Tier-1 Solar Panels come with 12 to 15 years product warranty and 25 to 30 years linear power output warranty. Hybrid and On-Grid inverters have 5 to 10 years standard manufacturer warranties. Lithium batteries have 5 to 10 years warranties.',
  },
  {
    q: 'Is bank financing available?',
    a: 'Yes, AT Solar facilitates the State Bank of Pakistan (SBP) concessionary solar financing scheme through partner commercial banks at subsidized markup rates with flexible repayment terms of 3 to 7 years.',
  },
  {
    q: 'How do I know panels are 100% genuine Tier-1?',
    a: 'All panels supplied by AT Solar include original barcode serial numbers verifiable directly on the manufacturer official portal, original factory packaging, and verified flash test test reports.',
  },
  {
    q: 'What is Net Metering and how does it work?',
    a: 'Net Metering is a billing mechanism that credits solar energy system owners for the electricity they export to the grid. When your solar system generates more electricity than your home consumes during the day, the excess is sent to the grid. The green bidirectional meter runs backwards, offsetting your nighttime or winter consumption.',
  },
];

/**
 * Verified sizing logic based on Pakistan electricity tariffs and solar irradiance in Islamabad
 */
export function calculateSolarEstimate(monthlyBill, propertyType = 'residential') {
  const bill = Math.max(5000, Number(monthlyBill) || 30000);
  const avgUnitRate = 55; // PKR per unit (average blended tariff including taxes & fuel adjustments)
  const monthlyUnits = Math.round(bill / avgUnitRate);
  
  // In Islamabad/Rawalpindi, 1kW produces approx 120 units per month
  let recommendedKw = Math.max(3, Math.round((monthlyUnits / 120) * 10) / 10);
  
  // Snap to common practical inverter capacities
  if (recommendedKw > 3 && recommendedKw < 4.5) recommendedKw = 5;
  else if (recommendedKw > 5.5 && recommendedKw < 8.5) recommendedKw = 7;
  else if (recommendedKw >= 8.5 && recommendedKw < 12) recommendedKw = 10;
  else if (recommendedKw >= 12 && recommendedKw < 18) recommendedKw = 15;
  else if (recommendedKw >= 18) recommendedKw = Math.round(recommendedKw);

  // Turnkey benchmark in Pakistan: ~Rs 120,000 to 130,000 per kW complete (panels, hybrid inverter, lithium battery, structure, cables, labor)
  const estimatedCost = Math.round(recommendedKw * 125000);
  const estimatedMinCost = Math.round(recommendedKw * 115000);
  const estimatedMaxCost = Math.round(recommendedKw * 135000);
  
  const estimatedYearlySavings = Math.round(bill * 12 * 0.90);
  const panelsCount = Math.ceil((recommendedKw * 1000) / 580);
  const roofAreaSqFt = Math.round(panelsCount * 28); // ~28 sq ft per panel with spacing

  return {
    monthlyBill: bill,
    propertyType,
    monthlyUnits,
    recommendedKw,
    panelsCount,
    panelWattage: '580W N-Type Tier-1',
    estimatedCostRange: {
      min: estimatedMinCost,
      max: estimatedMaxCost,
      approx: estimatedCost,
      display: `Rs. ${estimatedMinCost.toLocaleString()} – Rs. ${estimatedMaxCost.toLocaleString()}`,
    },
    estimatedYearlySavings: {
      amount: estimatedYearlySavings,
      display: `Rs. ${estimatedYearlySavings.toLocaleString()}`,
    },
    paybackPeriodYears: '2.5 to 3.5 years',
    requiredRoofArea: `${roofAreaSqFt} sq. ft. approx`,
    isPreliminaryEstimate: true,
    disclaimer: 'This is a preliminary engineering estimate based on standard Rs 55/unit tariff and 120 units/kW generation. Final quotations depend on exact roof orientation, structure design (L2/L3/elevated), battery capacity, and site survey.',
  };
}

/**
 * Keyword-based retrieval to surface relevant context for user questions
 */
export function searchKnowledgeBase(query) {
  if (!query || typeof query !== 'string') return '';
  const q = query.toLowerCase();
  const snippets = [];

  if (q.includes('price') || q.includes('cost') || q.includes('estimate') || q.includes('bill') || q.includes('kharcha') || q.includes('rate') || q.includes('قیمت') || q.includes('خرچہ')) {
    snippets.push(`Sizing & Costs: Average turnkey complete solar in Pakistan is ~Rs 120,000–130,000 per kW (including 580W panels, hybrid inverter, lithium battery, GI structure, pure copper wiring, testing & commissioning). 5kW is approx Rs 600k–650k, 7kW flagship complete setup is approx Rs 850k–950k (on-grid/hybrid variants), 10kW is approx Rs 1.2M–1.35M. Electricity unit rate average is Rs 55/unit.`);
  }

  if (q.includes('7kw') || q.includes('7 kw') || q.includes('flagship') || q.includes('10 marla') || q.includes('1 kanal')) {
    const pkg = packages.find(p => p.id === 'pkg-7kw');
    if (pkg) snippets.push(`7KW Flagship Package: ${pkg.recommendedFor}. Equipment: ${pkg.equipment.join('; ')}. Runs 2 inverter ACs, fridge, motor, household load.`);
  }

  if (q.includes('5kw') || q.includes('5 kw')) {
    const pkg = packages.find(p => p.id === 'pkg-5kw');
    if (pkg) snippets.push(`5KW Hybrid Package: ${pkg.recommendedFor}. Equipment: ${pkg.equipment.join('; ')}.`);
  }

  if (q.includes('10kw') || q.includes('10 kw')) {
    const pkg = packages.find(p => p.id === 'pkg-10kw');
    if (pkg) snippets.push(`10KW Hybrid Package: ${pkg.recommendedFor}. Equipment: ${pkg.equipment.join('; ')}.`);
  }

  if (q.includes('15kw') || q.includes('15 kw') || q.includes('commercial')) {
    const pkg = packages.find(p => p.id === 'pkg-15kw');
    if (pkg) snippets.push(`15KW Commercial Package: ${pkg.recommendedFor}. Equipment: ${pkg.equipment.join('; ')}.`);
  }

  if (q.includes('net meter') || q.includes('disco') || q.includes('iesco') || q.includes('green meter') || q.includes('نیٹ میٹر')) {
    snippets.push(`Net Metering: End-to-end processing handled by AT Solar with IESCO/DISCO. Timeline is 2 to 4 weeks. Excess units exported to the grid get credited on your bill.`);
  }

  if (q.includes('warrant') || q.includes('guarantee') || q.includes('وارنٹی')) {
    snippets.push(`Warranties: Tier-1 Panels come with 12-15 years product warranty and 25-30 years linear power output warranty. Inverters carry 5-10 years factory warranty. Lithium batteries carry 5-10 years (6000+ cycles) warranty.`);
  }

  if (q.includes('financ') || q.includes('bank') || q.includes('loan') || q.includes('sbp') || q.includes('قسط')) {
    snippets.push(`Bank Financing: SBP (State Bank of Pakistan) concessionary solar scheme facilitated through partner commercial banks at subsidized markup with 3-7 year tenure.`);
  }

  if (q.includes('address') || q.includes('location') || q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('office') || q.includes('پتہ') || q.includes('نمبر')) {
    snippets.push(`Contact & Office: AT Solar Power Solutions, Bahria Town Phase 6 Road, Police Foundation Block E, Islamabad. Phone/WhatsApp: 0330 0002629. Email: muhammadahmadmuhammadahmad726@gmail.com. Hours: Mon-Sat 9AM-8PM. Owner: Muhammad Ahmad.`);
  }

  if (q.includes('panel') || q.includes('jinko') || q.includes('longi') || q.includes('canadian') || q.includes('ja solar') || q.includes('پینل')) {
    snippets.push(`Tier-1 Panels: We use authentic Jinko Tiger Neo 585W N-Type, Longi Hi-MO 6 580W, Canadian Solar BiHiKu7 665W Bifacial, JA Solar 575W, Trina Solar 695W. All panels have verifiable barcode serial numbers.`);
  }

  if (q.includes('inverter') || q.includes('battery') || q.includes('lithium') || q.includes('growatt') || q.includes('huawei') || q.includes('deye')) {
    snippets.push(`Inverters & Batteries: Growatt, Huawei, Fox ESS, Sungrow, Solis, Deye, Inverex inverters. Lithium LiFePO4 batteries (5.12kWh / 10kWh, 6000+ cycles) and deep-cycle tubular batteries (Phoenix, Osaka).`);
  }

  if (q.includes('visit') || q.includes('survey') || q.includes('سروے')) {
    snippets.push(`Free Site Visit: AT Solar offers 100% free site visits across Islamabad and Rawalpindi. Engineers survey roof space, shading, electrical load, and earthing without any consultation fee.`);
  }

  return snippets.join('\n\n');
}
