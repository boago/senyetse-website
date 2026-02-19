'use client';

import { useState, useMemo } from 'react';
import MemberCard from './MemberCard';

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

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesVoice = voiceFilter === 'all' || artist.voice_category === voiceFilter;
      const matchesGender = genderFilter === 'all' || artist.gender === genderFilter;
      return matchesVoice && matchesGender;
    });
  }, [artists, voiceFilter, genderFilter]);

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
      </p>

      {/* Grid */}
      {filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <p className="text-center text-senyetse-earth/70 py-12">
          No artists match the selected filters.
        </p>
      )}
    </div>
  );
}
