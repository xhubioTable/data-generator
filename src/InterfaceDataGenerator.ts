import { LoggerInterface } from '@tlink/logger'
import { DataGeneratorRegistryInterface } from './InterfaceDataGeneratorRegistry'
import { DataGeneratorConfigInterface } from './InterfaceDataGeneratorConfig'
import { PostProcessAction } from './InterfacePostProcessAction'

export interface DataGeneratorInterface {
  /** The Logger for this generator */
  logger: LoggerInterface

  /** The service registry where all the generators are registered */
  registry: DataGeneratorRegistryInterface

  /**
   * If set to a true value the data generator should return unique values
   * What unique means depends on the generator. If the generator create more than one field
   * is up to the generator
   */
  unique: boolean

  /** Defines how many tries the generator will do for getting a unique value until it throws an error */
  maxUniqueTries: number

  /** Stores the data which needs to be unique */
  uniqueSet: Set<string | number>

  /** Stores the data per testcase instance id */
  instanceData: Map<string, any>

  /** The directory used to store the unique data */
  storeDir: string

  /** Should this generator use a store */
  useStore: boolean

  /** The name for the storage of the generated data. If useStore===true */
  storeName: string

  /** Is set when this generator is registered in the service registry */
  name: string

  /**
   * Loads the store data from the file. The store is used to persist generated data
   * over multiple data generator runs
   */
  loadStore: () => Promise<void>

  /**
   * Saves the data to the store
   */
  saveStore: () => Promise<void>

  /**
   * Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown
   * @param generatorName - The name the generator was registered in the registry.
   */
  getGenerator: (generatorName: string) => DataGeneratorInterface

  /**
   * Resets the context. The context stores the already generated data and is used
   * also to check if data is unique.
   */
  clearContext: () => void

  /**
   * Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown
   * @param request - The request as described in @see DataGeneratorGenerateRequest
   * @returns generatedData - The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  generate: (request: DataGeneratorGenerateRequest) => Promise<any | undefined>

  /**
   * Creates the postProcessTodos. Each generator could creates todos which will be executed later on.
   * Sometimes a generator needs to wait for other generators created there data.
   * This function is called after the 'generate' function
   * @param request - The request as described in @see DataGeneratorGenerateRequest
   * @returns generateActions - The generated postProcess actions
   */
  createPostProcessActions: (
    request: DataGeneratorGenerateRequest
  ) => Promise<PostProcessAction[] | undefined>

  /**
   * This method will be called after the generate method of all the generators are called.
   * The order is the same as before.
   * This method does not return any data. It could update the data directly if needed
   * @param request - The request as described in @see DataGeneratorGenerateRequest
   */
  postProcess: (request: DataGeneratorGenerateRequest) => Promise<void>
}

export interface DataGeneratorGenerateRequest {
  /**
   * The testcase instance id. for the same instance id the same data object
   * will be returned. If this is undefined then always a new value will be created.
   */
  instanceId: string

  /** The already generated testcase data object. */
  testcaseDataObject?: any

  /** Any additional parameter for this generator call */
  config: DataGeneratorConfigInterface
}
