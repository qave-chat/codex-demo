import { type Page, useSlidePageNumber } from "@open-slide/core";

const palette = {
  bg: "#191919",
  card: "#141316",
  editor: "#191919",
  editorAccent: "#865ea9",
  editorLine: "#3B3B35",
  editorMuted: "#b5b5af",
  editorText: "#efefe5",
  line: "#3B3B35",
  muted: "#b5b5af",
  primary: "#865ea9",
  ring: "#cea4f4",
  text: "#efefe5",
};

const font = {
  body: '"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
  mono: '"Geist Mono", "SF Mono", ui-monospace, Menlo, monospace',
};

const fill = {
  background: palette.bg,
  color: palette.text,
  fontFamily: font.body,
  height: "100%",
  overflow: "hidden",
  position: "relative" as const,
  width: "100%",
};

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      color: palette.text,
      fontFamily: font.body,
      fontSize: 132,
      fontWeight: 520,
      letterSpacing: "-.065em",
      lineHeight: 0.94,
      margin: 0,
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        alignItems: "center",
        bottom: 54,
        color: palette.muted,
        display: "flex",
        fontFamily: font.body,
        fontSize: 22,
        justifyContent: "space-between",
        left: 70,
        position: "absolute",
        right: 70,
      }}
    >
      <span>qave</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      color: palette.primary,
      fontFamily: font.body,
      fontSize: 20,
      letterSpacing: ".16em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 150px",
    }}
  >
    <Title>codebase, complexity and correctness</Title>
    <Footer />
  </div>
);

const CodePage: Page = () => (
  <div style={{ ...fill, padding: 70 }}>
    <div
      style={{
        alignItems: "baseline",
        display: "grid",
        gap: 24,
        gridTemplateColumns: "220px 1fr auto",
        marginBottom: 28,
      }}
    >
      <Eyebrow>agentic 1</Eyebrow>
      <div
        style={{
          color: palette.text,
          fontSize: 38,
          letterSpacing: "-.025em",
          lineHeight: 1.08,
        }}
      >
        Read RPCs stay separate from write intents
      </div>
      <div
        style={{ color: palette.muted, fontFamily: font.body, fontSize: 18 }}
      >
        qave
      </div>
    </div>
    <div
      style={{
        background: palette.editor,
        border: `1px solid ${palette.editorLine}`,
        boxShadow: "0 26px 70px rgba(32,32,26,.24)",
        color: palette.editorText,
        display: "flex",
        flexDirection: "column",
        height: 840,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: palette.card,
          borderBottom: `1px solid ${palette.editorLine}`,
          color: palette.editorMuted,
          display: "flex",
          fontFamily: font.body,
          fontSize: 16,
          height: 36,
          justifyContent: "space-between",
          letterSpacing: ".12em",
          padding: "0 14px",
          textTransform: "uppercase",
        }}
      >
        <span>source</span>
        <span>scroll inside code · arrows change slides</span>
      </div>
      <div
        style={{
          display: "grid",
          flex: 1,
          gridTemplateColumns: "420px 1fr",
          minHeight: 0,
        }}
      >
        <div
          style={{
            background: palette.editor,
            borderRight: `1px solid ${palette.editorLine}`,
            color: palette.editorMuted,
            fontFamily: font.body,
            fontSize: 22,
            lineHeight: 1.8,
            padding: 28,
          }}
        >
          <div style={{ color: palette.editorAccent }}>packages</div>
          <div style={{ paddingLeft: 24 }}>effect-api</div>
          <div style={{ paddingLeft: 48, color: palette.editorText }}>
            todo.rpc.interface.ts
          </div>
          <div style={{ color: palette.editorAccent, marginTop: 20 }}>apps</div>
          <div style={{ paddingLeft: 24 }}>server</div>
          <div style={{ paddingLeft: 24 }}>web</div>
        </div>
        <pre
          style={{
            color: palette.editorText,
            fontFamily: font.mono,
            fontSize: 30,
            lineHeight: 1.48,
            margin: 0,
            overflow: "hidden",
            padding: 36,
          }}
        >
          {`export class ListTodosRpc extends Rpc.Tag("ListTodos")<
  ListTodosRpc,
  ListTodosInput,
  ListTodosResult
>() {}

export const CreateTodoIntent = Intent.define({
  type: "Intent.V1.CreateTodo",
  payload: CreateTodoIntentPayloadSchema,
});`}
        </pre>
      </div>
    </div>
  </div>
);

const Closer: Page = () => (
  <div
    style={{
      ...fill,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 150px",
    }}
  >
    <Title>The complexity got named.</Title>
    <Footer />
  </div>
);

export default [Cover, CodePage, Closer];
