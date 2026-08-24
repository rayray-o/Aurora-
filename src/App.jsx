import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Command,
  FolderKanban,
  LogOut,
  Menu,
  Plus,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";

import ChatPanel from "./components/ChatPanel";
import PreviewViewport from "./components/PreviewViewport";
import TopBar from "./components/TopBar";

import {
  mockTemplates,
  resolveTemplate,
} from "./data/mockTemplates";

const DEFAULT_PROJECT = {
  id: "project-1",
  name: "Untitled project",
  template: mockTemplates.saas,
  messages: [],
};

export default function App() {
  const [projects, setProjects] = useState([DEFAULT_PROJECT]);
  const [activeProjectId, setActiveProjectId] =
    useState(DEFAULT_PROJECT.id);

  const [surface, setSurface] = useState("chat");
  const [previewMode, setPreviewMode] = useState("preview");
  const [streaming, setStreaming] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const [toast, setToast] = useState(null);

  const generationTimer = useRef(null);
  const toastTimer = useRef(null);

  const activeProject =
    projects.find((project) => project.id === activeProjectId) ||
    projects[0];

  const messages = activeProject?.messages || [];
  const template =
    activeProject?.template || mockTemplates.saas;

  const showToast = useCallback((message) => {
    setToast(message);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2600);
  }, []);

  const updateActiveProject = useCallback(
    (patch) => {
      setProjects((current) =>
        current.map((project) =>
          project.id === activeProjectId
            ? {
                ...project,
                ...patch,
              }
            : project
        )
      );
    },
    [activeProjectId]
  );

  const openPreview = useCallback(() => {
    setSurface("preview");
  }, []);

  const closePreview = useCallback(() => {
    setSurface("chat");
  }, []);

  const createProject = useCallback(() => {
    const id = `project-${Date.now()}`;

    const project = {
      id,
      name: "Untitled project",
      template: mockTemplates.saas,
      messages: [],
    };

    setProjects((current) => [
      project,
      ...current,
    ]);

    setActiveProjectId(id);
    setSurface("chat");
    setSidebarOpen(false);

    showToast("New project created");
  }, [showToast]);

  const selectProject = useCallback(
    (id) => {
      if (streaming) return;

      setActiveProjectId(id);
      setSurface("chat");
      setPreviewMode("preview");
      setSidebarOpen(false);
    },
    [streaming]
  );

  const submitPrompt = useCallback(
    (prompt) => {
      if (!prompt.trim() || streaming) return;

      const cleanPrompt = prompt.trim();

      const nextTemplate =
        resolveTemplate(cleanPrompt);

      const currentMessages =
        activeProject?.messages || [];

      const firstPrompt =
        currentMessages.length === 0;

      const generatedName = cleanPrompt
        .replace(
          /^(build|create|make|design|develop)\s+/i,
          ""
        )
        .split(/\s+/)
        .slice(0, 5)
        .join(" ")
        .replace(/[.!?]+$/, "");

      const nextName =
        firstPrompt && generatedName
          ? generatedName
          : activeProject.name;

      updateActiveProject({
        name:
          nextName === "Untitled project"
            ? "Untitled project"
            : nextName,
        messages: [
          ...currentMessages,
          {
            id: `${Date.now()}-user`,
            role: "user",
            content: cleanPrompt,
          },
        ],
      });

      setStreaming(true);

      if (generationTimer.current) {
        clearTimeout(generationTimer.current);
      }

      generationTimer.current = setTimeout(() => {
        updateActiveProject({
          template: nextTemplate,
          messages: [
            ...currentMessages,
            {
              id: `${Date.now()}-user`,
              role: "user",
              content: cleanPrompt,
            },
            {
              id: `${Date.now()}-assistant`,
              role: "assistant",
              content:
                `I built the first version around your request. ` +
                `The ${nextTemplate.name} workspace is ready to inspect.`,
              generation: {
                template: nextTemplate.name,
              },
            },
          ],
        });

        setStreaming(false);
        setSurface("preview");

        showToast(
          `Generated ${nextTemplate.name}`
        );
      }, 1350);
    },
    [
      activeProject,
      streaming,
      updateActiveProject,
      showToast,
    ]
  );

  const stopGeneration = useCallback(() => {
    if (generationTimer.current) {
      clearTimeout(generationTimer.current);
      generationTimer.current = null;
    }

    setStreaming(false);
    showToast("Generation stopped");
  }, [showToast]);

  const handleCommand = useCallback(() => {
    setCommandOpen(true);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setCommandOpen(true);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
        setSettingsOpen(false);

        if (surface === "preview") {
          setSurface("chat");
        }
      }

      if (
        event.key === "ArrowRight" &&
        surface === "chat" &&
        !event.target.matches(
          "input, textarea"
        )
      ) {
        setSurface("preview");
      }

      if (
        event.key === "ArrowLeft" &&
        surface === "preview" &&
        !event.target.matches(
          "input, textarea"
        )
      ) {
        setSurface("chat");
      }
    };

    window.addEventListener(
      "keydown",
      handler
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [surface]);

  useEffect(() => {
    return () => {
      clearTimeout(generationTimer.current);
      clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <main className="h-[100dvh] w-full bg-black text-white overflow-hidden">
      <TopBar
        projectName={activeProject?.name}
        surface={surface}
        status={streaming ? "building" : "ready"}
        onCommand={handleCommand}
        onToggleSidebar={() =>
          setSidebarOpen((value) => !value)
        }
        onSettings={() => setSettingsOpen(true)}
      />

      <div className="relative h-[calc(100dvh-58px)] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform:
              surface === "preview"
                ? "translate3d(-100vw,0,0)"
                : "translate3d(0,0,0)",
            transition:
              "transform 720ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          <section className="absolute inset-y-0 left-0 w-screen">
            <ChatPanel
              messages={messages}
              streaming={streaming}
              onSubmit={submitPrompt}
              onStop={stopGeneration}
              onOpenPreview={openPreview}
              projectName={activeProject?.name}
            />
          </section>

          <section className="absolute inset-y-0 left-[100vw] w-screen">
            <PreviewViewport
              template={template}
              mode={previewMode}
              setMode={setPreviewMode}
              onBack={closePreview}
            />
          </section>
        </div>

        {surface === "chat" && messages.length > 0 && (
          <button
            onClick={openPreview}
            className="
              absolute
              right-5
              bottom-5
              z-30
              hidden
              md:flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              border
              border-white/[.08]
              bg-[#0b0b0d]/90
              backdrop-blur-xl
              text-[10px]
              text-zinc-400
              hover:text-white
              hover:border-white/[.16]
              shadow-2xl
              transition-all
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b7ff2a]" />
            Open preview
            <ChevronRight size={13} />
          </button>
        )}

        {surface === "preview" && (
          <button
            onClick={closePreview}
            className="
              absolute
              left-5
              bottom-5
              z-50
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              border
              border-white/[.08]
              bg-[#0b0b0d]/90
              backdrop-blur-xl
              text-[10px]
              text-zinc-400
              hover:text-white
              hover:border-white/[.16]
              shadow-2xl
            "
          >
            <ChevronLeft size={13} />
            Back to chat
          </button>
        )}
      </div>

      {/* PROJECT SIDEBAR */}

      <div
        className={`
          fixed
          inset-y-0
          left-0
          z-[100]
          w-[310px]
          bg-[#080809]
          border-r
          border-white/[.07]
          shadow-[30px_0_100px_rgba(0,0,0,.5)]
          transition-transform
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="h-[58px] border-b border-white/[.06] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FolderKanban size={14} className="text-zinc-500" />
            <span className="text-[11px] font-medium">
              Projects
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-600 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={createProject}
            className="
              w-full
              h-10
              rounded-xl
              border
              border-white/[.08]
              bg-white/[.025]
              flex
              items-center
              justify-center
              gap-2
              text-[11px]
              text-zinc-300
              hover:bg-white/[.05]
              hover:text-white
            "
          >
            <Plus size={14} />
            New project
          </button>
        </div>

        <div className="px-2 space-y-1 overflow-y-auto max-h-[calc(100dvh-125px)]">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() =>
                selectProject(project.id)
              }
              className={`
                w-full
                text-left
                px-3
                py-3
                rounded-xl
                transition-all
                ${
                  project.id === activeProjectId
                    ? "bg-white/[.055] text-white"
                    : "text-zinc-600 hover:bg-white/[.025] hover:text-zinc-300"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  size={12}
                  className={
                    project.id === activeProjectId
                      ? "text-[#b7ff2a]"
                      : "text-zinc-700"
                  }
                />

                <span className="truncate text-[11px]">
                  {project.name}
                </span>
              </div>

              <div className="mt-1 ml-5 text-[9px] text-zinc-800">
                {project.messages.length} messages
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SETTINGS */}

      {settingsOpen && (
        <SettingsPanel
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* COMMAND */}

      {commandOpen && (
        <CommandPalette
          onClose={() => setCommandOpen(false)}
          onNewProject={createProject}
          onPreview={openPreview}
          onSettings={() => {
            setCommandOpen(false);
            setSettingsOpen(true);
          }}
        />
      )}

      {/* TOAST */}

      {toast && (
        <div
          className="
            fixed
            left-1/2
            bottom-6
            -translate-x-1/2
            z-[200]
            px-4
            py-2.5
            rounded-xl
            border
            border-white/[.09]
            bg-[#0c0c0e]/95
            backdrop-blur-xl
            shadow-2xl
            flex
            items-center
            gap-2
            text-[10px]
            text-zinc-300
            animate-aurora-in
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b7ff2a]" />
          {toast}
        </div>
      )}
    </main>
  );
}

function SettingsPanel({ onClose }) {
  const [email] = useState(
    "Sign in to connect your account"
  );

  return (
    <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-[440px] h-full bg-[#09090b] border-l border-white/[.07] shadow-2xl animate-aurora-in">
        <div className="h-[58px] border-b border-white/[.06] px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={14} className="text-zinc-500" />
            <span className="text-[11px] font-medium">
              Settings
            </span>
          </div>

          <button onClick={onClose}>
            <X size={16} className="text-zinc-600 hover:text-white" />
          </button>
        </div>

        <div className="p-5 space-y-8 overflow-y-auto h-[calc(100%-58px)]">
          <SettingSection title="Account">
            <SettingRow
              icon={User}
              title="Account"
              value={email}
            />

            <button className="w-full h-10 rounded-xl bg-white text-black text-[11px] font-medium flex items-center justify-center gap-2 hover:bg-zinc-200">
              <User size={13} />
              Continue with Google
            </button>

            <button className="w-full h-10 rounded-xl border border-white/[.07] text-zinc-500 text-[11px] flex items-center justify-center gap-2 hover:text-white">
              <LogOut size={13} />
              Sign out
            </button>
          </SettingSection>

          <SettingSection title="Workspace">
            <SettingRow
              title="Theme"
              value="Dark"
            />

            <SettingRow
              title="Accent"
              value="Aurora Green"
            />

            <SettingRow
              title="Editor"
              value="Automatic"
            />
          </SettingSection>

          <SettingSection title="Generation">
            <SettingRow
              title="Model"
              value="Aurora Engine"
            />

            <SettingRow
              title="Generation mode"
              value="Full build"
            />

            <SettingRow
              title="Auto-open preview"
              value="On"
            />
          </SettingSection>
        </div>
      </div>
    </div>
  );
}

function SettingSection({ title, children }) {
  return (
    <section>
      <div className="text-[9px] uppercase tracking-[.18em] text-zinc-700 mb-3">
        {title}
      </div>

      <div className="space-y-2">
        {children}
      </div>
    </section>
  );
}

function SettingRow({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="min-h-12 rounded-xl border border-white/[.06] bg-white/[.015] px-3 flex items-center gap-3">
      {Icon && (
        <Icon size={13} className="text-zinc-700" />
      )}

      <div className="flex-1">
        <div className="text-[10px] text-zinc-400">
          {title}
        </div>

        <div className="text-[9px] text-zinc-700 mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );
}

function CommandPalette({
  onClose,
  onNewProject,
  onPreview,
  onSettings,
}) {
  return (
    <div className="fixed inset-0 z-[180] bg-black/70 backdrop-blur-md flex items-start justify-center pt-[15vh]">
      <div className="w-[min(520px,calc(100vw-32px))] rounded-2xl border border-white/[.08] bg-[#0b0b0d] shadow-[0_40px_120px_rgba(0,0,0,.65)] overflow-hidden animate-aurora-scale-in">
        <div className="h-12 border-b border-white/[.06] px-4 flex items-center gap-3">
          <Command size={14} className="text-zinc-600" />
          <input
            autoFocus
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-xs text-white placeholder:text-zinc-700"
          />
          <kbd className="text-[9px] text-zinc-700">
            ESC
          </kbd>
        </div>

        <div className="p-2">
          <CommandItem
            icon={Plus}
            label="New project"
            shortcut="N"
            onClick={() => {
              onNewProject();
              onClose();
            }}
          />

          <CommandItem
            icon={ChevronRight}
            label="Open preview"
            shortcut="→"
            onClick={() => {
              onPreview();
              onClose();
            }}
          />

          <CommandItem
            icon={Settings}
            label="Settings"
            shortcut=","
            onClick={onSettings}
          />
        </div>
      </div>
    </div>
  );
}

function CommandItem({
  icon: Icon,
  label,
  shortcut,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 px-3 rounded-lg flex items-center gap-3 text-zinc-500 hover:bg-white/[.05] hover:text-white"
    >
      <Icon size={14} />
      <span className="flex-1 text-left text-[11px]">
        {label}
      </span>
      <kbd className="text-[9px] text-zinc-700">
        {shortcut}
      </kbd>
    </button>
  );
  }
