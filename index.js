const { Client: AttClient } = require('att-client');
const { attConfig } = require('./Bot_Config');
const bot = new AttClient(attConfig);

newPlayers.insert(0, "King.Chaos");
var activePlayers = [];
var BlackListed = [];

const username = "Your Username";

bot.on('connect', async (connection) => {
  console.log(`[A TownShip Tale] bot has securely made a connection to ${connection.server.name}`);

  //Player State Changed
  connection.subscribe(`PlayerStateChanged`, message => {
    const { user, state, isEnter } = message.data;

    if (user === username && state === 'Combat' && isEnter === true) { 
      connection.send(`player message ${username} "Damage Taken" 5`);
      connection.send(`player set-stat ${username} health 9999`);
    };

  });

  //Player Chunk Moved
  connection.subscribe(`PlayerMovedChunk`, message => {
    const { player, newChunk, oldChunk } = message.data;

    if (oldChunk.startsWith(`Chunk 21-33`) && username === username) { 
      connection.send(`player set-stat ${username} speed 5`);
      connection.send(`player god-mode ${username} true`);
      connection.send(`player set-stat ${username} damage 5`);
    };

  });

  //Player Joined
  connection.subscribe(`PlayerJoined`, message => {
    const { user, position } = message.data;

    if (user.username != undefined) {
      activePlayers.push(user.username);
      console.log(`${user.username} Has made connection to ${connection.server.name}.`);
      console.log(activePlayers.length + ` are online globally.`);
    };
    
    if (BlackListed.includes(user.username)) {
      connection.send(`player kick ${user.id}`);
    };
    
    if (Position[0] === 0 && Position[1] === 0 && Position[2] === 0) {
      newPlayers.push(user.id);
      setTimeout(function() { connection.send(`player message ${user.username} "Welcome to ${connection.server.name}" 5`)}, 10000);
    };

  });

  //Social Tablet 
connection.subscribe(`SocialTabletPlayerReported`, async(message) => {
  const { ReportedBy, ReportedPlayer, Reason} = message.data;

  if (event.data.ReportedBy.username === King ) {
    connection.send(`player message ${King} "You are teleporting to ${ReportedPlayer}" 5`);
    await sleep(5000);
    connection.send(`player teleport ${King} ${ReportedPlayer.username}`)
  };

  
});


});
bot.start();