import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lifegame-dom")
export class LifeGameDOM extends LitElement {
	@property({ type: Object })
	protected render(): unknown {
		return html`
      <canvas>
    `;
	}
}
