const kahoot = require('kahoot.js-updated')
const readline = require('readline')
const bot = new kahoot();
const http = require('http')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let gameID;
let userID = '';
let botAmount;

console.log('Kahoot answer cheat V1 by Kinetix')
rl.question("[Console] Enter a game pin: ", function(pin) {
    rl.question("[Console] Enter a name for your user: ", function(name) {
        rl.question('[Console] Enter the amount of bots you would like to use to flood the sever: ', function (amount) {
          console.log(`Your pin has been set to ${pin} and your user ID is ${name}`)
          gameID = pin;
          userID = name;
          botAmount = amount;
          rl.close()
        })
    });
});

function wait(n){
  n = n || 1;
  return new Promise(resolve=>{
    setTimeout(resolve,n * 1000);
  });
}

async function sendBots(pin,name,amount){
  for(let i = 0; i < amount;i++){
    const bot = new kahoot;
    await bot.join(pin,name + i);
    await wait(0.1);
  }
}

rl.on('close', function() {
    console.log('Bot successful logged on. Enjoy your win :)')
    try {
      sendBots(gameID, userID, botAmount)
      
    } catch (e) {
      console.log(e.stack)
      return console.log('Incorrect pin. Please restart the program and try again.')
    }
    let liveSessionClientToken = http.get(`http://kahoot.it/reserver/session/${gameID}`)
    if (liveSessionClientToken !== 'Not Found') {
      console.log('Handshake successful created')
    } else {
      console.log('Handshake failed. Is the Pin correct?')
    }
      
      
    bot.on("Joined", () => {
        console.log(`${userID} has joined the kahoot`);
      });
    bot.on("QuizStart", () => {
        console.log("The quiz has started");
      });
    bot.on("QuestionStart", question => {
        question.answer(0, {lag: 50});
        console.log(async resolve => await question.answer)
    })
})