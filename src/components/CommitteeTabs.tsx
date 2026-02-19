'use client';

import { useState } from 'react';
import MemberCard from './MemberCard';

type CommitteeMember = {
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

type CommitteeTabsProps = {
  executiveCommittee: CommitteeMember[];
  youthCommittee: CommitteeMember[];
  fundraisingCommittee: CommitteeMember[];
};

export default function CommitteeTabs({
  executiveCommittee,
  youthCommittee,
  fundraisingCommittee,
}: CommitteeTabsProps) {
  const [activeTab, setActiveTab] = useState<'executive' | 'youth' | 'fundraising'>('executive');

  const tabs = [
    { id: 'executive' as const, label: 'Executive Committee', count: executiveCommittee.length },
    { id: 'youth' as const, label: 'Youth Committee', count: youthCommittee.length },
    { id: 'fundraising' as const, label: 'Fundraising Committee', count: fundraisingCommittee.length },
  ];

  const getActiveMembers = () => {
    switch (activeTab) {
      case 'executive':
        return executiveCommittee;
      case 'youth':
        return youthCommittee;
      case 'fundraising':
        return fundraisingCommittee;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-senyetse-gold/20 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-senyetse-gold text-senyetse-dark font-bold shadow-md'
                : 'bg-senyetse-cream text-senyetse-earth hover:bg-senyetse-gold/20'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 text-xs ${
                activeTab === tab.id ? 'text-senyetse-dark/70' : 'text-senyetse-earth/60'
              }`}>
                ({tab.count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="min-h-[400px]">
        {getActiveMembers().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {getActiveMembers().map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-center text-senyetse-earth/70 py-12">
            No members in this committee yet.
          </p>
        )}
      </div>
    </div>
  );
}
