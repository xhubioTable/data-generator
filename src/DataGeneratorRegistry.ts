import { type DataGeneratorInterface } from './InterfaceDataGenerator'
import { type DataGeneratorRegistryInterface } from './InterfaceDataGeneratorRegistry'

/**
 * The data generator registry stores all the generators by its name. So each generator could ask the service
 * for an other generator by its service name. So it is possible to compose a generator out of other
 * generators.
 * The registry is also used by the processor to access the generators.
 */
export class DataGeneratorRegistry implements DataGeneratorRegistryInterface {
  /** This map stortes all the data generators */
  services = new Map<string, DataGeneratorInterface>()

  /**
   * Registers a new Generator to the registry. If there already was a generator with the same name
   * an exception is thrown.
   * @throws GeneraorAlreadyExists
   * @param generatorName - The name of the generator
   * @param generator - The generator object
   */
  registerGenerator(
    generatorName: string,
    generator: DataGeneratorInterface
  ): void {
    if (this.services.has(generatorName)) {
      throw new Error(
        `The generator with the name '${generatorName}' already exists`
      )
    }

    // The name the current generator was registered
    generator.name = generatorName

    // store the generator
    this.services.set(generatorName, generator)
  }

  /**
   * Calls the 'saveStore()' function of each registered Generator
   */
  async saveStore(): Promise<void> {
    for (const genName of this.services.keys()) {
      const gen = this.services.get(genName) as DataGeneratorInterface
      await gen.saveStore()
    }
  }

  /**
   * Calls the 'loadStore()' function of each registered Generator
   */
  async loadStore(): Promise<void> {
    for (const genName of this.services.keys()) {
      const gen = this.services.get(genName) as DataGeneratorInterface
      await gen.loadStore()
    }
  }

  /**
   * Returns the generator with given name
   * @throws GeneraorNotExists
   * @param generatorName - The name of the generator
   * @returns generator - The registered Generator
   */
  getGenerator(generatorName: string): DataGeneratorInterface {
    if (!this.services.has(generatorName)) {
      throw new Error(
        `There was no generator registered with the name '${generatorName}'`
      )
    }

    return this.services.get(generatorName) as DataGeneratorInterface
  }
}
