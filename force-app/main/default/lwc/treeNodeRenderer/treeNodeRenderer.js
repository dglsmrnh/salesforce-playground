import { LightningElement, api } from 'lwc';

export default class TreeNodeRenderer extends LightningElement {
  @api node;
  @api depth;
  @api hasChildren;
  @api expanded;

  handleAction() {
    this.dispatchEvent(
      new CustomEvent('action', {
        detail: { type: 'example-action' },
        bubbles: true,
        composed: true
      })
    );
  }
}
