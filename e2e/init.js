const {init, cleanup} = require('detox/internals');
const config = require('../package.json').detox;

beforeAll(async () => {
  await init(config, {initGlobals: true});
});

afterAll(async () => {
  await cleanup();
});
