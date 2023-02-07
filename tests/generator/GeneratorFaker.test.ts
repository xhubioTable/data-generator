import { LoggerMemory } from '@tlink/logger'
import {
  DataGeneratorOptions,
  DataGeneratorRegistry,
  GeneratorFaker
} from '../../src/index'
import { DataGeneratorGenerateRequest } from '../../src/InterfaceDataGenerator'

const options: DataGeneratorOptions = {
  logger: new LoggerMemory(),
  name: 'gumbo',
  registry: new DataGeneratorRegistry(),
  storeDir: '.'
}
const gen = new GeneratorFaker(options)

const CONFIG: DataGeneratorGenerateRequest = {
  config: {
    meta: { testcaseName: 'my test case' },
    parameter: 'name.firstName'
  },
  instanceId: '1',
  testcaseDataObject: {}
}
test('test GeneratorFaker', () => {
  const val = gen.generate({ ...CONFIG, instanceId: '1' })
  expect(val).toBeDefined()
})

test('test GeneratorFaker instanceid', () => {
  const val = gen.generate({ ...CONFIG, instanceId: '3' })
  const val1 = gen.generate({ ...CONFIG, instanceId: '3' })
  expect(val).toEqual(val1)
})
