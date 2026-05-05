class SkillNode extends HTMLElement {
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
    const t = this._topic;
    if (!t) return;

    this.shadowRoot.innerHTML = `
      <style>
        button {
          width: 70px;
          height: 70px;
          border-radius: 4px;
          background: #111827;
          border: 1px solid #6366f1;
          color: white;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.7rem;
          transition: 0.2s;
          position: relative;
        }

        button:hover {
          transform: scale(1.05);
          border-color: #ec4899;
        }

        .icon {
          font-size: 1.25rem;
        }

        .badge {
        position: absolute;
        top: 4px;
        right: 4px;
        font-size: 0.6rem;
        background: #22c55e;
        padding: 2px 4px;
        border-radius: 4px;
        }
      </style>

      <button>
        <div class="badge">${t.difficulty ?? "B"}</div>
        <div class="icon">${t.icon ?? "📘"}</div>
        <div>${t.label ?? "Sin título"}</div>
      </button>
    `;

    const btn = this.shadowRoot.querySelector("button");

    btn.onclick = () => {
      this.dispatchEvent(new CustomEvent("click", {
        bubbles: true,
        composed: true,
        detail: this._topic
      }));
    };
  }
}

customElements.define("skill-node", SkillNode);