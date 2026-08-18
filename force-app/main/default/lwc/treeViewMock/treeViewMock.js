import { LightningElement } from 'lwc';
import TreeNodeRenderer from 'c/treeNodeRenderer';

const items = [
  {
    name: 'sales',
    label: 'Vendas',
    description: 'Estrutura comercial',
    expanded: true,
    items: [
      {
        name: 'north-region',
        label: 'Região Norte',
        description: '12 contas ativas',
        expanded: true,
        items: [
          {
            name: 'amazon-account',
            label: 'Conta Amazonas',
            description: 'Cliente estratégico',
            items: []
          },
          {
            name: 'para-account',
            label: 'Conta Pará',
            description: 'Em prospecção',
            items: []
          }
        ]
      },
      {
        name: 'south-region',
        label: 'Região Sul',
        description: '8 contas ativas',
        items: [
          {
            name: 'santa-catarina-account',
            label: 'Conta Santa Catarina',
            description: 'Cliente ativo',
            items: []
          }
        ]
      }
    ]
  },
  {
    name: 'support',
    label: 'Atendimento',
    description: 'Fila de suporte',
    items: [
      {
        name: 'open-cases',
        label: 'Casos abertos',
        description: '5 casos aguardando atendimento',
        items: []
      },
      {
        name: 'priority-cases',
        label: 'Casos prioritários',
        description: '2 casos críticos',
        items: []
      }
    ]
  }
];

export default class TreeViewMock extends LightningElement {
  treeItems = items;
  treeRenderer = TreeNodeRenderer;
  selectedLabel = 'Nenhum item selecionado';
  lastAction = 'Nenhuma ação executada';

  handleSelect(event) {
    this.selectedLabel = event.detail.item.label;
  }

  handleToggle(event) {
    const state = event.detail.expanded ? 'expandido' : 'recolhido';
    this.lastAction = `${event.detail.item.label} ${state}`;
  }

  handleAction(event) {
    this.lastAction = `Ação em ${event.detail.item.label}`;
  }
}
