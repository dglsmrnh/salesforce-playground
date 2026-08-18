import { createElement } from 'lwc';
import TreeView from 'c/treeView';
import TreeNodeRenderer from 'c/treeNodeRenderer';

const flushPromises = () => Promise.resolve();

const items = [
  {
    name: 'root',
    label: 'Root',
    expanded: true,
    items: [
      {
        name: 'child',
        label: 'Child',
        items: []
      }
    ]
  }
];

function createTree() {
  const element = createElement('c-tree-view', { is: TreeView });
  element.items = items;
  element.renderer = TreeNodeRenderer;
  document.body.appendChild(element);
  return element;
}

afterEach(() => {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
});

describe('c-tree-view', () => {
  it('renders root and nested nodes with renderer properties', async () => {
    const element = createTree();
    await flushPromises();

    const nodes = element.shadowRoot.querySelectorAll('c-tree-node');
    expect(nodes).toHaveLength(1);
    expect(nodes[0].shadowRoot.querySelector('[role="treeitem"]')).not.toBeNull();

    const nestedNode = nodes[0].shadowRoot.querySelector('c-tree-node');
    const renderer = nodes[0].shadowRoot.querySelector('x-test');

    expect(nestedNode).not.toBeNull();
    expect(renderer).not.toBeNull();
    expect(renderer.node).toEqual(items[0]);
    expect(renderer.depth).toBe(1);
    expect(renderer.hasChildren).toBe(true);
    expect(renderer.expanded).toBe(true);
  });

  it('toggles a branch and emits its state', async () => {
    const element = createTree();
    const toggleHandler = jest.fn();
    element.addEventListener('toggle', toggleHandler);
    await flushPromises();

    const root = element.shadowRoot.querySelector('c-tree-node');
    const toggle = root.shadowRoot.querySelector('button');
    toggle.click();
    await flushPromises();

    expect(toggleHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          name: 'root',
          expanded: false
        })
      })
    );
    expect(root.shadowRoot.querySelector('.tree-node__children')).toBeNull();
  });

  it('emits selection details for a node', async () => {
    const element = createTree();
    const selectHandler = jest.fn();
    element.addEventListener('select', selectHandler);
    await flushPromises();

    const root = element.shadowRoot.querySelector('c-tree-node');
    root.shadowRoot.querySelector('.tree-node__row').click();

    expect(selectHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ name: 'root' })
      })
    );
  });

  it('does not render a toggle for leaf nodes', async () => {
    const element = createTree();
    await flushPromises();

    const child = element.shadowRoot.querySelector('c-tree-node').shadowRoot.querySelector('c-tree-node');

    expect(child.shadowRoot.querySelector('button')).toBeNull();
    expect(child.shadowRoot.querySelector('.tree-node__toggle-placeholder')).not.toBeNull();
  });

  it('forwards actions from the custom renderer', async () => {
    const element = createTree();
    const actionHandler = jest.fn();
    element.addEventListener('action', actionHandler);
    await flushPromises();

    const renderer = element.shadowRoot.querySelector('c-tree-node').shadowRoot.querySelector('x-test');
    renderer.dispatchEvent(
      new CustomEvent('action', {
        detail: { type: 'custom-action' },
        bubbles: true,
        composed: true
      })
    );

    expect(actionHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          name: 'root',
          action: { type: 'custom-action' }
        })
      })
    );

    actionHandler.mockClear();
    const childRenderer = element.shadowRoot
      .querySelector('c-tree-node')
      .shadowRoot.querySelector('c-tree-node')
      .shadowRoot.querySelector('x-test');
    childRenderer.dispatchEvent(
      new CustomEvent('action', {
        detail: { type: 'child-action' },
        bubbles: true,
        composed: true
      })
    );

    expect(actionHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          name: 'child',
          action: { type: 'child-action' }
        })
      })
    );
  });
});
