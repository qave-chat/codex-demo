import type { Page, SlideMeta } from "@open-slide/core";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  type SandpackFiles,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import qaveAvatar from "./assets/qave-avatar.webp";

const palette = {
  paper: "#191919",
  ink: "#efefe5",
  muted: "#b5b5af",
  line: "#3B3B35",
  primary: "#865ea9",
  primarySoft: "#222222",
  ring: "#cea4f4",
  editor: "#191919",
  editorCard: "#141316",
  editorLine: "#3B3B35",
  editorMuted: "#b5b5af",
  editorText: "#efefe5",
  editorAccent: "#865ea9",
  editorAccentSoft: "#eadafa",
};

const font = {
  body: '"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
  mono: '"Geist Mono", "SF Mono", ui-monospace, Menlo, monospace',
};

const qavePixelFontUrl = new URL(
  "./assets/GeistPixel-Square.woff2",
  import.meta.url,
).href;

if (
  typeof document !== "undefined" &&
  !document.getElementById("qave-pixel-font")
) {
  const style = document.createElement("style");
  style.id = "qave-pixel-font";
  style.textContent = `@font-face { font-display: swap; font-family: "Geist Pixel Square"; font-style: normal; font-weight: 500; src: url("${qavePixelFontUrl}") format("woff2"); }`;
  document.head.appendChild(style);
}

const styles = `
  .os-slide * { box-sizing: border-box; }
  .os-slide .chip { border: 1px solid ${palette.line}; padding: 12px 18px; font-family: ${font.body}; font-size: 22px; color: ${palette.primary}; background: ${palette.primarySoft}; }
  .os-slide .card { border: 1px solid ${palette.line}; background: ${palette.primarySoft}; padding: 28px; }
  .os-slide .big { font-size: 48px; line-height: 1.16; letter-spacing: -.025em; }
  .os-slide .body { font-size: 31px; line-height: 1.38; color: ${palette.muted}; }
  .os-slide .section { height: 840px; display: flex; flex-direction: column; border: 1px solid ${palette.line}; background: ${palette.primarySoft}; box-shadow: 0 26px 70px rgba(0,0,0,.42); }
  .os-slide .section-header { height: 36px; flex: 0 0 36px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid ${palette.line}; background: rgba(34,34,34,.9); padding: 0 14px; }
  .os-slide .section-title { margin: 0; color: ${palette.muted}; font-family: ${font.body}; font-size: 16px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
  .os-slide .section-meta { color: ${palette.muted}; font-family: ${font.body}; font-size: 15px; }
  .os-slide .section-body { min-height: 0; flex: 1; }
  .os-slide .sandpack-wrapper { height: 804px; overflow: hidden; border: 0; border-radius: 0; }
  .os-slide .sp-wrapper, .os-slide .sp-layout { height: 100%; }
  .os-slide .sp-file-explorer { width: 420px; min-width: 420px; height: 804px; overflow: auto; }
  .os-slide .sp-file-explorer, .os-slide .sp-file-explorer * { font-family: ${font.body}; font-size: 23px; line-height: 1.48; }
  .os-slide .sp-code-editor { height: 804px; flex: 1; }
  .os-slide .sp-stack { min-height: 0; }
  .os-slide .cm-editor { font-family: ${font.mono}; font-size: 23px; }
  .os-slide .cm-line { line-height: 1.48; }
`;

const fill = {
  width: "100%",
  height: "100%",
  background: palette.paper,
  color: palette.ink,
  fontFamily: font.body,
  position: "relative" as const,
  overflow: "hidden",
};

function Shell({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="os-slide" style={{ ...fill, padding: 70 }}>
      <style>{styles}</style>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr auto",
          gap: 24,
          alignItems: "baseline",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: font.body,
            color: palette.primary,
            fontSize: 20,
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{ fontFamily: font.body, color: palette.ink, fontSize: '27px', lineHeight: 1.08, letterSpacing: "-.025em" }}
        >
          {title}
        </div>
        <div
          style={{ fontFamily: font.body, color: palette.muted, fontSize: 18 }}
        >
          agentic-codebase-todo
        </div>
      </div>
      {children}
      <FooterBrand />
    </div>
  );
}

const FooterBrand = () => {
  const footerText = {
    bottom: 28,
    color: palette.muted,
    fontFamily: font.body,
    fontSize: 24,
    letterSpacing: ".04em",
    position: "absolute" as const,
  };

  return (
    <>
      <div
        style={{
          ...footerText,
          alignItems: "center",
          display: "flex",
          gap: 12,
          left: 70,
        }}
      >
        <img
          alt="Qave"
          src={qaveAvatar}
          style={{ height: 30, width: 30, objectFit: "contain" }}
        />
        <span>qave.ai</span>
      </div>
      <div style={{ ...footerText, right: 70 }}>Kevin</div>
    </>
  );
};

function Section({ children }: { children: React.ReactNode }) {
  return <section className="section">{children}</section>;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="section-header">
      <h3 className="section-title">{title}</h3>
      <span className="section-meta">
        scroll inside code · arrows change slides
      </span>
    </div>
  );
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return <div className="section-body">{children}</div>;
}

