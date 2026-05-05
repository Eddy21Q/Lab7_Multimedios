import { COURSE_DATA } from "./data.js";

class CourseApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100vh;
        }
        .sidebar {
          width: 320px;
          background: #0b0f1f;
          border-right: 1px solid #1f2937;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .main {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }
      </style>

      <div class="sidebar">
        <skill-grid></skill-grid>
      </div>

      <div class="main">
        <topic-panel></topic-panel>
        <topic-meta-panel></topic-meta-panel>
      </div>
    `;
  }

  init() {
    const grid = this.shadowRoot.querySelector("skill-grid");
    const topicPanel = this.shadowRoot.querySelector("topic-panel");
    const metaPanel = this.shadowRoot.querySelector("topic-meta-panel");

    if (!grid || !topicPanel || !metaPanel) {
      console.error("Componentes no registrados todavía");
      return;
    }

    grid.course = COURSE_DATA;

    grid.addEventListener("topic-selected", (ev) => {
      const topic = ev.detail.topic;

      if (topicPanel) topicPanel.topic = topic;
      if (metaPanel) metaPanel.topic = topic;
    });
  }
}

customElements.define("course-app", CourseApp);