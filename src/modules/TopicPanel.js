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
      this.shadowRoot.innerHTML = `<p style="color: white;">Selecciona un tema.</p>`;
      return;
    }

    const t = this._topic;

    const highlights = Array.isArray(t.highlights) ? t.highlights : [];

    this.shadowRoot.innerHTML = `

      <style>
        h2 {
          color: white;
        }

        iframe {
          width: 100%;
          height: 320px;
          border: 2px solid #6366f1;
          border-radius: 10px;
        }

        .highlight {
          padding: 0.4rem 0.7rem;
          border: 1px solid #6366f1;
          border-radius: 999px;
          cursor: pointer;
          margin-right: 0.2rem;
          font-size: 0.75rem;
          background: transparent;
          color: white;
        }

        .highlight:hover {
          border-color: #ec4899;
        }
      </style>

      <h2>${t.icon} ${t.label}</h2>

      <iframe
        src="https://www.youtube.com/embed/${t.youtubeId}"></iframe>
        

      <h3 style="color: white;">Highlights</h3>
      <div>
        ${
          (t.highlights || [])
                .map(
                  (h) => `
                    <button class="highlight" data-time="${h.time}">
                      ${h.label}
                    </button>
                  `
                )
                .join("")}
        
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