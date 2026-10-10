import React from 'react';
import { Link } from 'react-router-dom';

/** Small logo only — header / footer. Never large. */
export default function BrandLogo({ to = '/' }) {
  const img = (
    <img
      src="/images/logo.png"
      alt="AT Solar"
      width={140}
      height={40}
      style={{
        height: '36px',
        width: 'auto',
        maxWidth: '140px',
        maxHeight: '36px',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );

  if (to === false) return img;

  return (
    <Link
      to={to}
      className="inline-flex shrink-0 items-center"
      aria-label="AT Solar home"
      style={{ maxWidth: 140 }}
    >
      {img}
    </Link>
  );
}
