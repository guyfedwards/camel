// @ts-check
import { whenOptions } from './constants.js'

export default class Artifacts {
  constructor () {
    this.state = {}
  }

  toJSON () {
    return this.state
  }

  /**
   * @param {string[]} exclude
   * @returns {this}
   */
  exclude (exclude) {
    this.state.exclude = []
      .concat(this.state.exclude, exclude)
      .filter(Boolean)

    return this
  }

  /**
   * @param {string} expiry
   * @returns {Artifacts}
   */
  expireIn (expiry) {
    this.state.expire_in = expiry

    return this
  }

  /**
   * @param {string} name
   * @returns {Artifacts}
   */
  exposeAs (name) {
    this.state.expose_as = name

    return this
  }

  /**
   * @param {string} name
   * @returns {Artifacts}
   */
  name (name) {
    this.state.name = name

    return this
  }

  /**
   * @param {string[]} paths
   * @returns {Artifacts}
   */
  paths (paths) {
    this.state.paths = []
      .concat(this.state.paths, paths)
      .filter(Boolean)

    return this
  }

  /**
   * @param {boolean} isPublic
   * @returns {Artifacts}
   */
  public (isPublic) {
    if (typeof isPublic !== 'boolean') {
      throw TypeError('Artifacts.public expects a boolean')
    }

    this.state.public = isPublic

    return this
  }

  /**
   * @param {object} reports
   * @returns {Artifacts}
   */
  reports (reports) {
    this.state.reports = {
      ...this.state.reports,
      ...reports
    }

    return this
  }

  /**
   * @param {boolean} isUntracked
   * @returns {Artifacts}
   */
  untracked (isUntracked) {
    if (typeof isUntracked !== 'boolean') {
      throw TypeError('Artifacts.untracked expects a boolean')
    }

    this.state.untracked = isUntracked

    return this
  }

  /**
   * @param {string} when
   * @returns {Artifacts}
   */
  when (when) {
    if (!whenOptions.includes(when)) {
      throw TypeError(`Artifacts.when expects one of ${whenOptions.join(', ')}`)
    }

    this.state.when = when

    return this
  }
}
