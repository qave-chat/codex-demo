---
---

name: Qave
description: Pixel-sharp product slides using Qave dark surfaces and purple system accents.

---

# Qave

## Palette

| Role          | Value     | Notes                                  |
| ------------- | --------- | -------------------------------------- |
| bg            | `#191919` | slide background                       |
| text          | `#efefe5` | primary copy                           |
| muted         | `#b5b5af` | metadata, footer, secondary copy       |
| card          | `#141316` | panels and code surfaces               |
| line          | `#3B3B35` | borders and dividers                   |
| primary       | `#865ea9` | eyebrows, emphasis, active controls    |
| ring          | `#cea4f4` | secondary accent, focus, active states |
| editor-bg     | `#191919` | Sandpack/editor background             |
| editor-card   | `#141316` | editor panels                          |
| editor-text   | `#efefe5` | editor foreground                      |
| editor-line   | `#3B3B35` | editor borders                         |
| editor-accent | `#865ea9` | editor active states                   |
| editor-soft   | `#eadafa` | active hover and accent foreground     |

## Typography

- Display font: `"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif` — weight 520-760 for headlines.
- Body font: `"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif` — weight 500-650.
- Mono font: `"Geist Mono", "SF Mono", ui-monospace, Menlo, monospace` for code only.
- Type-scale overrides:
  - Hero title: 132 px with tight 0.94 line-height.
  - Code slide title: 38 px.
  - Eyebrow: 20 px uppercase pixel.
  - Editor body: 23 px.

## Layout

- Canvas: fixed 1920 x 1080.
- Statement pages: 150 px horizontal padding, vertically centered, title only.
- Code pages: 70 px page padding; a compact top rail uses a 220 px eyebrow column, fluid title, and right metadata.
- Sections: square-edged bordered panels with a 36 px header strip, uppercase pixel title, and no radius.
- Sandpack: 840 px outer section, 804 px code body, file tree fixed at 420 px, platform folders collapsed by default.
- Trackpad scroll inside Sandpack should remain inside Sandpack; use arrows for slide navigation.
- Keep code-first pages sparse. Let the file tree and active file carry the story.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      color: "#efefe5",
      fontFamily:
        '"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
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
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props.

```tsx
import { useSlidePageNumber } from "@open-slide/core";

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        alignItems: "center",
        bottom: 54,
        color: "#b5b5af",
        display: "flex",
        fontFamily:
          '"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
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
```

### Eyebrow / accents

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      color: "#865ea9",
      fontFamily:
        '"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
      fontSize: 20,
      letterSpacing: ".16em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);
```

### Section

```tsx
const Section = ({ children }: { children: React.ReactNode }) => (
  <section
    style={{
      background: "#222222",
      border: "1px solid #3B3B35",
      display: "flex",
      flexDirection: "column",
      height: 840,
    }}
  >
    <div
      style={{
        alignItems: "center",
        background: "rgba(34,34,34,.9)",
        borderBottom: "1px solid #3B3B35",
        color: "#b5b5af",
        display: "flex",
        fontFamily:
          '"Geist Pixel Square", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
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
    <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
  </section>
);
```

## Motion

- Philosophy: static. The visual identity is built from dense code surfaces, fixed rails, and sharp token contrast.
- Prefer snap transitions. If motion is required, use a tiny 6 px fade-up under 220 ms.

```css
@keyframes qaveFadeUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Aesthetic

Qave is a product-engineering theme: dark app chrome around a dark code workspace, separated by precise borders and purple system accents. It should feel precise, slightly pixel-native, and contractual. Avoid decorative gradients, photography, emoji, or soft marketing cards. Use purple sparingly as a system accent, not as a wash.

## Example usage

```tsx
const Cover: Page = () => (
  <div
    style={{
      background: "#191919",
      color: "#efefe5",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      padding: "0 150px",
      width: "100%",
    }}
  >
    <Title>codebase, complexity and correctness</Title>
    <Footer />
  </div>
);
```
