import { useCallback, useMemo, useState } from "react";
import TopBar from "./components/TopBar";
import ChatPanel from "./components/ChatPanel";
import PreviewViewport from "./components/PreviewViewport";
import { templateStore, resolveTemplate } from "./data/mockTemplates";

const initialMessages = [
  {
    id: "system-001",
    role: "system",
    content:
      "AURORA is ready. Describe the experience you want to build and the workspace engine will construct it.",
    timestamp: new Date(),
  },
  {
    id: "assistant-001",
    role: "assistant",
    content:
      "Workspace initialized. I can generate interfaces, restructure layouts, modify visual systems, and produce production-ready frontend code.",
    timestamp: new Date(),
  },
];

function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(templateStore[0]);
  const [sourceCode, setSourceCode] = useState(templateStore[0].code);
  const [viewport, setViewport] = useState("preview");
  const [device, setDevice] = useState("desktop");
  const [toast, setToast] = useState(null);
  const [engineState, setEngineState] = useState("READY");
  const [latency, setLatency] = useState(24);
  const [workspaceName, setWorkspaceName] = useState("Untitled Aurora Project");

  const showToast = useCallback((message, type = "info") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  const handleTemplateMutation = useCallback(
    (prompt) => {
      const resolved = resolveTemplate(prompt);

      if (!resolved) {
        return false;
      }

      setActiveTemplate(resolved);
      setSourceCode(resolved.code);

      return true;
    },
    []
  );

  const submitPrompt = useCallback(
    async (prompt, attachments = []) => {
      const cleanPrompt = prompt.trim();

      if (!cleanPrompt || isStreaming) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: cleanPrompt,
        attachments,
        timestamp: new Date(),
      };

      setMessages((current) => [...current, userMessage]);
      setIsStreaming(true);
      setEngineState("PROCESSING");
      setLatency(Math.floor(Math.random() * 40) + 18);

      const mutated = handleTemplateMutation(cleanPrompt);

      if (mutated) {
        showToast("Workspace architecture updated", "success");
      } else {
        showToast("Aurora is interpreting your request", "info");
      }

      const responseId = `assistant-${Date.now()}`;

      setMessages((current) => [
        ...current,
        {
          id: responseId,
          role: "assistant",
          content: "",
          streaming: true,
          timestamp: new Date(),
        },
      ]);

      const response = mutated
        ? `I've reconfigured the workspace around your request and synchronized the live preview with the ${resolveTemplate(
            cleanPrompt
          ).name} system.`
        : "I've interpreted the request and prepared the workspace for the next generation pass.";

      let cursor = 0;

      await new Promise((resolve) => {
        const interval = window.setInterval(() => {
          cursor += Math.ceil(Math.random() * 4);

          setMessages((current) =>
            current.map((message) =>
              message.id === responseId
                ? {
                    ...message,
                    content: response.slice(0, cursor),
                  }
                : message
            )
          );

          if (cursor >= response.length) {
            window.clearInterval(interval);
            resolve();
          }
        }, 24);
      });

      setMessages((current) =>
        current.map((message) =>
          message.id === responseId
            ? {
                ...message,
                content: response,
                streaming: false,
              }
            : message
        )
      );

      setIsStreaming(false);
      setEngineState("READY");

      window.setTimeout(() => {
        setLatency(Math.floor(Math.random() * 18) + 18);
      }, 500);
    },
    [handleTemplateMutation, isStreaming, showToast]
  );

  const handleRegenerate = useCallback(() => {
    if (isStreaming) return;

    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!latestUserMessage) {
      showToast("There is no generation to regenerate", "info");
      return;
    }

    submitPrompt(latestUserMessage.content, latestUserMessage.attachments || []);
  }, [isStreaming, messages, showToast, submitPrompt]);

  const handleClearWorkspace = useCallback(() => {
    setMessages(initialMessages);
    setActiveTemplate(templateStore[0]);
    setSourceCode(templateStore[0].code);
    setViewport("preview");
    setEngineState("READY");
    showToast("Workspace reset", "success");
  }, [showToast]);

  const workspaceStats = useMemo(
    () => ({
      components: activeTemplate.components,
      tokens: activeTemplate.tokens,
      lines: sourceCode.split("\n").length,
    }),
    [activeTemplate, sourceCode]
  );

  return (
    <main className="aurora-shell">
      <TopBar
        engineState={engineState}
        latency={latency}
        workspaceName={workspaceName}
        setWorkspaceName={setWorkspaceName}
        device={device}
        setDevice={setDevice}
        workspaceStats={workspaceStats}
        onClearWorkspace={handleClearWorkspace}
        showToast={showToast}
      />

      <section className="aurora-workspace">
        <aside className="aurora-chat-column">
          <ChatPanel
            messages={messages}
            isStreaming={isStreaming}
            onSubmit={submitPrompt}
            onRegenerate={handleRegenerate}
            activeTemplate={activeTemplate}
          />
        </aside>

        <section className="aurora-preview-column">
          <PreviewViewport
            viewport={viewport}
            setViewport={setViewport}
            device={device}
            activeTemplate={activeTemplate}
            sourceCode={sourceCode}
            onRefresh={() => {
              showToast("Preview synchronized", "success");
            }}
          />
        </section>
      </section>

      {toast && (
        <div
          key={toast.id}
          className={`aurora-toast ${
            toast.type === "success"
              ? "aurora-toast-success"
              : toast.type === "error"
              ? "aurora-toast-error"
              : ""
          }`}
        >
          <span className="aurora-toast-dot" />
          <span>{toast.message}</span>
        </div>
      )}
    </main>
  );
}

export default App;
