import path from 'path'
import fs from 'fs'

import {
  DataGeneratorBase,
  DataGeneratorOptions,
  DataGeneratorRegistry
} from '../src/index'
import { LoggerMemory } from '@tlink/logger'

const VOLATILE = path.join(__dirname, 'volatile')
const FIXTURES = path.join(__dirname, 'fixtures')

const GENERATOR_OPTION = {
  name: 'gumbo',
  storeDir: 'some/where',
  storeName: 'myStoreName',
  useStore: true
}

function getGeneratorOptions(): DataGeneratorOptions {
  const obj = JSON.parse(JSON.stringify(GENERATOR_OPTION))
  obj.logger = new LoggerMemory()
  obj.registry = new DataGeneratorRegistry()
  return obj
}

beforeAll(async () => {
  await fs.promises.rm(VOLATILE, { recursive: true, force: true })
  await fs.promises.mkdir(VOLATILE, { recursive: true })
})

test('storeFileName 1: No store name given, should use default', () => {
  const options = getGeneratorOptions()
  delete options.storeName

  const gen = new DataGeneratorBase(options)
  // eslint-disable-next-line @typescript-eslint/dot-notation
  expect(gen['getStoreFileName']()).toEqual('some/where/DataGeneratorBase.json')
})

test('storeFileName 2: No store dir given, should use default', () => {
  const options = getGeneratorOptions()
  delete options.storeDir

  const gen = new DataGeneratorBase(options)
  // eslint-disable-next-line @typescript-eslint/dot-notation
  expect(gen['getStoreFileName']()).toEqual('store/myStoreName.json')
})

test('storeFileName 3: ', () => {
  const options = getGeneratorOptions()

  const gen = new DataGeneratorBase(options)
  // eslint-disable-next-line @typescript-eslint/dot-notation
  expect(gen['getStoreFileName']()).toEqual('some/where/myStoreName.json')
})

test('loadStore: useStore=false', async () => {
  const options = getGeneratorOptions()
  options.storeDir = FIXTURES
  options.storeName = 'simpleStore'
  options.useStore = false

  const gen = new DataGeneratorBase(options)

  await gen.loadStore()
  const storeData = {
    uniqueSet: Array.from(gen.uniqueSet),
    instanceData: Array.from(gen.instanceData)
  }

  // use store is false, so no data expected
  expect(storeData).toEqual({ instanceData: [], uniqueSet: [] })
})

test('loadStore: useStore=true', async () => {
  const options = getGeneratorOptions()
  options.storeDir = FIXTURES
  options.storeName = 'simpleStore'
  options.useStore = true

  const gen = new DataGeneratorBase(options)

  await gen.loadStore()
  const storeData = {
    uniqueSet: Array.from(gen.uniqueSet),
    instanceData: Array.from(gen.instanceData)
  }

  expect(storeData).toEqual({
    uniqueSet: ['Torsten', 'Herbert', 'John', 'Amadir'],
    instanceData: [
      ['T', 'Torsten'],
      ['H', 'Herbert'],
      ['J', 'John'],
      ['A', 'Amadir']
    ]
  })
})

test('generate with known instanceId', async () => {
  const options = getGeneratorOptions()
  options.storeDir = FIXTURES
  options.storeName = 'simpleStore'
  options.useStore = true

  const gen = new DataGeneratorBase(options)

  await gen.loadStore()

  // The data for the instanceID 'T' was loaded by the store
  const val = await gen.generate({
    instanceId: 'T',
    config: { meta: { testcaseName: 'a' } }
  })

  expect(val).toEqual('Torsten')
})

test('saveStore: useStore=true', async () => {
  const options = getGeneratorOptions()
  options.storeDir = FIXTURES
  options.storeName = 'simpleStore'
  options.useStore = true

  const gen = new DataGeneratorBase(options)

  await gen.loadStore()

  gen.storeDir = VOLATILE
  gen.storeName = 'saveStoreTest'
  await gen.saveStore()

  // load the expected File Data
  const expectedDataRaw = await fs.promises.readFile(
    path.join(FIXTURES, 'simpleStore.json'),
    'utf8'
  )
  const expectedData = JSON.parse(expectedDataRaw)

  const realDataRaw = await fs.promises.readFile(
    path.join(VOLATILE, 'saveStoreTest.json'),
    'utf8'
  )
  const realData = JSON.parse(realDataRaw)

  expect(realData).toEqual(expectedData)
})
