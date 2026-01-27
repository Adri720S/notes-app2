import './style.css';
import './components/app-bar.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/loading-indicator.js';

import Swal from 'sweetalert2';

import {
  getNotes,
  getArchivedNotes,
  addNote,
} from './api.js';

const activeContainer = document.querySelector('#notes');
const archivedContainer = document.querySelector('#archivedNotes');

/* =======================
   RENDER SEMUA CATATAN
======================= */
async function renderAllNotes() {
  activeContainer.innerHTML = '<loading-indicator></loading-indicator>';
  archivedContainer.innerHTML = '<loading-indicator></loading-indicator>';

  try {
    const activeNotes = await getNotes();
    const archivedNotes = await getArchivedNotes();

    activeContainer.innerHTML = '';
    archivedContainer.innerHTML = '';

    activeNotes.forEach((note) =>
      renderNote(note, activeContainer)
    );

    archivedNotes.forEach((note) =>
      renderNote(note, archivedContainer)
    );
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal memuat catatan',
      text: error.message,
    });
  }
}

/* =======================
   RENDER SATU NOTE
======================= */
function renderNote(note, container) {
  const noteEl = document.createElement('note-item');
  noteEl.setAttribute('id', note.id);
  noteEl.setAttribute('title', note.title);
  noteEl.setAttribute('body', note.body);
  noteEl.setAttribute('date', note.createdAt);
  noteEl.setAttribute('archived', note.archived);

  container.appendChild(noteEl);
}

/* =======================
   EVENT: TAMBAH NOTE
======================= */
document.addEventListener('note-added', async (event) => {
  const { title, body } = event.detail;

  try {
    await addNote(title, body);
    await renderAllNotes();

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Catatan berhasil ditambahkan',
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal menambahkan catatan',
      text: error.message,
    });
  }
});

/* =======================
   FIRST LOAD
======================= */
renderAllNotes();
