class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="noteForm">
        <input type="text" id="title" placeholder="Judul" required />
        <textarea id="body" placeholder="Isi catatan" required></textarea>
        <button type="submit">Tambah</button>
      </form>
    `;

    this.querySelector("#noteForm").addEventListener("submit", (e) => {
      e.preventDefault();

      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;

      this.dispatchEvent(
        new CustomEvent("note-added", {
          detail: { title, body },
          bubbles: true,
        })
      );

      e.target.reset();
    });
  }
}

customElements.define("note-form", NoteForm);
