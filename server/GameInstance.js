import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig'
import TestEntity from '../common/entity/TestEntity'
import TestMessage from '../common/message/TestMessage'

class GameInstance {
    constructor() {
        this.players = new Map()
        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        this.instance.onConnect((client, clientData, callback) => {
            const entity = new TestEntity()
            this.instance.addEntity(entity)

            client.entity = entity

            client.view = {
                x: 0,
                y: 0,
                halfWidth: 99999,
                halfHeight: 99999
            }

            callback({ accepted: true, text: 'Welcome!' })
        })

        this.instance.onDisconnect(client => {
            this.instance.removeEntity(client.entity)
        })

    }

    update(delta, tick, now) {
        let cmd = null
        while (cmd = this.instance.getNextCommand()) {
            const tick = cmd.tick
            const client = cmd.client

            for (let i = 0; i < cmd.commands.length; i++) {
                const command = cmd.commands[i]
                const entity = client.entity

                if (command.protocol.name === 'TestCommand') {
                    console.log('command', command)
                }
            }
        }

        // the only server-side game logic is to randomly send a test message
        if (Math.random() > 0.95) {
            this.instance.messageAll(new TestMessage('hi this is a message from the server'))
        }

        this.instance.update()
    }
}

export default GameInstance