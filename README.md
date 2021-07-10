# LineJS
LINE's selfbot libraries written in NodeJS.

## Installation
```sh
npm install @fortune-inc/linejs
```

## Examples
More examples can be found [here](https://github.com/Fortune-Inc/linejs/tree/main/examples/)
```js
const Client = require('../src/Client/Client');
const bot = new Client();

bot.on('ready',()=>{console.log('Logged in as ' + bot.user.displayName)})

bot.on('message',
    async(message)=>{
        if(message.author.id == bot.user.id) return;
        if(message.content == 'ping') {
            await message.channel.send('pong')
        }
    }
)

bot.login()
```

## References
[LRTT/linepy](https://github.com/LRTT/linepy)

[LRTT/LINE-SERVICES](https://github.com/LRTT/LINE-SERVICES)

[crash-override404/linepy-modified](https://github.com/crash-override404/linepy-modified)

[herywinarto/SIMPLE-PROTECTV2](herywinarto/SIMPLE-PROTECTV2)
