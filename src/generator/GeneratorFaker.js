import assert from 'assert'
import DataGeneratorBase from '../DataGeneratorBase'
import { execStringFunction } from '../helper'
import faker from 'faker'
import { getLoggerMemory } from '@xhubiotable/logger'

/**
 * This is a Generator using Faker to create Data. The Faker function to be used is
 * given as a parameter.
 */
export default class GeneratorFaker extends DataGeneratorBase {
  constructor(serviceRegistry, args = {}) {
    super(serviceRegistry, args)

    /** The logger used for logging */
    this.logger = args.logger ? args.logger : getLoggerMemory()

    /** Defines if the generated value must be unique. Default is 'false' */
    this.unique = false
  }

  /**
   * Generates the value and saves it for the given instance.
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this i undefined then always a new value will be created.
   * @param testcase {object} The already generated testcase object.
   * @param meta {object} Some meta information. tableName, row, column, ...
   * @param args {object/string} Any arguments the generator may need
   * @returns data {object} The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  generate(instanceId, testcase, meta, args) {
    assert.ok(instanceId)
    assert.ok(testcase)
    assert.ok(testcase.data)
    assert.ok(args)

    if (instanceId && this.instanceData.has(instanceId + args)) {
      return this.instanceData.get(instanceId + args)
    }
    const genData = this._doGenerate(instanceId + args, testcase, meta, args)
    if (genData !== undefined && instanceId) {
      this.instanceData.set(instanceId + args, genData)
    }
    return genData
  }

  /**
   * @see  DataGeneratorInterface._doGenerate
   * @private
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this i undefined then always a new value will be created.
   * @param testcase {object} The already generated testcase object.
   * @param meta {object} Some meta information. tableName, row, column, ...
   * @param args {object/string} Any arguments the generator may need
   * @returns data {object} The genrated data. If the data could not be generated because of missing data
   */
  // eslint-disable-next-line no-unused-vars
  _doGenerate(instanceId, testcase, meta, args) {
    if (args === undefined || typeof args !== 'string') {
      throw new Error(`If this generator is called, the name of the method must be given.
      See https://www.npmjs.com/package/faker for more details.
      If you would like to call faker.name.firstname() you have to give the arguments 'name.firstname'`)
    } else {
      try {
        return execStringFunction(args.split('.'), faker)
      } catch (err) {
        this.logger.error({
          message: err,
          generator: 'GeneratorFaker',
          testcase: testcase.name,
          args,
        })
        throw err
      }
    }
  }
}
