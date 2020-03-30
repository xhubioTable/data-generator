import path from 'path'
import util from 'util'
import fs from 'fs'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'

import { TDGServiceRegistry } from '../src/index'
import { DataGeneratorBase } from '../src/index'

const rm = util.promisify(rimraf)
const readFile = util.promisify(fs.readFile)

const VOLATILE = path.join(__dirname, 'volatile')

beforeAll(async () => {
  await rm(VOLATILE)
  await mkdirp(VOLATILE)
})

test('Test error no registry', () => {
  const gen = new DataGeneratorBase()
  expect(() => {
    gen.getGenerator('myGen')
  }).toThrow('No service registry definend')
})

test('storeFileName 1', () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorBase(registry, { storeName: 'huhu' })
  expect(gen.storeFileName).toEqual('var/huhu.json')
})

test('storeFileName 2', () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorBase(registry, {
    storeName: 'huhu',
    varDir: 'help',
  })
  expect(gen.storeFileName).toEqual('help/huhu.json')
})

test('loadStore: useStore=false', async () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorBase(registry, {
    storeName: 'simpleStore',
    varDir: path.join('tests', 'fixtures'),
  })

  await gen.loadStore()
  const storeData = gen.getStoreData()

  // use store is false, so no data expected
  expect(storeData).toEqual({ instanceData: [], uniqueSet: [] })
})

test('loadStore: useStore=true', async () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorBase(registry, {
    storeName: 'simpleStore',
    varDir: path.join('tests', 'fixtures'),
    useStore: true,
  })

  await gen.loadStore()
  const storeData = gen.getStoreData()

  expect(storeData).toEqual({
    uniqueSet: ['Torsten', 'Herbert', 'John', 'Amadir'],
    instanceData: [
      ['T', 'Torsten'],
      ['H', 'Herbert'],
      ['J', 'John'],
      ['A', 'Amadir'],
    ],
  })
})

test('generate with known instanceId', async () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorBase(registry, {
    storeName: 'simpleStore',
    varDir: path.join('tests', 'fixtures'),
    useStore: true,
  })

  await gen.loadStore()

  // The data for the instanceID 'T' was loaded by the store
  const val = await gen.generate('T')

  expect(val).toEqual('Torsten')
})

test('saveStore: useStore=true', async () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorBase(registry, {
    storeName: 'simpleStore',
    varDir: path.join('tests', 'fixtures'),
    useStore: true,
  })

  await gen.loadStore()
  gen.varDir = VOLATILE
  gen.storeName = 'saveStoreTest'
  await gen.saveStore()

  // load the expected File Data
  const expectedDataRaw = await readFile(
    path.join(__dirname, 'fixtures', 'simpleStore.json')
  )
  const expectedData = JSON.parse(expectedDataRaw)

  const realDataRaw = await readFile(path.join(VOLATILE, 'saveStoreTest.json'))
  const realData = JSON.parse(realDataRaw)

  expect(realData).toEqual(expectedData)
})
