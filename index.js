const Orchestrator = require('./src/orchestrator');
class Index {

  constructor() {
    this.orchestrator = new Orchestrator();
  }

  async initialize() {
    await this.orchestrator.initialize();
  }

}

let index = new Index();
index.initialize();
