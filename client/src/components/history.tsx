import { CommandProps } from 'MyModels';
import React from 'react';
import { selectHistory } from '../features/history/historySlice';
import { useAppSelector } from '../store/hooks';
import { AttackCommand } from './commands/AttackCommand';
import { BannerCommand } from './commands/BannerCommand';
import { CommandCommand } from './commands/CommandCommand';
import { MessageCommand } from './commands/MessageCommand';
import { HelpCommand } from './commands/HelpCommand';
import { LocationCommand } from './commands/LocationCommand';
import { NotFoundCommand } from './commands/NotFoundCommand';
import { InventoryCommand } from './commands/InventoryCommand';
import { StatsCommand } from './commands/StatsCommand';
import { EquipmentCommand } from './commands/EquipmentCommand';

export function History() {
  const history = useAppSelector(selectHistory);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const newHistory = (command: string, props: CommandProps | undefined) => {
    if (command === 'banner') {
      return <BannerCommand />;
    }
    if (command === 'commandNotFound') {
      return <NotFoundCommand props={props} />;
    }
    if (command === 'command') {
      return <CommandCommand props={props} />;
    }
    if (command === 'message') {
      return <MessageCommand props={props} />;
    }
    if (command === 'help') {
      return <HelpCommand />;
    }
    if (command === 'inventory') {
      return <InventoryCommand props={props} />;
    }
    if (command === 'stats') {
      return <StatsCommand props={props} />;
    }
    if (command === 'equipment') {
      return <EquipmentCommand props={props} />;
    }
    if (command === 'equip') {
      return <EquipmentCommand props={props} />;
    }
    if (command === 'location') {
      return <LocationCommand props={props} />;
    }
    if (command === 'move') {
      return <LocationCommand props={props} />;
    }
    if (command === 'attack') {
      return <AttackCommand props={props} />;
    }
  };

  return (
    <>
      <main>
        <div className="">
          <div className="">
            {history.map(({ command, index, props }) => {
              const Command = newHistory(command, props);
              return (
                <div className="pb-2" key={index}>
                  {Command}
                </div>
              );
            })}
          </div>
          <div ref={bottomRef} />
        </div>
      </main>
    </>
  );
}
