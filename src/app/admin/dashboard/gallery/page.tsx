'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin');
        return;
      }
      loadGallery();
    });
  }, [router]);

  async function loadGallery() {
    try {
      const { data } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
      setItems(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) {
      alert('Please add a title and select an image');
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);

      await supabase.from('gallery').insert({
        title,
        description: description || null,
        image_url: urlData.publicUrl,
        display_order: items.length,
      });

      setTitle('');
      setDescription('');
      setFile(null);
      loadGallery();
    } catch (err) {
      console.error(err);
      alert('Upload failed. Make sure the "gallery" storage bucket exists in Supabase.');
    } finally {
      setUploading(false);
    }
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
    setEditFile(null);
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSavingEdit(true);
    try {
      let imageUrl = editing.image_url;
      if (editFile) {
        const ext = editFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, editFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
      await supabase
        .from('gallery')
        .update({
          title: editTitle,
          description: editDescription || null,
          ...(imageUrl && { image_url: imageUrl }),
        })
        .eq('id', editing.id);
      setEditing(null);
      loadGallery();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this image?')) return;
    try {
      await supabase.from('gallery').delete().eq('id', id);
      loadGallery();
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

      <h1 className="text-2xl font-display font-bold text-senyetse-dark mb-8">
        Manage Gallery
      </h1>

      <form onSubmit={handleUpload} className="mb-12 p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20">
        <h2 className="text-lg font-bold text-senyetse-dark mb-4">Add New Image</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
              placeholder="e.g. Performance at Village Festival"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-senyetse-gold text-senyetse-dark rounded-lg hover:bg-senyetse-terracotta disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Add to Gallery'}
          </button>
        </div>
      </form>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6">
              <h2 className="text-lg font-bold text-senyetse-dark mb-4">Edit Image</h2>
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Title *</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Description</label>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">New Image (optional)</label>
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

      <h2 className="text-lg font-bold text-senyetse-dark mb-4">Current Images ({items.length})</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border border-senyetse-gold/20"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-senyetse-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-senyetse-dark truncate">{item.title}</p>
              {item.description && (
                <p className="text-sm text-senyetse-earth/70 truncate">{item.description}</p>
              )}
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
        ))}
      </div>
    </div>
  );
}
