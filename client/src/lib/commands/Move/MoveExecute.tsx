export const moveExecute = async ({ user, player, location, args }: CommandRenderOptions) => {

    let locationName;

    console.log('comando move')
    switch (args[1]) {
      case 'north':
        locationName = location.north
        break;
      case 'south':
        locationName = location.south
        break;
      case 'west':
        locationName = location.west
        break;
      case 'east':
        locationName = location.east
        break;
  
      default:
        return <p>Use command 'move' with a direction.</p>;
    }

    if (locationName === 'Nothing' || locationName === null) {
      return `You can't go there`
  
    }else {
      
      const moved = await postLocation(player.id, locationName);
      console.log(moved)
      return moved
    }

    return <div><p>You are on {location.name}</p>
    <p>North: {location.north}</p>
    </div>;
  }