class SkillGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._course = null;
  }

  set course(value) {
    this._course = value;
    this.render();
  }

  get course() {
    return this._course;
  }

  render() {
    if (!this._course || !this._course.phases) return;

    this.shadowRoot.innerHTML = `
      <style>
        .phase {
          margin-bottom: 1rem;
        }
        .title {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-bottom: 0.4rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 0.4rem;
        }
      </style>

      <div class="wrapper"></div>
    `;

    const wrapper = this.shadowRoot.querySelector(".wrapper");

    this._course.phases.forEach((phase) => {
      const block = document.createElement("div");
      block.className = "phase";

      const title = document.createElement("div");
      title.className = "title";
      title.textContent = phase.name;

      const grid = document.createElement("div");
      grid.className = "grid";

      phase.topics.forEach((topic) => {
        const node = document.createElement("skill-node");

        node.topic = topic;

        node.addEventListener("click", () => {
          this.dispatchEvent(new CustomEvent("topic-selected", {
            bubbles: true,
            composed: true,
            detail: { topic }
          }));
        });

        grid.appendChild(node);
      });

      block.appendChild(title);
      block.appendChild(grid);
      wrapper.appendChild(block);
    });
  }
}

customElements.define("skill-grid", SkillGrid);