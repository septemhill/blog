
import { Transformer } from 'unified';
import { Node } from 'unist';
import { Parent, Text, Html, Paragraph, PhrasingContent } from 'mdast';

const REGEX = /@Link\(([^,]+?),\s*([^)]+?)\)/g;

const plugin = () => {
  const transformer: Transformer = (tree: Node) => {
    visit(tree);
  };

  const visit = (node: Node) => {
    if (node.type === 'paragraph') {
      const paraNode = node as Paragraph;
      const newChildren: PhrasingContent[] = [];
      let modified = false;

      for (const child of paraNode.children) {
        if (child.type === 'text') {
          const textNode = child as Text;
          const text = textNode.value;
          let lastIndex = 0;
          const nodes: (Text | Html)[] = [];

          const matches = Array.from(text.matchAll(REGEX));

          if (matches.length > 0) {
            modified = true;
            for (const match of matches) {
              const [fullMatch, content, url] = match;
              const index = match.index!;

              if (index > lastIndex) {
                nodes.push({ type: 'text', value: text.slice(lastIndex, index) });
              }

              nodes.push({
                type: 'html',
                value: `<a href="${url.trim()}" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">${content.trim()}</a>`
              });

              lastIndex = index + fullMatch.length;
            }

            if (lastIndex < text.length) {
              nodes.push({ type: 'text', value: text.slice(lastIndex) });
            }
            newChildren.push(...nodes);
          } else {
            newChildren.push(child);
          }
        } else {
          newChildren.push(child);
        }
      }

      if (modified) {
        paraNode.children = newChildren;
      }
    } else if ((node as Parent).children) {
      for (const child of (node as Parent).children) {
        visit(child);
      }
    }
  };

  return transformer;
};

export default plugin;
