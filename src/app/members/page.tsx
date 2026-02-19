import { supabase, hasSupabase } from '@/lib/supabase';
import CommitteeTabs from '@/components/CommitteeTabs';
import MemberCard from '@/components/MemberCard';
import ArtistsWithFilters from '@/components/ArtistsWithFilters';

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

function getPageTitle(category: string | undefined) {
  if (category === 'committee') return 'Committees';
  if (category === 'artists') return 'Our Artists';
  if (category === 'supporting_staff') return 'Supporting Staff';
  return 'Choir Members';
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
  
  // Group committee members by committee_name
  const executiveCommittee = committee.filter((m: { committee_name: string | null }) => m.committee_name === 'Executive Committee');
  const youthCommittee = committee.filter((m: { committee_name: string | null }) => m.committee_name === 'Youth Committee');
  const fundraisingCommittee = committee.filter((m: { committee_name: string | null }) => m.committee_name === 'Fundraising Committee');

  const pageTitle = getPageTitle(category);

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-12 text-center">
        {pageTitle}
      </h1>
      
      {members.length > 0 ? (
        <div className="max-w-5xl mx-auto space-y-16">
          {(!category || category === 'committee') && committee.length > 0 && (
            <CommitteeTabs
              executiveCommittee={executiveCommittee}
              youthCommittee={youthCommittee}
              fundraisingCommittee={fundraisingCommittee}
            />
          )}

          {(!category || category === 'artists') && artists.length > 0 && (
            <ArtistsWithFilters artists={artists} />
          )}

          {(!category || category === 'supporting_staff') && supportingStaff.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold text-senyetse-dark mb-8 text-center">
                Supporting Staff
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {supportingStaff.map((member: { id: string; name: string; preferred_name: string | null; gender: string | null; voice_category: string | null; photo_url: string | null; role: string | null; committee_name: string | null }) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-senyetse-earth/70 py-12">
          Member profiles coming soon!
        </p>
      )}
    </section>
  );
}
