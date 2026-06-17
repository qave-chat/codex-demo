import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const slidePath = join(root, 'slides/agentic-codebase-todo/index.tsx');
const snippetsRoot = join(root, 'slides/agentic-codebase-todo/snippets');
const source = readFileSync(slidePath, 'utf8');

function readTemplateAt(text, start) {
  if (text[start] !== '`') throw new Error(`Expected template at ${start}`);
  let out = '';
  for (let i = start + 1; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '\\') {
      out += ch + text[i + 1];
      i += 1;
      continue;
    }
    if (ch === '`') return { end: i + 1, value: out };
    out += ch;
  }
  throw new Error('Unterminated template literal');
}

function findMatchingBrace(text, start) {
  let depth = 0;
  let mode = 'code';
  for (let i = start; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (mode === 'line') {
      if (ch === '\n') mode = 'code';
      continue;
    }
    if (mode === 'block') {
      if (ch === '*' && next === '/') {
        mode = 'code';
        i += 1;
      }
      continue;
    }
    if (mode === 'single' || mode === 'double') {
      if (ch === '\\') {
        i += 1;
        continue;
      }
      if ((mode === 'single' && ch === "'") || (mode === 'double' && ch === '"')) mode = 'code';
      continue;
    }
    if (mode === 'template') {
      if (ch === '\\') {
        i += 1;
        continue;
      }
      if (ch === '`') mode = 'code';
      continue;
    }

    if (ch === '/' && next === '/') {
      mode = 'line';
      i += 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      mode = 'block';
      i += 1;
      continue;
    }
    if (ch === "'") {
      mode = 'single';
      continue;
    }
    if (ch === '"') {
      mode = 'double';
      continue;
    }
    if (ch === '`') {
      mode = 'template';
      continue;
    }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error('No matching brace');
}

function extractConstTemplate(name) {
  const marker = `const ${name} = `;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Missing ${name}`);
  return readTemplateAt(source, start + marker.length).value;
}

function parseObject(name, resolved) {
  const marker = `const ${name}: Record<string, string> = `;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Missing ${name}`);
  const open = source.indexOf('{', start + marker.length);
  const close = findMatchingBrace(source, open);
  const body = source.slice(open + 1, close);
  const files = {};
  let i = 0;

  while (i < body.length) {
    while (/\s|,/.test(body[i] ?? '')) i += 1;
    if (i >= body.length) break;

    if (body.startsWith('...', i)) {
      i += 3;
      const nameStart = i;
      while (/[A-Za-z0-9_$]/.test(body[i] ?? '')) i += 1;
      const spreadName = body.slice(nameStart, i);
      Object.assign(files, resolved[spreadName]);
      continue;
    }

    if (body[i] !== "'") throw new Error(`Expected key in ${name} near ${body.slice(i, i + 60)}`);
    const keyEnd = body.indexOf("'", i + 1);
    const key = body.slice(i + 1, keyEnd);
    i = keyEnd + 1;
    while (/\s|:/.test(body[i] ?? '')) i += 1;

    if (body[i] === '`') {
      const template = readTemplateAt(body, i);
      files[key] = template.value;
      i = template.end;
      continue;
    }

    const identStart = i;
    while (/[A-Za-z0-9_$]/.test(body[i] ?? '')) i += 1;
    const ident = body.slice(identStart, i);
    if (!(ident in resolved)) throw new Error(`Unknown identifier ${ident} in ${name}`);
    files[key] = resolved[ident];
  }

  return files;
}

const resolved = {
  normalTodoTableSource: extractConstTemplate('normalTodoTableSource'),
};

for (const name of ['normalCreateFiles', 'normalShareFiles', 'normalRepeatFiles', 'agenticCreateFiles', 'agenticShareFiles', 'agenticRepeatFiles']) {
  resolved[name] = parseObject(name, resolved);
}

rmSync(snippetsRoot, { force: true, recursive: true });

const folders = {
  normalCreateFiles: 'normal-create',
  normalShareFiles: 'normal-share',
  normalRepeatFiles: 'normal-repeat',
  agenticCreateFiles: 'agentic-create',
  agenticShareFiles: 'agentic-share',
  agenticRepeatFiles: 'agentic-repeat',
};

for (const [name, folder] of Object.entries(folders)) {
  for (const [filePath, code] of Object.entries(resolved[name])) {
    const target = join(snippetsRoot, folder, filePath.replace(/^\//, ''));
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, code.endsWith('\n') ? code : `${code}\n`);
  }
}

const blockStart = source.indexOf('const normalTodoTableSource = `');
const coverStart = source.indexOf('const Cover: Page = () => (');
if (blockStart === -1 || coverStart === -1 || blockStart >= coverStart) {
  throw new Error('Could not find snippet block boundaries');
}

const globBlock = `function filesFromGlob(files: Record<string, string>, root: string): Record<string, string> {
  return Object.fromEntries(Object.entries(files).map(([path, code]) => [path.slice(root.length), code]));
}

const normalCreateFiles = filesFromGlob(
  import.meta.glob<string>('./snippets/normal-create/**/*', { eager: true, import: 'default', query: '?raw' }),
  './snippets/normal-create'
);
const normalShareFiles = filesFromGlob(
  import.meta.glob<string>('./snippets/normal-share/**/*', { eager: true, import: 'default', query: '?raw' }),
  './snippets/normal-share'
);
const normalRepeatFiles = filesFromGlob(
  import.meta.glob<string>('./snippets/normal-repeat/**/*', { eager: true, import: 'default', query: '?raw' }),
  './snippets/normal-repeat'
);
const agenticCreateFiles = filesFromGlob(
  import.meta.glob<string>('./snippets/agentic-create/**/*', { eager: true, import: 'default', query: '?raw' }),
  './snippets/agentic-create'
);
const agenticShareFiles = filesFromGlob(
  import.meta.glob<string>('./snippets/agentic-share/**/*', { eager: true, import: 'default', query: '?raw' }),
  './snippets/agentic-share'
);
const agenticRepeatFiles = filesFromGlob(
  import.meta.glob<string>('./snippets/agentic-repeat/**/*', { eager: true, import: 'default', query: '?raw' }),
  './snippets/agentic-repeat'
);

`;

writeFileSync(slidePath, source.slice(0, blockStart) + globBlock + source.slice(coverStart));
