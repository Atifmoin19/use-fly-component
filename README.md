# \# 🪄 useFlyingClone Hook

Create beautiful, animated "fly-to-target" clone transitions between two DOM elements — perfect for cart animations, interactions, or any UI polish.

---

## ✨ Features

- 🧲 Clone any HTML element and animate it to a target.
- ⚡ Fast and lightweight — pure JS + CSS.
- 🎯 Precise positioning using `getBoundingClientRect`.
- 🧩 Framework-agnostic design (React-based hook).

---

## 1. 🔧 Setup

### 📦 Install (via npm)

```bash
npm install use-flying-clone
```

Or with Yarn:

```bash
yarn add use-flying-clone
```

## 2. 🎨 Add CSS

You need to define styles for the .flying-clone-container and .flying-clone in your global CSS:
/_ styles.css or global.css _/

```css
.flying-clone-container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.flying-clone {
  will-change: transform, opacity;
}
```

Import this CSS in your main file (e.g. main.tsx):

```typescript
import './styles.css';

🧪 Example Use Case
🖼 Demo: Animate a Product to Cart
import React, { useRef } from 'react';
import { useFlyingClone } from 'use-flying-clone';

export default function App() {
const sourceRef = useRef<HTMLDivElement>(null);
const targetRef = useRef<HTMLDivElement>(null);
const { flyToTarget, FlyingCloneRenderer } = useFlyingClone();

const handleClick = () => {
flyToTarget(sourceRef, targetRef);
};

return (

<div>
<div ref={sourceRef} className="product" onClick={handleClick}>
🛍️ Click me
</div>

      <div ref={targetRef} className="cart">
        🛒 Cart
      </div>


      {/* Needed for managing clones */}
      <FlyingCloneRenderer />
    </div>

);
}
```

## 📌 Notes

- The `FlyingCloneRenderer` doesn’t render any visible element but sets up the DOM container.
- Cloned elements are dynamically added to the body under `.flying-clone-container`.
- The clone mimics the style and content of the original element.
- You can adjust animation styles via CSS or JavaScript for custom transitions.

---

## 🧩 API Reference

### `flyToTarget(sourceRef, targetRef)`

**Parameters**

- `sourceRef`: `React.RefObject<HTMLElement>` — The element to clone.
- `targetRef`: `React.RefObject<HTMLElement>` — The destination element.

**Description**
Triggers a smooth animation from the source element to the target element using a dynamically created clone.

---

### `FlyingCloneRenderer`

**Description**
Place this component somewhere in your React component tree (usually once).
It’s responsible for managing the clone container and must be rendered at least once.

---

## 🧠 Tips

- Add transition effects to `.flying-clone` for scaling, fading, or easing.
- Works seamlessly with product-card-to-cart animations or any “fly-to” gesture.
- Tested on all modern browsers and optimized for 60 FPS motion.

---
