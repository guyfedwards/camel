// @ts-check
import Artifacts from './artifacts.js'

export default class Default {
  constructor () {
    this.state = {}
  }

  toJSON () {
    return this.state
  }

  /**
   * @param {string[]} script
   * @returns {Default}
   */
  afterScript (script) {
    this.state.after_script = []
      .concat(this.state.after_script, script)
      .filter(Boolean)
    return this
  }

  /**
   * @param {function} fn
   * @returns {Default}
   */
  artifacts (fn) {
    if (!this.state.artifacts) {
      this.state.artifacts = new Artifacts()
    }

    fn(this.state.artifacts)

    return this
  }

  /**
   * @param {string[]} script
   * @returns {Default}
   */
  beforeScript (script) {
    this.state.before_script = []
      .concat(this.state.before_script, script)
      .filter(Boolean)
    return this
  }

  /**
   * @param {string} image
   * @returns {Default}
   */
  image (image) {
    this.state.image = image
    return this
  }

  /**
   * @param {} services
   * @returns {}
   */
  services (services) {
    this.state.services = services
    return this
  }
}
