import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lifegame-canvas")
export class LifeGameCanvas extends LitElement {
	@property({ type: Object })
	protected render(): unknown {
		return html`
      <canvas>
    `;
	}
}
