import { DataGeneratorBase, DataGeneratorOptions } from '../DataGeneratorBase'
import { execStringFunction } from './execStringFunction'
import { faker } from '@faker-js/faker'
import { DataGeneratorGenerateRequest } from '../InterfaceDataGenerator'

/**
 * This is a Generator using Faker to create Data. The Faker function to be used is
 * given as a parameter.
 */
export class GeneratorFaker extends DataGeneratorBase {
  constructor(options: DataGeneratorOptions) {
    super(options)

    /** Defines if the generated value must be unique. Default is 'false' */
    this.unique = false
  }

  /**
   * Generates the value and saves it for the given instance.
   * @param request - The parameter as defined in @see DataGeneratorGenerateRequest
   * @returns data - The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  public async generate(
    request: DataGeneratorGenerateRequest
  ): Promise<any | undefined> {
    const { instanceId, config } = request

    if (
      config.parameter === undefined ||
      config.parameter === '' ||
      typeof config.parameter !== 'string'
    ) {
      throw new Error(
        'No Arguments given for Generator Faker. The argument defines which faker function to call'
      )
    }

    const args = config.parameter

    if (instanceId && this.instanceData.has(instanceId + args)) {
      return this.instanceData.get(instanceId + args)
    }
    const genData = await this.doGenerate(request)
    if (genData !== undefined && instanceId) {
      this.instanceData.set(instanceId + args, genData)
    }
    return genData
  }

  /**
   * This method returns the generated data. It must not update the data in the testcase.
   * @see  generate
   */
  protected async doGenerate(
    request: DataGeneratorGenerateRequest
  ): Promise<any> {
    const { config } = request

    const args = config.parameter
    try {
      return execStringFunction(args.split('.'), faker)
    } catch (err) {
      await this.logger.error({
        message: err,
        generator: 'GeneratorFaker',
        testcase: config.meta.testcaseName,
        args
      })
      throw err
    }
  }
}
