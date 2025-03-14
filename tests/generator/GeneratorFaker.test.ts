import { TodoGeneratorInterface } from '@xhubiotable/model'
import { DataGeneratorRegistry, GeneratorFaker } from '../../src/index'

const gen = new GeneratorFaker({
  generatorRegistry: new DataGeneratorRegistry(),
  name: 'dummy1'
})

const DEFAULT: TodoGeneratorInterface = {
  config: '',
  fieldName: 'field1',
  generatorName: 'generator1',
  instanceIdSuffix: '',
  order: 1000,
  testcaseMeta: {
    tableName: 'table1',
    fileName: 'myFile',
    tableType: 'type1',
    testcaseName: 'testcaseName1'
  }
}

test('test GeneratorFaker', () => {
  const todoGenerator: TodoGeneratorInterface = {
    ...DEFAULT,
    config: 'person.firstName'
  }

  const val = gen.generate({
    instanceId: '1',
    testcaseData: { data: {} },
    todoGenerator
  })
  expect(val).toBeDefined()
})

test('test GeneratorFaker instanceid', () => {
  const todoGenerator1: TodoGeneratorInterface = {
    ...DEFAULT,
    config: 'person.firstName'
  }

  const todoGenerator2: TodoGeneratorInterface = {
    ...DEFAULT,
    config: 'person.firstName'
  }
  const val = gen.generate({
    instanceId: '3',
    testcaseData: { data: {} },
    todoGenerator: todoGenerator1
  })
  const val1 = gen.generate({
    instanceId: '3',
    testcaseData: { data: {} },
    todoGenerator: todoGenerator2
  })
  expect(val).toEqual(val1)
})
