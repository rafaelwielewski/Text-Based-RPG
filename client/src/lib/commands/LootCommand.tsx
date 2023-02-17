import { getLoot } from "@/api";
import { Command } from "../Command";

export default class LootCommand extends Command {
  constructor() {
    super({ name: "loot" });
  }

//   async loot(drop, args) {
//     switch (args[1]) {
//       case 'all':
//         const looted = await getLoot(drop);
//         return looted;
//         break;
//       default:
//         return { render: <p>Use command 'loot' followed by "all" or drop name.</p>, data:'' };

//   }
// }
  
  async render(args, drop): JSX.Element | render | string | { render: JSX.Element | string, data: any} {
    console.log(drop)
    
    if (args[1] === 'all' && drop) {
      await getLoot(drop);
      return { render: <p>You looted All</p>, data:'looted'};
    } if (args[1] === 'all' && !drop) {
      return { render: <p>There's no drops to loot.</p>, data:'looted'};
    }
    
    else {
      return { render: <p>Use command 'loot' followed by "all" or drop name.</p>, data:'' };
    }
  //   switch (args[1]) {
  //     case 'all':
  //       const looted = await getLoot(drop);
  //       break;
  //     default:
  //       return { render: <p>Use command 'loot' followed by "all" or drop name.</p>, data:'' };
  // }

  
  }
}
