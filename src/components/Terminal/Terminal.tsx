import { useState } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalInput from "./TerminalInput";
import { useTerminal } from "../hooks/useTerminal";

export default function Terminal() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { output, executeCommand } = useTerminal();

  const renderHelpLine = (content: string) => {
    const parts = content.split(" - ");
    if (parts.length === 2) {
      return (
        <>
          <span className="text-red-500">{parts[0]}</span>
          <span className="text-gray-200"> - {parts[1]}</span>
        </>
      );
    }
    return content;
  };

  return (
    <div className="min-h-screen  bg-[url('/trotro-mais-où-sont-passés-mes-vêtements.gif')] flex items-center justify-center p-4">
      <div
        className={`
        bg-[#1a1b26] rounded-lg shadow-xl overflow-hidden transition-all duration-300
        ${isFullScreen ? "w-[1000px] h-[800px]" : "w-[800px] h-[600px]"}
      `}
      >
        <TerminalHeader onFullScreen={setIsFullScreen} />
        <div
          className={`
  p-4 overflow-y-auto flex flex-col space-y-2 font-mono text-gray-200
  ${isFullScreen ? "h-[calc(800px-40px)]" : "h-[calc(600px-40px)]"}
`}
        >
          {output.map((line) => (
            <div
              key={line.id}
              dangerouslySetInnerHTML={{ __html: line.content }}
              className={`
                whitespace-pre-wrap break-words
                ${line.type === "command" ? "text-green-500" : "text-gray-200"}
                `}
            />
          ))}
          <TerminalInput onCommand={executeCommand} />
        </div>
      </div>
    </div>
  );
}
