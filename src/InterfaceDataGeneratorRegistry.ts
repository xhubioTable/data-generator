import { type DataGeneratorInterface } from './InterfaceDataGenerator'

export interface DataGeneratorRegistryInterface {
  /**
   * Registers a new Generator to the registry. If there already was a generator with the same name
   * an exception is thrown.
   * @throws GeneraorAlreadyExists
   * @param generatorName - The name of the generator
   * @param generator - The generator object
   */
  registerGenerator: (
    generatorName: string,
    generator: DataGeneratorInterface
  ) => void

  /**
   * Calls the saveStore method on all the generators
   */
  saveStore: () => Promise<void>

  /**
   * Calls the loadStore method on all the generators
   */
  loadStore: () => Promise<void>

  /**
   * Returns the generator with given name
   * @throws GeneraorNotExists
   * @param generatorName - The name of the generator
   * @returns generator - The registered Generator
   */
  getGenerator: (generatorName: string) => DataGeneratorInterface
}
