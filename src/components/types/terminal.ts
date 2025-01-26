export interface Command {
  name: string;
  description: string;
  action: () => string[];
}

export interface CommandList {
  [key: string]: Command;
}

export interface HistoryItem {
  id: string;
  type: "command" | "response";
  content: string;
  timestamp: Date;
}

export interface TerminalState {
  commandHistory: string[];
  outputHistory: HistoryItem[];
  currentPath: string;
  historyIndex: number;
}

export interface TerminalProps {
  initialPath?: string;
  theme?: "dark" | "light";
}

export interface TerminalContextType {
  state: TerminalState;
  dispatch: React.Dispatch<TerminalAction>;
}
