import { LightningElement, api } from 'lwc';

export default class TreeNode extends LightningElement {
  _item;
  _expanded = false;

  @api renderer;
  @api depth = 1;

  @api
  get item() {
    return this._item;
  }

  set item(value) {
    this._item = value || {};
    this._expanded = this._item.expanded === true;
  }

  get children() {
    return Array.isArray(this._item?.items) ? this._item.items : [];
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  get isExpanded() {
    return this._expanded;
  }

  get ariaExpanded() {
    return this.hasChildren ? String(this.isExpanded) : undefined;
  }

  get childDepth() {
    return Number(this.depth) + 1;
  }

  get toggleIcon() {
    return this.isExpanded ? '▾' : '▸';
  }

  get rendererProps() {
    return {
      node: this.item,
      depth: Number(this.depth),
      hasChildren: this.hasChildren,
      expanded: this.isExpanded
    };
  }

  handleToggle(event) {
    event.stopPropagation();
    this._expanded = !this._expanded;

    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: {
          item: this.item,
          name: this.item.name,
          expanded: this.isExpanded
        },
        bubbles: false,
        composed: false
      })
    );
  }

  handleSelect() {
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: {
          item: this.item,
          name: this.item.name
        },
        bubbles: false,
        composed: false
      })
    );
  }

  handleRendererAction(event) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('action', {
        detail: {
          item: this.item,
          name: this.item.name,
          action: event.detail
        },
        bubbles: false,
        composed: false
      })
    );
  }

  handleChildAction(event) {
    this.dispatchEvent(
      new CustomEvent('action', {
        detail: event.detail,
        bubbles: false,
        composed: false
      })
    );
  }
}
