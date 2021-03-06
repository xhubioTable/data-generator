'use strict'

import assert from 'assert'

/**
 * The service registry stores all the generators by its name. So each generator could ask the service
 * for an other generator by its service name. So it is possible to compose a generator out of other
 * generators.
 * The registry is also used by the processor to access the generators.
 */

export default class TDGServiceRegistry {
  constructor() {
    /** The map to store the registered generators */
    this.services = new Map()
  }

  registerGenerator(serviceName, generator) {
    assert.ok(serviceName)
    assert.ok(generator)

    if (this.services.has(serviceName)) {
      // A service with the same name was already registred
      // eslint-disable-next-line no-console
      console.warn(
        `There was already a generator registered with the name '${serviceName}'`
      )
    }

    // The name the current generator was registered
    generator.name = serviceName

    // store the generator
    this.services.set(serviceName, generator)
  }

  /**
   * Calls the 'saveStore()' function of each registered Generator
   */
  async saveStore() {
    for (const genName of this.services.keys()) {
      const gen = this.services.get(genName)
      await gen.saveStore()
    }
  }

  /**
   * Calls the 'loadStore()' function of each registered Generator
   */
  async loadStore() {
    for (const genName of this.services.keys()) {
      const gen = this.services.get(genName)
      await gen.loadStore()
    }
  }

  /**
   * returns the generator with the given service namne.
   * If the generator could not be found an error is thrown.
   * @param serviceName {string} The name under the generator is registered
   */
  getGenerator(serviceName) {
    assert.ok(serviceName)

    if (!this.services.has(serviceName)) {
      throw new Error(
        `There was no generator registered with the name '${serviceName}'`
      )
    }

    return this.services.get(serviceName)
  }
}
