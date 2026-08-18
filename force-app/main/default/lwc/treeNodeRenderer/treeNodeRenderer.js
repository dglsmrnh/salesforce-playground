import { LightningElement, api } from 'lwc';

export default class TreeNodeRenderer extends LightningElement {
  @api node;
  @api depth;
  @api hasChildren;
  @api expanded;

  get status() {
    return this.node?.status || (this.hasChildren ? 'Grupo' : 'Ativo');
  }

  get owner() {
    return this.node?.owner || 'Equipe comercial';
  }

  get statusClass() {
    const statusVariants = {
      Ativo: 'active',
      Grupo: 'group',
      Pendente: 'pending',
      Prioridade: 'priority',
      Prospecção: 'prospecting'
    };
    const variant = statusVariants[this.status] || 'default';

    return `status status_${variant}`;
  }

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
