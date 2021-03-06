import { getLoggerMemory } from '@xhubiotable/logger'

/**
 * The interface definition for all the data generators.
 * The Processor uses the data generators to create the data.
 */
export default class DataGeneratorInterface {
  /**
   * The service registry is used to make data generators available to other
   * generators. If a generator does not need access to other generators the
   * serviceRegistry my be left empty
   * @param serviceRegistry {object} The service registry with all the registered generators.
   * @param args {object} Any arguments to configure this generator.
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
      ...{ unique: true, maxUniqueTries: 100 },
      ...args,
    }

    /** The logger used for logging */
    this.logger = options.logger || getLoggerMemory()

    /** The registry where all the available generators are registered */
    this.serviceRegistry = serviceRegistry

    /**
     * If set to a true value the data generator should return unique values
     * What unique means depends on the generator. If the generator create more than one field
     * is up to the generator
     */
    this.unique = options.unique

    /** Defines how many tries the generator will do for getting a unique value until it throws an error */
    this.maxUniqueTries = options.maxUniqueTries

    /** Stores the data which needs to be unique */
    this.uniqueSet = new Set()

    /** Stores the data per testcase instance id */
    this.instanceData = new Map()

    /** The directory used to store the unique data */
    this.varDir = options.varDir ? options.varDir : 'var'

    /** Should this generator use a store */
    this.useStore = options.useStore

    /** Is set when this generator is registered in the service registry */
    this.name = 'UNKNOWN'
  }

  /**
   * Loads the data from the file.
   * @async
   */
  async loadStore() {
    throw new Error(`Implement this method`)
  }

  /**
   * Saves the data to the store
   * @async
   */
  async saveStore() {
    throw new Error(`Implement this method`)
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
   * @async
   */
  // eslint-disable-next-line no-unused-vars
  async generate(instanceId, testcase, todoGenerator) {
    if (instanceId && this.instanceData.has(instanceId)) {
      return this.instanceData.get(instanceId)
    }
    throw new Error(`Implement this method`)
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
   * @async
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
   * @async
   */
  // eslint-disable-next-line no-unused-vars
  async postProcess(instanceId, testcase, todoGenerator) {}
}
