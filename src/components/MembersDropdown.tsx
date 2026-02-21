'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function MembersDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:text-senyetse-gold transition bg-transparent border-none cursor-pointer text-inherit font-inherit text-sm font-medium p-0"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Members
      </button>
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
