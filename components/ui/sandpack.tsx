"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react";
import type { SandpackTheme } from "@codesandbox/sandpack-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SandpackProps {
  code?: string;
  template?: "react" | "vanilla" | "vanilla-ts" | "react-ts";
  showLineNumbers?: boolean;
  files?: Record<string, string>;
  showConsole?: boolean;
}

const premiumDarkTheme: SandpackTheme = {
  colors: {
    surface1: "transparent",
    surface2: "#1a1f23",
    surface3: "#3d3a50",
    clickable: "#9896a4",
    base: "#e2e0e7",
    disabled: "#6b6878",
    hover: "#e2e0e7",
    accent: "#81a2be",
    error: "#cc6666",
    errorSurface: "#2d1f1f",
  },
  syntax: {
    plain: "#e2e0e7",
    comment: { color: "#6b6878", fontStyle: "italic" as const },
    keyword: "#c9a0dc",
    tag: "#e06c9a",
    punctuation: "#9896a4",
    definition: "#81a2be",
    property: "#8abeb7",
    static: "#de935f",
    string: "#f0c674",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    size: "14px",
    lineHeight: "1.7",
  },
};

// Toolbar component with file tabs
function EditorToolbar() {
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;
  const fileName = activeFile.split("/").pop() || "App.js";

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1f23]">
      <div className="flex items-center gap-3">
        <span className="text-[#81a2be] text-sm font-medium">{fileName}</span>
      </div>
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => sandpack.resetAllFiles()}
                className="flex items-center justify-center text-[#6b6878] hover:text-[#e2e0e7] transition-colors p-1"
                aria-label="Reset Code"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset Code</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <UnstyledOpenInCodeSandboxButton
                className="flex items-center justify-center text-[#6b6878] hover:text-[#e2e0e7] transition-colors p-1"
                aria-label="Open in CodeSandbox"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </UnstyledOpenInCodeSandboxButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open in CodeSandbox</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function SandpackTabbedPreview() {
  const [activeTab, setActiveTab] = useState<"output" | "console">("output");

  return (
    <div className="border-t border-[#3d3a50]">
      <div className="flex items-center bg-[#1a1f23] border-b border-[#3d3a50]">
        <button
          onClick={() => setActiveTab("output")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "output"
              ? "text-[#e2e0e7] border-b-2 border-[#81a2be]"
              : "text-[#6b6878] hover:text-[#9896a4]"
          }`}
        >
          Output
        </button>
        <button
          onClick={() => setActiveTab("console")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "console"
              ? "text-[#e2e0e7] border-b-2 border-[#81a2be]"
              : "text-[#6b6878] hover:text-[#9896a4]"
          }`}
        >
          Console
        </button>
      </div>
      <div style={{ display: activeTab === "output" ? "block" : "none" }}>
        <SandpackPreview
          showNavigator={false}
          showRefreshButton={false}
          showOpenInCodeSandbox={false}
          style={{
            height: "280px",
            backgroundColor: "#ffffff",
          }}
        />
      </div>
      <div style={{ display: activeTab === "console" ? "block" : "none" }}>
        <SandpackConsole
          showHeader={false}
          style={{
            height: "280px",
            backgroundColor: "#0d1117",
          }}
        />
      </div>
    </div>
  );
}

export function Sandpack({
  code,
  template = "react",
  showLineNumbers = true,
  files,
  showConsole = false,
}: SandpackProps) {
  const defaultCode = `import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function App() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        Almaty is the largest city in Kazakhstan.
      </Panel>
      <Panel title="Etymology">
        The name comes from "alma", meaning "apple".
      </Panel>
    </>
  );
}`;

  const defaultFiles = files || {
    "/App.js": code || defaultCode,
    "/styles.css": `.panel {
  border: 1px solid #aaa;
  padding: 10px;
  margin: 10px 0;
}

h2, h3 {
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
`,
  };

  return (
    <div className="not-prose my-6 border border-[#3d3a504b] rounded-lg overflow-hidden">
      <SandpackProvider
        template={template}
        theme={premiumDarkTheme}
        files={defaultFiles}
        options={{
          classes: {
            "sp-wrapper": "sandpack-wrapper",
            "sp-layout": "sandpack-layout",
            "sp-stack": "sandpack-stack",
          },
        }}
      >
        <div className="flex flex-col">
          <div>
            <EditorToolbar />
            <SandpackCodeEditor
              showLineNumbers={showLineNumbers}
              showInlineErrors
              wrapContent
              style={{
                height: "400px",
                fontSize: "14px",
              }}
            />
          </div>

          {showConsole ? (
            <SandpackTabbedPreview />
          ) : (
            <div className="border-t border-[#3d3a50]">
              <SandpackPreview
                showNavigator={false}
                showRefreshButton={false}
                showOpenInCodeSandbox={false}
                style={{
                  height: "280px",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
          )}
        </div>
      </SandpackProvider>
    </div>
  );
}
