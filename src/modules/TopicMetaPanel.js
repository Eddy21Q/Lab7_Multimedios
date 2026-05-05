class TopicMetaPanel extends HTMLElement {
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

    const chapters = Array.isArray(t.chapters) ? t.chapters : [];

    this.shadowRoot.innerHTML = `
      <style>
        .chapter {
          border: 1px solid #6366f1;
          padding: 0.5rem;
          border-radius: 6px;
          margin-bottom: 0.4rem;
          cursor: pointer;
          transition: 0.15s;
        }

        .chapter:hover {
          border-color: #ec4899;
          transform: translateY(-1px);
        }
      </style>

      <h3>Descripción</h3>
      <p>${t.description ?? "Sin descripción"}</p>

      <h3>Capítulos</h3>
      ${
        chapters.length > 0
          ? chapters
              .map(
                (c) => `
                  <div class="chapter" data-start="${c.start ?? 0}" data-id="${c.youtubeId ?? ""}">
                    <strong>${c.title ?? "Sin título"}</strong><br>
                    <small>${c.duration ?? ""}</small>
                  </div>
                `
              )
              .join("")
          : "<p>No hay capítulos.</p>"
      }
    `;

    this.shadowRoot.querySelectorAll(".chapter").forEach((c) => {
      c.addEventListener("click", () => {
        const start = Number(c.getAttribute("data-start") || 0);
        const id = c.getAttribute("data-id");

        this.dispatchEvent(new CustomEvent("chapter-selected", {
          bubbles: true,
          composed: true,
          detail: { start, id }
        }));
      });
    });
  }
}

customElements.define("topic-meta-panel", TopicMetaPanel);