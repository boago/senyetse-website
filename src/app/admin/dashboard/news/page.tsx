'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
};

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin');
        return;
      }
      loadNews();
    });
  }, [router]);

  async function loadNews() {
    try {
      const { data } = await supabase.from('news').select('*').order('published_at', { ascending: false });
      setItems(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in title and content');
      return;
    }
    setUploading(true);
    try {
      let imageUrl = null;
      if (file) {
        const ext = file.name.split('.').pop();
        const fileName = `news-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      await supabase.from('news').insert({
        title,
        content,
        image_url: imageUrl,
        published_at: new Date().toISOString(),
      });

      setTitle('');
      setContent('');
      setFile(null);
      loadNews();
    } catch (err) {
      console.error(err);
      alert('Failed to add news');
    } finally {
      setUploading(false);
    }
  }

  function openEdit(item: NewsItem) {
    setEditing(item);
    setEditTitle(item.title);
    setEditContent(item.content);
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
        const fileName = `news-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, editFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
      await supabase
        .from('news')
        .update({
          title: editTitle,
          content: editContent,
          ...(imageUrl && { image_url: imageUrl }),
        })
        .eq('id', editing.id);
      setEditing(null);
      loadNews();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this news item?')) return;
    try {
      await supabase.from('news').delete().eq('id', id);
      loadNews();
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

      <h1 className="text-2xl font-display font-bold text-senyetse-dark mb-8">Manage News</h1>

      <form onSubmit={handleSubmit} className="mb-12 p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20">
        <h2 className="text-lg font-bold text-senyetse-dark mb-4">Add News</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Story *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              placeholder="Write the full news story here..."
              className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
            />
            <p className="text-xs text-senyetse-earth/60 mt-1">This will be shown when users click on the news card.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-senyetse-dark mb-1">Image (optional)</label>
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
            {uploading ? 'Adding...' : 'Add News'}
          </button>
        </div>
      </form>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-senyetse-dark mb-4">Edit News</h2>
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
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">Story *</label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    required
                    rows={8}
                    className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-senyetse-dark mb-1">New Image (optional, leave empty to keep current)</label>
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

      <h2 className="text-lg font-bold text-senyetse-dark mb-4">All News ({items.length})</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-xl shadow border border-senyetse-gold/20">
            <div className="flex items-start gap-4">
              {item.image_url && (
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-senyetse-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-senyetse-dark">{item.title}</h3>
                <p className="text-sm text-senyetse-earth/70 mt-1 line-clamp-2">{item.content}</p>
                <p className="text-xs text-senyetse-earth/60 mt-2">
                  {new Date(item.published_at).toLocaleDateString()}
                </p>
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
