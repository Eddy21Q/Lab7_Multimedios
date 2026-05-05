class TopicPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._topic = null;
  }

  set topic(value) {
    this._topic = value;
    this.render();
  }

  get topic() {
    return this._topic;
  }

  render() {
    if (!this._topic) {
      this.shadowRoot.innerHTML = `<p>Selecciona un tema.</p>`;
      return;
    }

    const t = this._topic;

    const highlights = Array.isArray(t.highlights) ? t.highlights : [];

    this.shadowRoot.innerHTML = `
      <style>
        iframe {
          width: 100%;
          height: 300px;
          border: none;
          border-radius: 8px;
        }

        .highlight {
          padding: 0.3rem 0.6rem;
          border: 1px solid #6366f1;
          border-radius: 999px;
          cursor: pointer;
          margin-right: 0.3rem;
          font-size: 0.75rem;
          background: transparent;
          color: white;
        }

        .highlight:hover {
          border-color: #ec4899;
        }
      </style>

      <h2>${t.label ?? "Sin título"}</h2>

      <iframe
        src="https://www.youtube.com/embed/${t.youtubeId ?? ""}"
        allowfullscreen
      ></iframe>

      <h3>Highlights</h3>
      <div>
        ${
          highlights.length > 0
            ? highlights
                .map(
                  (h) => `
                    <button class="highlight" data-time="${h.time ?? 0}">
                      ${h.label ?? "Sin etiqueta"}
                    </button>
                  `
                )
                .join("")
            : "<p>No hay highlights.</p>"
        }
      </div>
    `;

    const iframe = this.shadowRoot.querySelector("iframe");

    this.shadowRoot.querySelectorAll(".highlight").forEach((btn) => {
      btn.addEventListener("click", () => {
        const time = Number(btn.getAttribute("data-time") || 0);

        iframe.src = `https://www.youtube.com/embed/${t.youtubeId}?start=${time}`;
      });
    });
  }
}

customElements.define("topic-panel", TopicPanel);