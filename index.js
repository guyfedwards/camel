import yaml from 'yaml'
import Default from './lib/default.js'
import fs from 'node:fs/promises'

class Camel {
  constructor (config = {}) {
    this.state = {}

    if (config.stages) {
      this.state.stages = config.stages
    }
  }

  stage (s) {
    this.state.stages = [].concat(this.state.stages, s).filter(Boolean)
    return this
  }

  default () {
    if (!this.state.default) {
      this.state.default = new Default()
    }

    return this.state.default
  }

  toYaml () {
    return yaml.stringify(this.state)
  }

  async writeFile (path) {
    await fs.writeFile(path, this.toYaml())
  }
}

export default Camel
