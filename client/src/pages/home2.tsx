import { Input } from "@/components/Input";
import { useCommands } from "@/hooks/useCommands";
import { loadCommands } from "@/lib/Command";
import authService from "@/lib/services/auth/auth.service";
import useAuthVerify from "@/lib/services/auth/authVerify";
import * as React from "react";
import { Route, Routes, useNavigate, redirect } from 'react-router-dom';


export default function App() {

  const containerRef = React.useRef<HTMLDivElement>(null);
  const commands = useCommands();
  

  const _loadCommands = React.useCallback(async () => {
    commands.state.setCommandMap(await loadCommands());
  }, []); // eslint-disable-line


  React.useEffect(() => {
    _loadCommands();
  }, [_loadCommands]);

  return (
    <div className="bg-darkest h-full">
    <div ref={containerRef} className="">
      {commands.state.entries.map((entry, idx) => {
        const commandEntry = entry.command !== null ? entry : null;
        const showInputField = typeof entry.command !== "undefined" || !entry.output;

        return (
          <div key={idx} data-status={commandEntry?.status} data-entry={idx}>
            {showInputField ? (
              <Input
                entry={commandEntry}
                handleNewCommand={(command) => commands.handleNewCommand(command, idx)}
              />
            ) : null}

            <div
              style={{ lineHeight: "normal" }}
              className="ml-[52px] whitespace-pre-wrap text-white"
              data-output={idx}
            >
              {entry.output}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}