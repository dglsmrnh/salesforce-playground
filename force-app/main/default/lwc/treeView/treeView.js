import { LightningElement, api } from 'lwc';

export default class TreeView extends LightningElement {
  @api items = [];
  @api renderer;

  get treeItems() {
    return Array.isArray(this.items) ? this.items : [];
  }

  handleSelect(event) {
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: event.detail,
        bubbles: true,
        composed: true
      })
    );
  }

  handleToggle(event) {
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: event.detail,
        bubbles: true,
        composed: true
      })
    );
  }

  handleAction(event) {
    this.dispatchEvent(
      new CustomEvent('action', {
        detail: event.detail,
        bubbles: true,
        composed: true
      })
    );
  }
}
