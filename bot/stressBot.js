import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig'
import TestCommand from '../common/command/TestCommand'

const protocolMap = new nengi.ProtocolMap(nengiConfig, nengi.metaConfig)

const address = 'ws://localhost:8079'
const numberOfBots = 30
const bots = new Map()

function connectNewBot(id) {
    const bot = new nengi.Bot(nengiConfig, protocolMap)
    bot.id = id

    bot.onConnect(response => {
        console.log('Bot attempted connection, response:', response)
        bot.tick = 0
    })

    bot.onClose(() => {
        bots.delete(bot.id)
    })

    bots.set(bot.id, bot)
    bot.connect(address, {})
}

for (let i = 0; i < numberOfBots; i++) {
    connectNewBot(i)
}

const loop = function() {
    bots.forEach(bot => {
        if (bot.websocket) {
            bot.readNetwork()

            if (Math.random() > 0.95) {
                bot.addCommand(new TestCommand('hi this is a command from a bot'))
            }

            bot.update()
            bot.tick++
        }
    })
}

setInterval(loop, 16)
