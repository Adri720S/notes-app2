class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="loading">
        <p>Loading...</p>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
