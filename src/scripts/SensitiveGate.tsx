/* blog/src/scripts/SensitiveGate.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/scripts/SensitiveGate.tsx */

"use client";

import { useState, type ReactNode } from "react";

/**
 * Gates sensitive post content behind a content warning. The body is rendered
 * blurred and non-interactive until the reader explicitly proceeds, at which
 * point the warning is removed and the content is revealed.
 *
 * Reveal state is component-local, so navigating away and back re-prompts.
 */
export default function SensitiveGate({
  warning,
  children,
}: {
  warning: ReactNode;
  children: ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="blog-gate">
      {!revealed && (
        <div
          id="content-warning"
          className="warning"
          role="alertdialog"
          aria-label="Content warning"
        >
          {warning}
          <div className="warning-actions">
            <button
              type="button"
              className="warning-proceed"
              onClick={() => setRevealed(true)}
            >
              I understand the risks — proceed
            </button>
          </div>
        </div>
      )}

      <div
        className={revealed ? "blog-gate-body is-revealed" : "blog-gate-body"}
        aria-hidden={!revealed}
      >
        {children}
      </div>
    </div>
  );
}
