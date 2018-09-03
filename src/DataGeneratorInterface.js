'use strict'

import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import jsonfile from 'jsonfile'
import { getLoggerMemory } from '@xhubiotable/logger'

export default class DataGeneratorInterface {
  /**
   * The service registry is used to make data generators available to other
   * generators. If a generator does not need access to other generators the
   * serviceRegistry my be left empty
   */
  constructor(
    serviceRegistry = {
      getGenerator: () => {
        throw new Error('No service registry definend')
      },
    },
    args = {}
  ) {
    const options = {
      ...{ unique: true, maxUniqueTries: 100, varDir: 'var', useStore: false },
      ...args,
    }

    this.logger = options.logger || getLoggerMemory()

    this.serviceRegistry = serviceRegistry

    // if set to a true value the data generator should return unique values
    // What unique means depends on the generator. If the generator create more than one field
    // is up to the generator
    this.unique = options.unique

    // defines how many tries the generator will do for getting a unique value until it throws an error
    this.maxUniqueTries = options.maxUniqueTries

    // Stores the data which needs to be unique
    this.uniqueSet = new Set()

    // Stores the data per testcase instance id
    this.instanceData = new Map()

    // The directory used to store the unique data
    this.varDir = options.varDir

    // should this generator use a store
    this.useStore = options.useStore

    // the file name used to store the data
    this.storeName = options.storeName
      ? options.storeName
      : this.constructor.name

    // The data here will be save and loaded
    this.store = {}

    // will be set when registered in the registry
    this.name = 'UNKNOWN'

    if (this.useStore) {
      this.loadStore()
    }
  }

  storeFileName() {
    return path.join(this.varDir, this.storeName + '.json')
  }

  loadStore() {
    // eslint-disable-next-line no-sync
    if (!fs.existsSync(this.varDir)) {
      mkdirp(this.varDir)
    }

    // eslint-disable-next-line no-sync
    if (fs.existsSync(this.storeFileName())) {
      // eslint-disable-next-line no-sync
      this.store = jsonfile.readFileSync(this.storeFileName())
    } else {
      this.store = { uniqueSet: [], instanceData: [] }
    }

    // Get the data from the store and stores them in the set and map
    this.clearContext()
    this.uniqueSet = new Set(this.store.uniqueSet)
    this.instanceData = new Map(this.store.instanceData)

    delete this.store.uniqueSet
    delete this.store.instanceData
  }

  saveStore() {
    // Stores the data from the SET and MAP into the store
    this.store.uniqueSet = Array.from(this.uniqueSet)
    this.store.instanceData = Array.from(this.instanceData)

    // eslint-disable-next-line no-sync
    if (!fs.existsSync(this.varDir)) {
      mkdirp(this.varDir)
    }

    if (Object.keys(this.store).length > 0) {
      // eslint-disable-next-line no-sync
      jsonfile.writeFileSync(this.storeFileName(), this.store)
    }
  }

  /**
   * Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown
   * @param serviceName {string} The name of the registered data generator
   * @returns generator {object} The generator
   */
  getGenerator(generatorName) {
    const gen = this.serviceRegistry.getGenerator(generatorName)
    if (!gen || gen === undefined) {
      throw new Error(
        `The generator with the name '${generatorName}' was not registered in the registry`
      )
    }
    return gen
  }

  /**
   * Resets the context. The context stores the already generated data and is used
   * also to check if data is unique.
   */
  clearContext() {
    this.uniqueSet = new Set()
    this.instanceData = new Map()
  }

  /**
   * Generates the value and saves it for the given instance.
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this is undefined then always a new value will be created.
   * @param testcase {object} The already generated testcase data object.
   * @param todoGenerator {object} The generator todo
   * @returns data {object} The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  generate(instanceId, testcase, todoGenerator) {
    if (instanceId && this.instanceData.has(instanceId)) {
      return this.instanceData.get(instanceId)
    }

    try {
      const genData = this._doGenerate(instanceId, testcase, todoGenerator)
      if (genData !== undefined && instanceId) {
        this.instanceData.set(instanceId, genData)
      }
      return genData
    } catch (err) {
      const testcaseName = testcase ? testcase.name : undefined

      this.logger.error({
        message: err.message,
        function: 'generate',
        testcaseName,
        tableName: todoGenerator.tableName,
        fieldName: todoGenerator.fieldName,
        stack: err.stack,
      })
    }
  }

  /**
   * Creates the postProcessTodos. Each generator could creates todos which will be executed later on.
   * Sometimes a generator needs to wait for other generators created there data.
   * This function is called after the 'generate' function
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this is undefined then always a new value will be created.
   * @param testcase {object} The already generated testcase data object.
   * @param todoGenerator {object} The generator todo
   * @returns todos {array} The generated postProcessTodos
   */
  // eslint-disable-next-line no-unused-vars
  createPostProcessTodos(instanceId, testcase, todoGenerator) {
    return
  }

  /**
   * This method will be called after the generate method of all the generators are called.
   * The order is the same as before.
   * This method does not return any data. It could update the data directly if needed
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this is undefined then always a new value will be created.
   * @param testcase {object} The already generated testcase object.
   * @param todoGenerator {object} The todo action for the postprocessing
   */
  // eslint-disable-next-line no-unused-vars
  postProcess(instanceId, testcase, todoGenerator) {}

  /**
   * This method returns the generated data. It must not update the data in the testcase.
   * @see  generate
   */
  // eslint-disable-next-line no-unused-vars
  _doGenerate(instanceId, testcase, todoGenerator) {}

  /**
   * Returns the context of this generator. So you have the complete data generated
   */
  getModel() {
    return this.instanceData
  }
}
