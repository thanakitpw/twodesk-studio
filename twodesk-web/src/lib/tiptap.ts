import type { JSONContent } from '@tiptap/react';

/**
 * Render Tiptap JSON → HTML แบบไม่พึ่ง dependency (ปลอดภัยฝั่ง server)
 * ครอบ node/mark ที่ editor นี้สร้าง: StarterKit (heading 1-2, paragraph,
 * bullet/ordered list, listItem, blockquote, codeBlock, horizontalRule,
 * hardBreak) + Underline + Image + Link.
 *
 * ใช้คู่กับ dangerouslySetInnerHTML — ทุก text/attribute ถูก escape แล้ว
 */

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// อนุญาตเฉพาะ http/https/mailto/relative — กัน javascript: URL
function safeUrl(url: string): string {
  const u = url.trim();
  if (/^(https?:|mailto:|\/|#)/i.test(u)) return esc(u);
  return '#';
}

function renderMarks(text: string, marks?: JSONContent['marks']): string {
  let out = esc(text);
  if (!marks) return out;
  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':
        out = `<strong>${out}</strong>`;
        break;
      case 'italic':
        out = `<em>${out}</em>`;
        break;
      case 'underline':
        out = `<u>${out}</u>`;
        break;
      case 'strike':
        out = `<s>${out}</s>`;
        break;
      case 'code':
        out = `<code>${out}</code>`;
        break;
      case 'link': {
        const href = safeUrl(String(mark.attrs?.href ?? '#'));
        out = `<a href="${href}" rel="noopener noreferrer" target="_blank">${out}</a>`;
        break;
      }
    }
  }
  return out;
}

function renderNode(node: JSONContent): string {
  const children = (node.content ?? []).map(renderNode).join('');

  switch (node.type) {
    case 'doc':
      return children;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading': {
      const lvl = node.attrs?.level === 1 ? 1 : 2;
      return `<h${lvl}>${children}</h${lvl}>`;
    }
    case 'text':
      return renderMarks(node.text ?? '', node.marks);
    case 'bulletList':
      return `<ul>${children}</ul>`;
    case 'orderedList':
      return `<ol>${children}</ol>`;
    case 'listItem':
      return `<li>${children}</li>`;
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`;
    case 'codeBlock':
      return `<pre><code>${children}</code></pre>`;
    case 'horizontalRule':
      return '<hr />';
    case 'hardBreak':
      return '<br />';
    case 'image': {
      const src = safeUrl(String(node.attrs?.src ?? ''));
      const alt = esc(String(node.attrs?.alt ?? ''));
      return `<img src="${src}" alt="${alt}" class="max-w-full rounded-lg" />`;
    }
    default:
      return children;
  }
}

export function renderTiptap(json: JSONContent | null | undefined): string {
  if (!json || typeof json !== 'object') return '';
  return renderNode(json);
}