const hiddenTemplateFiles = {
  "/App.tsx": {
    code: "export default function App() { return null; }\n",
    hidden: true,
  },
  "/index.tsx": {
    code: 'import App from "./App";\n\nvoid App;\n',
    hidden: true,
  },
  "/package.json": {
    code: '{"scripts":{"start":"vite"},"dependencies":{},"devDependencies":{}}\n',
    hidden: true,
  },
  "/public/index.html": { code: '<div id="root"></div>\n', hidden: true },
  "/styles.css": { code: ":root { color-scheme: dark; }\n", hidden: true },
  "/tsconfig.json": {
    code: '{"compilerOptions":{"jsx":"react-jsx","strict":true}}\n',
    hidden: true,
  },
} satisfies SandpackFiles;

function SlideSandpack({
  activeFile,
  files,
}: {
  activeFile: string;
  files: Record<string, string>;
}) {
  const sandpackFiles: SandpackFiles = { ...hiddenTemplateFiles, ...files };

  return (
    <Section>
      <SectionHeader title="source" />
      <SectionBody>
        <div className="sandpack-wrapper" data-wheel-nav-ignore>
          <SandpackProvider
            template="react-ts"
            theme="dark"
            options={{ activeFile, visibleFiles: Object.keys(files) }}
            files={sandpackFiles}
          >
            <SandpackLayout style={{ height: 804 }}>
              <SandpackFileExplorer
                autoHiddenFiles
                initialCollapsedFolder={["/apps/server/src/platform/"]}
              />
              <SandpackCodeEditor
                showInlineErrors={false}
                showLineNumbers
                wrapContent
                showReadOnly
                showTabs={false}
                style={{ height: 804 }}
              />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </SectionBody>
    </Section>
  );
}

function filesFromGlob(
  files: Record<string, string>,
  root: string,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).map(([path, code]) => [
      path.slice(root.length),
      code,
    ]),
  );
}

const normalCreateFiles = filesFromGlob(
  import.meta.glob<string>("./snippets/normal-create/**/*", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  "./snippets/normal-create",
);
const normalShareFiles = filesFromGlob(
  import.meta.glob<string>("./snippets/normal-share/**/*", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  "./snippets/normal-share",
);
const normalRepeatFiles = filesFromGlob(
  import.meta.glob<string>("./snippets/normal-repeat/**/*", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  "./snippets/normal-repeat",
);
const agenticCreateFiles = filesFromGlob(
  import.meta.glob<string>("./snippets/agentic-create/**/*", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  "./snippets/agentic-create",
);
const agenticShareFiles = filesFromGlob(
  import.meta.glob<string>("./snippets/agentic-share/**/*", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  "./snippets/agentic-share",
);
const agenticRepeatFiles = filesFromGlob(
  import.meta.glob<string>("./snippets/agentic-repeat/**/*", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  "./snippets/agentic-repeat",
);

const Statement = ({ title }: { title: string }) => (
  <div
    className="os-slide"
    style={{
      ...fill,
      padding: "0 150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <style>{styles}</style>
    <h1
      style={{
        fontSize: 132,
        lineHeight: 0.94,
        letterSpacing: "-.065em",
        fontWeight: 520,
        margin: 0,
      }}
    >
      {title}
    </h1>
    <FooterBrand />
  </div>
);

const Cover: Page = () => (
  <Statement title="codebase, complexity and correctness" />
);

const NormalCreate: Page = () => (
  <Shell eyebrow="normal 1" title="CRUD baseline">
    <SlideSandpack
      activeFile="/apps/server/src/module/todo/todo-service.ts"
      files={normalCreateFiles}
    />
  </Shell>
);

const NormalShare: Page = () => (
  <Shell eyebrow="normal 2" title="Sharing + notification job">
    <SlideSandpack
      activeFile="/apps/server/src/module/todo/todo-service.ts"
      files={normalShareFiles}
    />
  </Shell>
);

const NormalRepeat: Page = () => (
  <Shell eyebrow="normal 3" title="Recurrence preserves notifications">
    <SlideSandpack
      activeFile="/apps/server/src/module/todo-recurrence/todo-recurrence-service.ts"
      files={normalRepeatFiles}
    />
  </Shell>
);

const Pivot: Page = () => (
  <Statement title="as complexity increase, does correctness also increase?" />
);

const AgenticCreate: Page = () => (
  <Shell eyebrow="agentic 1" title="RPC + intents">
    <SlideSandpack
      activeFile="/packages/effect-api/src/todo/todo.rpc.interface.ts"
      files={agenticCreateFiles}
    />
  </Shell>
);

const AgenticShare: Page = () => (
  <Shell eyebrow="agentic 2" title="Reaction calls external services">
    <SlideSandpack
      activeFile="/apps/server/src/module/notification/notification.reaction.live.ts"
      files={agenticShareFiles}
    />
  </Shell>
);

const AgenticRepeat: Page = () => (
  <Shell eyebrow="agentic 3" title="Recurrence preserves reaction outcomes">
    <SlideSandpack
      activeFile="/apps/server/src/module/todo-occurrence/todo-occurrence.reaction.live.ts"
      files={agenticRepeatFiles}
    />
  </Shell>
);

const Close: Page = () => (
  <Statement title="codex 5.5 with no reasoning works very well in this paradigm" />
);

export const meta: SlideMeta = {
  title: "Building an Agentic Codebase",
  theme: "qave",
};

export default [
  Cover,
  NormalCreate,
  NormalShare,
  NormalRepeat,
  Pivot,
  AgenticCreate,
  AgenticShare,
  AgenticRepeat,
  Close,
] satisfies Page[];
