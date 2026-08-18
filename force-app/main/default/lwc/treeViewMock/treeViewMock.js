import { LightningElement } from 'lwc';
import TreeNodeRenderer from 'c/treeNodeRenderer';

const items = [
  {
    name: 'sales',
    label: 'Vendas',
    description: 'Estrutura comercial',
    owner: 'Diretoria comercial',
    status: 'Grupo',
    expanded: true,
    items: [
      {
        name: 'north-region',
        label: 'Região Norte',
        description: '12 contas ativas',
        owner: 'Maria Santos',
        status: 'Grupo',
        expanded: true,
        items: [
          {
            name: 'amazon-account',
            label: 'Conta Amazonas',
            description: 'Cliente estratégico',
            owner: 'João Silva',
            status: 'Ativo',
            items: []
          },
          {
            name: 'para-account',
            label: 'Conta Pará',
            description: 'Em prospecção',
            owner: 'Ana Costa',
            status: 'Prospecção',
            items: [
              {
                name: 'para-contact-1',
                label: 'Contact Pará',
                description: 'Olá, como posso ajudar?',
                owner: 'Mariana Costa',
                status: 'Prospecção',
                items: []
              }
            ]
          }
        ]
      },
      {
        name: 'south-region',
        label: 'Região Sul',
        description: '8 contas ativas',
        owner: 'Carlos Oliveira',
        status: 'Grupo',
        items: [
          {
            name: 'santa-catarina-account',
            label: 'Conta Santa Catarina',
            description: 'Cliente ativo',
            owner: 'Fernanda Lima',
            status: 'Ativo',
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
    owner: 'Central de atendimento',
    status: 'Grupo',
    items: [
      {
        name: 'open-cases',
        label: 'Casos abertos',
        description: '5 casos aguardando atendimento',
        owner: 'Equipe de suporte',
        status: 'Pendente',
        items: []
      },
      {
        name: 'priority-cases',
        label: 'Casos prioritários',
        description: '2 casos críticos',
        owner: 'Núcleo crítico',
        status: 'Prioridade',
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
