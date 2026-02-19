'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Member = {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  preferred_name: string | null;
  voice_category: string | null;
  photo_url: string | null;
  category: 'committee' | 'artists' | 'supporting_staff';
  display_order: number;
};

export default function AdminMembersPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
  const [preferredName, setPreferredName] = useState('');
  const [voiceCategory, setVoiceCategory] = useState('');
  const [category, setCategory] = useState<'committee' | 'artists' | 'supporting_staff'>('artists');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [editName, setEditName] = useState('');
  const [editPreferredName, setEditPreferredName] = useState('');
  const [editGender, setEditGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
  const [editVoiceCategory, setEditVoiceCategory] = useState('');
  const [editCategory, setEditCategory] = useState<'committee' | 'artists' | 'supporting_staff'>('artists');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin');
        return;
      }
      loadMembers();
    });
  }, [router]);

  async function loadMembers() {
    try {
      const { data } = await supabase.from('choir_members').select('*').order('display_order', { ascending: true });
      setItems(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) {
      alert('Please enter a name');
      return;
    }
    setUploading(true);
    try {
      let photoUrl = null;
      if (file) {
        const ext = file.name.split('.').pop();
        const fileName = `member-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
      }

      await supabase.from('choir_members').insert({
        name,
        gender: gender || null,
        preferred_name: preferredName || null,
        voice_category: voiceCategory || null,
        photo_url: photoUrl,
        category,
        display_order: items.length,
      });

      setName('');
      setGender('');
      setPreferredName('');
      setVoiceCategory('');
      setCategory('artists');
      setFile(null);
      loadMembers();
    } catch (err) {
      console.error(err);
      alert('Failed to add member');
    } finally {
      setUploading(false);
    }
  }

  function openEdit(item: Member) {
    setEditing(item);
    setEditName(item.name);
    setEditPreferredName(item.preferred_name || '');
    setEditGender((item.gender as 'Male' | 'Female' | 'Other') || '');
    setEditVoiceCategory(item.voice_category || '');
    setEditCategory(item.category);
    setEditFile(null);
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSavingEdit(true);
    try {
      let photoUrl = editing.photo_url;
      if (editFile) {
        const ext = editFile.name.split('.').pop();
        const fileName = `member-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, editFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
      }
      await supabase
        .from('choir_members')
        .update({
          name: editName,
          preferred_name: editPreferredName || null,
          gender: editGender || null,
          voice_category: editVoiceCategory || null,
          category: editCategory,
          ...(photoUrl && { photo_url: photoUrl }),
        })
        .eq('id', editing.id);
      setEditing(null);
      loadMembers();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this member?')) return;
    try {
      await supabase.from('choir_members').delete().eq('id', id);
      loadMembers();
    } catch (e) {
      console.error(e);
      alert('Failed to delete');
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-senyetse-earth/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/admin/dashboard" className="text-senyetse-gold hover:underline mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-display font-bold text-senyetse-dark mb-8">Manage Choir Members</h1>

      <form onSubmit={handleSubmit} className="mb-12 p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20">
        <h2 className="text-lg font-bold text-senyetse-dark mb-4">Add Member</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'committee' | 'artists' | 'supporting_staff')}
              required
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            >
              <option value="committee">Committee</option>
              <option value="artists">Artists</option>
              <option value="supporting_staff">Supporting Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full name"
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Preferred Name</label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              placeholder="Name to display (if different)"
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other' | '')}
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Voice Category</label>
            <input
              type="text"
              value={voiceCategory}
              onChange={(e) => setVoiceCategory(e.target.value)}
              placeholder="e.g. Soprano, Alto, Tenor, Bass"
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-senyetse-gold text-senyetse-dark rounded-lg hover:bg-senyetse-terracotta disabled:opacity-50"
          >
            {uploading ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </form>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-senyetse-dark mb-4">Edit Member</h2>
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Category *</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as 'committee' | 'artists' | 'supporting_staff')}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  >
                    <option value="committee">Committee</option>
                    <option value="artists">Artists</option>
                    <option value="supporting_staff">Supporting Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Name *</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Preferred Name</label>
                  <input
                    type="text"
                    value={editPreferredName}
                    onChange={(e) => setEditPreferredName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value as 'Male' | 'Female' | 'Other' | '')}
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Voice Category</label>
                  <input
                    type="text"
                    value={editVoiceCategory}
                    onChange={(e) => setEditVoiceCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">New Photo (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                    className="w-full text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="px-4 py-2 bg-senyetse-gold text-senyetse-dark rounded-lg hover:bg-senyetse-terracotta disabled:opacity-50"
                  >
                    {savingEdit ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-4 py-2 border border-senyetse-earth/30 rounded-lg hover:bg-senyetse-cream"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-lg font-bold text-senyetse-dark mb-4">All Members ({items.length})</h2>
      
      {['committee', 'artists', 'supporting_staff'].map((cat) => {
        const categoryItems = items.filter((item) => item.category === cat);
        if (categoryItems.length === 0) return null;
        return (
          <div key={cat} className="mb-8">
            <h3 className="text-md font-bold text-senyetse-dark mb-4 capitalize">
              {cat === 'supporting_staff' ? 'Supporting Staff' : cat} ({categoryItems.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryItems.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-xl shadow border border-senyetse-gold/20">
                  <div className="flex items-start gap-4">
                    {item.photo_url ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-senyetse-cream">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-senyetse-cream flex items-center justify-center text-senyetse-earth/30 font-display text-xl">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-senyetse-dark">{item.preferred_name || item.name}</h3>
                      {item.name !== item.preferred_name && item.preferred_name && (
                        <p className="text-xs text-senyetse-earth/60">{item.name}</p>
                      )}
                      <div className="text-sm space-y-1 mt-1">
                        {item.gender && <p className="text-senyetse-earth/70">Gender: {item.gender}</p>}
                        {item.voice_category && <p className="text-senyetse-gold">Voice: {item.voice_category}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="px-3 py-1 text-sm text-senyetse-gold hover:bg-senyetse-gold/10 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {items.length === 0 && (
        <p className="text-center text-senyetse-earth/70 py-8">No members yet. Add your first member above.</p>
      )}
    </div>
  );
}
