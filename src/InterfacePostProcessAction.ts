import { type DataGeneratorConfigMetaInterface } from './InterfaceDataGeneratorConfigMeta'

export interface PostProcessAction {
  /** The configuration for the generator call */
  config: DataGeneratorConfigMetaInterface

  /** The generator to call */
  generatorName: string
}
