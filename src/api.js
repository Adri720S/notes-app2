const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  if (!response.ok) throw new Error('Gagal mengambil catatan');
  const result = await response.json();
  return result.data;
}

export async function addNote(title, body) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });

  if (!response.ok) throw new Error('Gagal menambah catatan');
}

export async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Gagal menghapus catatan');
}

export async function archiveNote(id) {
  await fetch(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
}

export async function unarchiveNote(id) {
  await fetch(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
}

export async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  if (!response.ok) throw new Error('Gagal mengambil arsip');
  const result = await response.json();
  return result.data;
}
