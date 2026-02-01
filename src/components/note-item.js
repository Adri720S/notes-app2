import Swal from 'sweetalert2';
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../api.js';

class NoteItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async handleDelete() {
    const result = await Swal.fire({
      title: 'Hapus catatan?',
      text: 'Catatan yang dihapus tidak dapat dikembalikan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteNote(this.getAttribute('id'));

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Catatan berhasil dihapus',
        timer: 1200,
        showConfirmButton: false,
      });

      document.dispatchEvent(new Event('note-updated'));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message,
      });
    }
  }

  async handleArchive() {
    const isArchived = this.getAttribute('archived') === 'true';

    try {
      if (isArchived) {
        await unarchiveNote(this.getAttribute('id'));
      } else {
        await archiveNote(this.getAttribute('id'));
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: isArchived
          ? 'Catatan dikembalikan'
          : 'Catatan diarsipkan',
        timer: 1200,
        showConfirmButton: false,
      });

      document.dispatchEvent(new Event('note-updated'));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message,
      });
    }
  }

  render() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const date = new Date(this.getAttribute('date')).toLocaleDateString();
    const archived = this.getAttribute('archived') === 'true';

    this.innerHTML = `
      <div class="note-item fade-in">
        <h3>${title}</h3>
        <p>${body}</p>
        <small>${date}</small>

        <div class="actions">
          <button class="archive" title="Archive">
            <i class="fa-solid ${archived ? 'fa-box-open' : 'fa-box-archive'}"></i>
          </button>

          <button class="delete" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    this.querySelector('.delete')
      .addEventListener('click', () => this.handleDelete());

    this.querySelector('.archive')
      .addEventListener('click', () => this.handleArchive());
  }
}

customElements.define('note-item', NoteItem);

