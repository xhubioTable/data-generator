import path from 'path'
import fs from 'fs'
import util from 'util'
import mkdirp from 'mkdirp'

import DataGeneratorInterface from './DataGeneratorInterface'

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const fileAccess = util.promisify(fs.access)

const md = util.promisify(mkdirp)

/**
 * The Base Generator implementation.
 * This class implements loading and saving of the generated data.
 * Also it handels the instance id. If a generator is called with the same
 * instance id it is expected that the generator returns the same data.
 */
export default class DataGeneratorBase extends DataGeneratorInterface {
  /**
   * The service registry is used to make data generators available to other
   * generators. If a generator does not need access to other generators the
   * serviceRegistry my be left empty
   */
  constructor(serviceRegistry, args = {}) {
    const options = {
      ...{ varDir: 'var', useStore: false },
      ...args,
    }

    super(serviceRegistry, options)

    /** the file name used to store the data */
    this.storeName = options.storeName
      ? options.storeName
      : this.constructor.name

    /** The data here will be save and loaded */
    this.store = {}
  }

  /**
   * returns the name under which the data is stored
   */
  get storeFileName() {
    return path.join(this.varDir, this.storeName + '.json')
  }

  /**
   * Loads the data from the file
   */
  async loadStore() {
    if (this.useStore) {
      await md(this.varDir)

      try {
        await fileAccess(this.storeFileName, fs.constants.F_OK)
        // The file exists we can load it
        const storeDataRaw = await readFile(this.storeFileName)
        this.store = JSON.parse(storeDataRaw)
      } catch (e) {
        // eslint-disable-line no-unused-vars
        // There is no existing file. prepare empty data
        this.store = { uniqueSet: [], instanceData: [] }
      }

      // Get the data from the store and stores them in the set and map
      this.clearContext()
      this.uniqueSet = new Set(this.store.uniqueSet)
      this.instanceData = new Map(this.store.instanceData)

      delete this.store.uniqueSet
      delete this.store.instanceData
    }
  }

  /**
   * Saves the data to the store
   */
  async saveStore() {
    if (this.useStore) {
      // Stores the data from the SET and MAP into the store
      this.store.uniqueSet = Array.from(this.uniqueSet)
      this.store.instanceData = Array.from(this.instanceData)

      await md(this.varDir)

      if (Object.keys(this.store).length > 0) {
        const storeDataRaw = JSON.stringify(this.store, null, 2)
        await writeFile(this.storeFileName, storeDataRaw)
      }
    }
  }

  /**
   * Gibt die Daten zurück wie sie in den Store geschrieben werden würden
   *
   * @return storeData {object} Der Daten wie sie im Store geschrieben werden würden
   */
  getStoreData() {
    return {
      uniqueSet: Array.from(this.uniqueSet),
      instanceData: Array.from(this.instanceData),
    }
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
  async generate(instanceId, testcase, todoGenerator) {
    if (instanceId && this.instanceData.has(instanceId)) {
      return this.instanceData.get(instanceId)
    }

    try {
      const genData = await this._doGenerate(
        instanceId,
        testcase,
        todoGenerator
      )
      if (genData !== undefined && instanceId) {
        this.instanceData.set(instanceId, genData)
      }
      return genData
    } catch (err) {
      const testcaseName = testcase ? testcase.name : undefined
      const tableName = todoGenerator ? todoGenerator.tableName : 'unknown'
      const fieldName = todoGenerator ? todoGenerator.fieldName : 'unknown'

      await this.logger.error({
        message: err.message,
        function: 'generate',
        testcaseName,
        tableName,
        fieldName,
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
  async createPostProcessTodos(instanceId, testcase, todoGenerator) {
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
  async postProcess(instanceId, testcase, todoGenerator) {}

  /**
   * This method returns the generated data. It must not update the data in the testcase.
   * @see  generate
   */
  // eslint-disable-next-line no-unused-vars
  async _doGenerate(instanceId, testcase, todoGenerator) {}
}
