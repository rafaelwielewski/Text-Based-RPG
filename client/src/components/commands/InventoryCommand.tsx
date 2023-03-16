import React from 'react';
import { Inventory, Props } from 'MyModels';

export function InventoryCommand(props: Props) {
  const inventory: Inventory[] = props.props?.inventory || [];

  return (
    <div className="text-white">
      <ol className="pb-4">
        <div className="underline">Your items:</div>
        {inventory.map((inventory) => (
          <li key={inventory.item}>
            {inventory.item} ({inventory.quantity})
          </li>
        ))}
      </ol>
    </div>
  );
}
