'use client';

import { useState } from 'react';
import MemberCard from './MemberCard';

const PER_PAGE = 12;

type Member = {
  id: string;
  name: string;
  preferred_name: string | null;
  gender: string | null;
  voice_category: string | null;
  photo_url: string | null;
  role: string | null;
  committee_name: string | null;
};

type SupportingStaffGridProps = {
  members: Member[];
};

export default function SupportingStaffGrid({ members }: SupportingStaffGridProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(members.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const slice = members.slice(start, start + PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-center text-senyetse-earth/70 text-sm mb-6">
        {members.length} member{members.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {slice.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-senyetse-gold/30 bg-white text-senyetse-dark font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-senyetse-gold/10 transition"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-senyetse-earth/80 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-senyetse-gold/30 bg-white text-senyetse-dark font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-senyetse-gold/10 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
