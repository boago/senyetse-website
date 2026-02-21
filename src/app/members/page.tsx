import { supabase, hasSupabase } from '@/lib/supabase';
import Link from 'next/link';
import CommitteeTabs from '@/components/CommitteeTabs';
import ArtistsWithFilters from '@/components/ArtistsWithFilters';
import SupportingStaffGrid from '@/components/SupportingStaffGrid';

export const dynamic = 'force-dynamic';

async function getMembers(category?: string) {
  try {
    if (!hasSupabase()) return [];
    let query = supabase.from('choir_members').select('*');
    if (category) {
      query = query.eq('category', category);
    }
    const { data, error } = await query.order('display_order', { ascending: true });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export default async function MembersPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams?.category;
  const members = await getMembers(category);

  const committee = members.filter((m: { category: string }) => m.category === 'committee');
  const artists = members.filter((m: { category: string }) => m.category === 'artists');
  const supportingStaff = members.filter((m: { category: string }) => m.category === 'supporting_staff');

  const executiveCommittee = committee.filter((m: { committee_name: string | null }) => m.committee_name === 'Executive Committee');
  const youthCommittee = committee.filter((m: { committee_name: string | null }) => m.committee_name === 'Youth Committee');
  const fundraisingCommittee = committee.filter((m: { committee_name: string | null }) => m.committee_name === 'Fundraising Committee');

  // No category: show choice of Committee, Artists, or Supporting Staff
  if (!category) {
    return (
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-4 text-center">
          Members
        </h1>
        <p className="text-center text-senyetse-earth/80 mb-12 max-w-xl mx-auto">
          Choose a category to view our choir members.
        </p>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/members?category=committee"
            className="block p-8 rounded-2xl bg-white border-2 border-senyetse-gold/30 hover:border-senyetse-gold hover:shadow-lg text-center transition"
          >
            <span className="text-4xl mb-3 block" aria-hidden>👥</span>
            <h2 className="text-xl font-display font-bold text-senyetse-dark mb-1">Committee</h2>
            <p className="text-sm text-senyetse-earth/70">Executive, Youth, Fundraising</p>
          </Link>
          <Link
            href="/members?category=artists"
            className="block p-8 rounded-2xl bg-white border-2 border-senyetse-gold/30 hover:border-senyetse-gold hover:shadow-lg text-center transition"
          >
            <span className="text-4xl mb-3 block" aria-hidden>♪</span>
            <h2 className="text-xl font-display font-bold text-senyetse-dark mb-1">Artists</h2>
            <p className="text-sm text-senyetse-earth/70">Performers</p>
          </Link>
          <Link
            href="/members?category=supporting_staff"
            className="block p-8 rounded-2xl bg-white border-2 border-senyetse-gold/30 hover:border-senyetse-gold hover:shadow-lg text-center transition"
          >
            <span className="text-4xl mb-3 block" aria-hidden>🤝</span>
            <h2 className="text-xl font-display font-bold text-senyetse-dark mb-1">Supporting Staff</h2>
            <p className="text-sm text-senyetse-earth/70">Behind the scenes</p>
          </Link>
        </div>
      </section>
    );
  }

  const pageTitle =
    category === 'committee' ? 'Committee' :
    category === 'artists' ? 'Our Artists' :
    category === 'supporting_staff' ? 'Supporting Staff' : 'Members';

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-8">
        <Link href="/members" className="text-senyetse-gold hover:underline text-sm font-medium">
          ← Back to Members
        </Link>
      </div>
      <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-12 text-center">
        {pageTitle}
      </h1>

      {category === 'committee' && committee.length > 0 && (
        <CommitteeTabs
          executiveCommittee={executiveCommittee}
          youthCommittee={youthCommittee}
          fundraisingCommittee={fundraisingCommittee}
        />
      )}

      {category === 'artists' && artists.length > 0 && (
        <ArtistsWithFilters artists={artists} />
      )}

      {category === 'artists' && artists.length === 0 && (
        <p className="text-center text-senyetse-earth/70 py-12">No artists yet.</p>
      )}

      {category === 'supporting_staff' && supportingStaff.length > 0 && (
        <SupportingStaffGrid members={supportingStaff} />
      )}

      {category === 'supporting_staff' && supportingStaff.length === 0 && (
        <p className="text-center text-senyetse-earth/70 py-12">No supporting staff yet.</p>
      )}

      {category === 'committee' && committee.length === 0 && (
        <p className="text-center text-senyetse-earth/70 py-12">No committee members yet.</p>
      )}
    </section>
  );
}
