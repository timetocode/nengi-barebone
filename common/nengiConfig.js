import nengi from 'nengi'
import TestEntity from './entity/TestEntity'
import TestMessage from './message/TestMessage'
import TestCommand from './command/TestCommand'

const config = {
    UPDATE_RATE: 20, 

    ID_BINARY_TYPE: nengi.UInt16,
    TYPE_BINARY_TYPE: nengi.UInt8, 

    ID_PROPERTY_NAME: 'nid',
    TYPE_PROPERTY_NAME: 'ntype', 

    USE_HISTORIAN: true,
    HISTORIAN_TICKS: 40,

    protocols: {
        entities: [
            ['TestEntity', TestEntity],
        ],
        localMessages: [],
        messages: [
            ['TestMessage', TestMessage],
        ],
        commands: [
            ['TestCommand', TestCommand]
        ],
        basics: []
    }
}

export default config