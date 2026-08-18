# Feature: Árvore reutilizável com nós customizados

## Objective

Disponibilizar uma árvore hierárquica reutilizável em LWC na qual a estrutura, a expansão e os eventos sejam controlados por um componente base, enquanto cada contexto possa fornecer um componente customizado para o conteúdo visual de cada nó.

Também deve existir um componente mock exposto no Lightning App Builder para validar visualmente a solução em uma FlexiPage.

## Context

O projeto é Salesforce DX e segue as convenções de LWC definidas em `force-app/main/default/lwc/AGENTS.md`. Não havia componentes LWC existentes nem uma implementação local de árvore.

A solução não usa `lightning-tree`, porque o requisito é permitir que o bloco visual de cada item seja fornecido por um componente customizado.

## Requirements

### FR-01 — Renderização hierárquica

O componente público deve aceitar uma coleção de nós com `name`, `items`, `expanded` e dados adicionais do contexto, renderizando níveis arbitrários de aninhamento.

### FR-02 — Renderer customizado

O consumidor deve fornecer um construtor de componente LWC para renderizar cada nó. O renderer deve receber o nó atual, a profundidade, a existência de filhos e o estado de expansão.

### FR-03 — Expansão e recolhimento

Nós com filhos devem apresentar um controle visual de expansão/recolhimento. A árvore deve manter esse estado localmente e informar o novo estado por evento.

### FR-04 — Eventos públicos

O componente deve expor eventos `select`, `toggle` e `action`, preservando o nó original associado ao evento, inclusive quando a ação vier de um descendente profundo.

### FR-05 — Estrutura acessível básica

A árvore deve usar `role="tree"`, `role="treeitem"`, `role="group"`, `aria-level` e `aria-expanded`. Navegação avançada por teclado não faz parte desta versão.

### FR-06 — Mock visual

Deve existir um componente demonstrativo com dados fixos, renderer customizado, indicador do item selecionado e indicador do último evento recebido.

## Acceptance Criteria

- [x] Nós raiz e filhos são renderizados recursivamente.
- [x] O renderer recebe `node`, `depth`, `hasChildren` e `expanded`.
- [x] Um nó expandido exibe seus filhos; um nó recolhido não os exibe.
- [x] Nós folha não exibem controle de expansão.
- [x] A seleção informa o `name` e o objeto do nó.
- [x] O toggle informa o nó e o estado `expanded` atualizado.
- [x] Ações emitidas pelo renderer chegam ao consumidor com o nó correto.
- [x] O mock está exposto para App Page, Home Page e Record Page.
- [x] Jest, ESLint e Prettier passam para os componentes alterados.

## Technical Design

### Architecture

- `c-tree-view` é a API pública e encaminha `items`, `renderer` e eventos.
- `c-tree-node` é um componente interno recursivo que controla um nó, seus descendentes, a profundidade e o estado de expansão.
- O renderer é instanciado com `<lwc:component lwc:is={renderer}>` e recebe suas propriedades por `lwc:spread`.
- Eventos internos entre nós são tratados em um único nível e redisparados pelo `c-tree-view` como eventos públicos compostos.

### Salesforce Changes

- `force-app/main/default/lwc/treeView`: componente base público para consumo por outros LWCs.
- `force-app/main/default/lwc/treeNode`: componente recursivo interno, com capability `lightning__dynamicComponent`.
- `force-app/main/default/lwc/treeNodeRenderer`: renderer demonstrativo com label, descrição e botão de ação.
- `force-app/main/default/lwc/treeViewMock`: mock exposto no Lightning App Builder para App Page, Home Page e Record Page.
- Nenhuma FlexiPage foi criada ou alterada.

### Data and Transactions

Os dados são fornecidos pelo consumidor e permanecem no cliente. Não há Apex, SOQL, DML, persistência ou transação envolvidos nesta funcionalidade.

### Security

Não há acesso a dados ou autorização introduzidos pela árvore. Componentes consumidores continuam responsáveis por carregar dados e aplicar regras de negócio. O renderer dinâmico deve ser fornecido explicitamente pelo consumidor.

## Implementation Plan

1. Criar `c-tree-view` como componente público com `items` e `renderer`.
2. Criar `c-tree-node` com renderização recursiva, expansão/recolhimento, semântica ARIA e encaminhamento de eventos.
3. Usar a capability `lightning__dynamicComponent` no componente que instancia o renderer.
4. Criar um renderer visual demonstrativo e um mock exposto para inserção em FlexiPages.
5. Adicionar testes Jest para hierarquia, renderer, expansão, seleção, ações e nós folha.
6. Validar com Jest, ESLint e Prettier.

## Validation

- [x] Prettier nos componentes alterados
- [x] ESLint nos arquivos JavaScript dos LWCs
- [x] Jest: 5 testes passando
- [ ] PMD — não aplicável: não houve alteração Apex
- [ ] Apex tests — não aplicável: não houve alteração Apex
- [ ] SonarQube — não solicitado e sem análise necessária para esta alteração

## Decisions

### Componente base separado do renderer

A árvore controla a estrutura e a interação, enquanto o renderer controla a apresentação. Isso permite reutilizar a mesma árvore em contextos com layouts diferentes sem duplicar a recursão.

### Um renderer por instância

A primeira versão recebe um renderer por instância da árvore. Um registry `type → renderer` para variar o componente por nó foi deixado fora do escopo inicial.

### Eventos internos não borbulham entre todos os ancestrais

Os nós recursivos encaminham eventos em um único nível para evitar duplicação e preservar o nó de origem das ações profundas. O `c-tree-view` é a fronteira de eventos públicos.

### Expansão por mouse na primeira versão

A implementação inclui semântica ARIA e controle visual de expansão, mas não implementa a navegação completa por teclado disponível no `lightning-tree`.

## Out of Scope

- Criação ou alteração de FlexiPages.
- Busca ou carregamento de dados via Apex.
- Persistência do estado de expansão.
- Registry de renderers diferentes por tipo de nó.
- Navegação avançada por teclado.
- Regras de negócio dentro dos componentes de árvore.

## Status

- [x] Specification approved
- [x] Implementation complete
- [x] Validation complete
