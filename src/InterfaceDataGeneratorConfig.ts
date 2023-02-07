import { DataGeneratorConfigMetaInterface } from './InterfaceDataGeneratorConfigMeta'

/**
 * Defines the config object for the generator call
 */
export interface DataGeneratorConfigInterface {
  /** meta information for the generator */
  meta: DataGeneratorConfigMetaInterface

  /** Any additional parameter for the generator */
  parameter?: any
}
