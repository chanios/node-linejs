# LineJS(No E2E Support)
LINE's selfbot libraries written in NodeJS.  

***

<h3 align="center">Latest Version: <a href="https://github.com/evex-dev/linejs">LINEJS</a> (E2EE Supported) </h1>

***

**Please note that this project is not heavily maintained and some functions are not tested yet.**

## Installation
```sh
npm install node-linejs
```

## Examples
More examples can be found [here](https://github.com/chanios/node-linejs/tree/main/examples/)
```js
const { Client } = require('node-linejs');
const bot = new Client();

bot.on('ready',()=>{console.log('Logged in as ' + bot.user.displayName)})

bot.on('message',(message)=>{
    if(message.author.id == bot.user.id) return;
    if(message.content == 'ping') {
        return message.channel.send('pong')
    }
})

bot.login()
```

## References
[LRTT/linepy](https://github.com/LRTT/linepy)

[LRTT/LINE-SERVICES](https://github.com/LRTT/LINE-SERVICES)

[crash-override404/linepy-modified](https://github.com/crash-override404/linepy-modified)

[herywinarto/SIMPLE-PROTECTV2](herywinarto/SIMPLE-PROTECTV2)

[discordjs/collection](https://www.npmjs.com/package/@discordjs/collection)
## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/">Creative Commons Attribution-NonCommercial 3.0 Unported License</a>.
