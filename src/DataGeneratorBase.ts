import path from 'path'
import fs from 'fs'
import {
  DataGeneratorInterface,
  DataGeneratorGenerateRequest
} from './InterfaceDataGenerator'
import { DataGeneratorRegistryInterface } from './InterfaceDataGeneratorRegistry'
import { LoggerInterface } from '@tlink/logger'
import { PostProcessAction } from './InterfacePostProcessAction'

/**
 * Defines the option for the DataGenerator Constructor
 */
export interface DataGeneratorOptions {
  /** Is set when this generator is registered in the service registry */
  name: string

  /** The registry all the generators are registered */
  registry: DataGeneratorRegistryInterface

  /** The Logger for this generator */
  logger: LoggerInterface

  /**
   * If set to a true value the data generator should return unique values
   * What unique means depends on the generator. If the generator create more than one field
   * is up to the generator
   */
  unique?: boolean

  /** The directory used to store the unique data */
  storeDir?: string

  /** The of the file used to store the generated data if useStoree===true */
  storeName?: string

  /** Should this generator use a store */
  useStore?: boolean
}

/** When a Map is serialized it is done in tuples */
type InstanceDataTuple = [string, any]

interface StoreInterface {
  /** The serialized form of the Set */
  uniqueSet: Array<string | number>

  /** The list of tuples of the Serialized Map */
  instanceData: InstanceDataTuple[]
}

/**
 * The Base Generator implementation.
 * This class implements loading and saving of the generated data.
 * Also it handels the instance id. If a generator is called with the same
 * instance id it is expected that the generator returns the same data.
 */
export class DataGeneratorBase implements DataGeneratorInterface {
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

  constructor(options: DataGeneratorOptions) {
    this.name = options.name
    this.logger = options.logger
    this.registry = options.registry

    this.unique = options.unique ?? false
    this.storeDir = options.storeDir ?? 'store'
    this.storeName = options.storeName ?? this.constructor.name
    this.useStore = options.useStore ?? false

    this.maxUniqueTries = 20
    this.uniqueSet = new Set()
    this.instanceData = new Map()
  }

  /**
   * Creates the file name under which the data is stored
   * @returns fileName - The generated file name
   */
  protected getStoreFileName(): string {
    return path.join(this.storeDir, this.storeName + '.json')
  }

  /**
   * Resets the context. The context stores the already generated data and is used
   * also to check if data is unique.
   */
  public clearContext(): void {
    this.uniqueSet = new Set()
    this.instanceData = new Map()
  }

  /**
   * Loads the data from the file
   */
  public async loadStore(): Promise<void> {
    if (this.useStore) {
      await fs.promises.mkdir(this.storeDir, { recursive: true })

      try {
        const store: StoreInterface = JSON.parse(
          await fs.promises.readFile(this.getStoreFileName(), 'utf8')
        )
        this.uniqueSet = new Set(store.uniqueSet)
        this.instanceData = new Map(store.instanceData)
      } catch (error) {
        this.clearContext()
      }
    }
  }

  /**
   * Saves the data to the store
   */
  public async saveStore(): Promise<void> {
    if (this.useStore) {
      const store: StoreInterface = {
        uniqueSet: Array.from(this.uniqueSet),
        instanceData: Array.from(this.instanceData)
      }
      await fs.promises.mkdir(this.storeDir, { recursive: true })

      if (this.uniqueSet.size > 0 || this.instanceData.size > 0) {
        const storeDataRaw = JSON.stringify(store, null, 2)
        await fs.promises.writeFile(this.getStoreFileName(), storeDataRaw)
      }
    }
  }

  /**
   * Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown
   * @throws GeneratorDoesNotExistsException
   * @param serviceName - The name of the registered data generator
   * @returns generator - The generator
   */
  public getGenerator(generatorName: string): DataGeneratorInterface {
    const gen = this.registry.getGenerator(generatorName)
    if (!gen || gen === undefined) {
      throw new Error(
        `The generator with the name '${generatorName}' was not registered in the registry`
      )
    }
    return gen
  }

  /**
   * Generates the value and saves it for the given instance.
   * @param request - The parameter as defined in @see DataGeneratorGenerateRequest
   * @returns data - The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  public async generate(request: DataGeneratorGenerateRequest): Promise<any> {
    const { instanceId, config } = request

    if (instanceId && this.instanceData.has(instanceId)) {
      return this.instanceData.get(instanceId)
    }

    try {
      const genData = await this.doGenerate(request)

      if (genData !== undefined && instanceId) {
        this.instanceData.set(instanceId, genData)
      }
      return genData
    } catch (err) {
      const testcaseName = config.meta.testcaseName
      const tableName = config.meta.tableName ?? 'unknown'
      const fieldName = config.meta.fieldName ?? 'unknown'

      await this.logger.error({
        message: (err as Error).message,
        function: 'generate',
        testcaseName,
        tableName,
        fieldName,
        stack: (err as Error).stack
      })
    }
  }

  /**
   * Creates the postProcessTodos. Each generator could creates todos which will be executed later on.
   * Sometimes a generator needs to wait for other generators created there data.
   * This function is called after the 'generate' function
   * @param request - The parameter as defined in @see DataGeneratorGenerateRequest
   * @returns actions - The generated postProcessActions or undefined
   */
  public async createPostProcessActions(
    request: DataGeneratorGenerateRequest
  ): Promise<PostProcessAction[] | undefined> {
    return undefined
  }

  /**
   * This method will be called after the generate method of all the generators are called.
   * The order is the same as before.
   * This method does not return any data. It could update the data directly if needed
   * @param request - The parameter as defined in @see DataGeneratorGenerateRequest
   */
  // eslint-disable-next-line no-unused-vars
  public async postProcess(
    request: DataGeneratorGenerateRequest
  ): Promise<void> {}

  /**
   * This method returns the generated data. It must not update the data in the testcase.
   * @see  generate
   */
  protected async doGenerate(
    request: DataGeneratorGenerateRequest
  ): Promise<any> {}
}
