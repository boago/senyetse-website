'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MembersDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href="/members" className="block hover:text-senyetse-gold transition">
        Members
      </Link>
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 min-w-[180px] z-50">
          <div className="bg-senyetse-dark rounded-lg shadow-xl py-2">
            <Link
              href="/members?category=committee"
              className="block px-4 py-2 hover:bg-senyetse-gold/20 hover:text-senyetse-gold transition"
            >
              Committee
            </Link>
            <Link
              href="/members?category=artists"
              className="block px-4 py-2 hover:bg-senyetse-gold/20 hover:text-senyetse-gold transition"
            >
              Artists
            </Link>
            <Link
              href="/members?category=supporting_staff"
              className="block px-4 py-2 hover:bg-senyetse-gold/20 hover:text-senyetse-gold transition"
            >
              Supporting Staff
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}
