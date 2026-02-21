'use client';

import { useState } from 'react';

type MemberCardProps = {
  id: string;
  name: string;
  preferred_name: string | null;
  gender: string | null;
  voice_category: string | null;
  photo_url: string | null;
  role: string | null;
  committee_name: string | null;
  category?: string;
};

export default function MemberCard({ member }: { member: MemberCardProps }) {
  const displayName = member.preferred_name || member.name;
  const [imgError, setImgError] = useState(false);
  const showImg = member.photo_url && !imgError;
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-senyetse-gold/20 text-center">
      <div className="aspect-square relative bg-senyetse-cream">
        {showImg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={member.photo_url!}
            alt={displayName}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-senyetse-earth/30 text-4xl font-display">
            {displayName.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-display font-bold text-senyetse-dark mb-1">
          {displayName}
        </h2>
        {member.role && (
          <p className="text-senyetse-gold font-semibold text-sm mb-2">{member.role}</p>
        )}
        {member.name !== displayName && !member.role && (
          <p className="text-senyetse-earth/60 text-xs mb-2">{member.name}</p>
        )}
        <div className="space-y-1 text-sm">
          {member.gender && (
            <p className="text-senyetse-earth/70">Gender: {member.gender}</p>
          )}
          {member.voice_category && member.category !== 'committee' && (
            <p className="text-senyetse-gold font-medium">Voice: {member.voice_category}</p>
          )}
        </div>
      </div>
    </article>
  );
}
