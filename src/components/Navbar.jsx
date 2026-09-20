import React from 'react';

export default function Navbar({ activeItem = "Order's Panel", onLogout }) {
  const navItems = [
    'Product',
    'Brand',
    'Category',
    'Brand Category',
    "Order's Panel",
    'Bar Chart',
    'Buying Guide',
    'Excel',
    'SEO Text',
  ];

  return (
    <header className="bg-black text-white px-5 py-2.5 flex items-center justify-between text-xs tracking-tight font-semibold select-none">
      {/* Brand Logo and Primary Navigation */}
      <div className="flex items-center space-x-6">
        <span className="text-sm font-extrabold tracking-normal">VPLAK</span>
        <nav className="hidden md:flex items-center space-x-4 uppercase text-[11px] font-bold text-gray-200">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`hover:text-white transition-colors ${
                activeItem === item ? 'text-white' : ''
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Right Actions */}
      <div>
        <a
          href="#logout"
          onClick={(e) => {
            if (onLogout) {
              e.preventDefault();
              onLogout();
            }
          }}
          className="text-white font-bold text-xs hover:underline uppercase"
        >
          Logout
        </a>
      </div>
    </header>
  );
}
