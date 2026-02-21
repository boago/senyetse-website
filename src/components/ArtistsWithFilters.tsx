'use client';

import { useState, useMemo, useEffect } from 'react';
import MemberCard from './MemberCard';

const PER_PAGE = 12;

type Artist = {
  id: string;
  name: string;
  preferred_name: string | null;
  gender: string | null;
  voice_category: string | null;
  photo_url: string | null;
  role: string | null;
  committee_name: string | null;
};

type ArtistsWithFiltersProps = {
  artists: Artist[];
};

const VOICE_OPTIONS = ['First Part', 'Second Part', 'Tenor', 'Bass'];
const GENDER_OPTIONS = ['Male', 'Female'];

export default function ArtistsWithFilters({ artists }: ArtistsWithFiltersProps) {
  const [voiceFilter, setVoiceFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [page, setPage] = useState(1);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesVoice = voiceFilter === 'all' || artist.voice_category === voiceFilter;
      const matchesGender = genderFilter === 'all' || artist.gender === genderFilter;
      return matchesVoice && matchesGender;
    });
  }, [artists, voiceFilter, genderFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArtists.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const paginatedArtists = useMemo(
    () => filteredArtists.slice(start, start + PER_PAGE),
    [filteredArtists, start]
  );

  useEffect(() => setPage(1), [voiceFilter, genderFilter]);
  useEffect(() => setPage((p) => Math.min(p, totalPages)), [totalPages]);

  const voiceOptions = useMemo(() => {
    const used = new Set(artists.map((a) => a.voice_category).filter(Boolean));
    return VOICE_OPTIONS.filter((v) => used.has(v));
  }, [artists]);

  const genderOptions = useMemo(() => {
    const used = new Set(artists.map((a) => a.gender).filter(Boolean));
    return GENDER_OPTIONS.filter((g) => used.has(g));
  }, [artists]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 p-4 bg-white/60 rounded-xl border border-senyetse-gold/20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-senyetse-earth">Voice:</span>
          <select
            value={voiceFilter}
            onChange={(e) => setVoiceFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-senyetse-gold/30 bg-white text-senyetse-dark font-medium focus:ring-2 focus:ring-senyetse-gold/40"
          >
            <option value="all">All</option>
            {voiceOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-senyetse-earth">Gender:</span>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-senyetse-gold/30 bg-white text-senyetse-dark font-medium focus:ring-2 focus:ring-senyetse-gold/40"
          >
            <option value="all">All</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        {(voiceFilter !== 'all' || genderFilter !== 'all') && (
          <button
            onClick={() => {
              setVoiceFilter('all');
              setGenderFilter('all');
            }}
            className="text-sm text-senyetse-gold hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-center text-senyetse-earth/70 text-sm mb-6">
        {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
        {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
      </p>

      {/* Grid */}
      {filteredArtists.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArtists.map((member) => (
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
        </>
      ) : (
        <p className="text-center text-senyetse-earth/70 py-12">
          No artists match the selected filters.
        </p>
      )}
    </div>
  );
}
