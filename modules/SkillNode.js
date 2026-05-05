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
          transition: 0.15s;
        }

        button:hover {
          border-color: #ec4899;
          transform: translateY(-2px);
        }

        .icon {
          font-size: 1rem;
        }
      </style>

      <button>
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