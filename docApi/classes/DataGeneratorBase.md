[**@xhubiotable/data-generator**](../README.md)

***

[@xhubiotable/data-generator](../globals.md) / DataGeneratorBase

# Class: DataGeneratorBase

Defined in: [DataGeneratorBase.ts:63](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L63)

Base implementation of the Data Generator interface.

This class provides default functionalities including:
- Loading and saving generated data from/to a persistent store.
- Managing unique data sets and instance-specific data using an instance identifier.

When the generator is invoked with the same instance ID, it is expected to return the previously generated data.

## Extended by

- [`GeneratorFaker`](GeneratorFaker.md)

## Implements

- [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

## Constructors

### new DataGeneratorBase()

> **new DataGeneratorBase**(`opts`): [`DataGeneratorBase`](DataGeneratorBase.md)

Defined in: [DataGeneratorBase.ts:106](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L106)

Constructs a new DataGeneratorBase instance.

#### Parameters

##### opts

[`DataGeneratorOptions`](../interfaces/DataGeneratorOptions.md)

Configuration options for the data generator.
The service registry may be left empty if the generator does not require access to other generators.

#### Returns

[`DataGeneratorBase`](DataGeneratorBase.md)

## Properties

### generatorRegistry

> **generatorRegistry**: [`DataGeneratorRegistry`](DataGeneratorRegistry.md)

Defined in: [DataGeneratorBase.ts:65](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L65)

The registry containing all available data generators

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`generatorRegistry`](../interfaces/DataGeneratorInterface.md#generatorregistry)

***

### instanceData

> **instanceData**: `Map`\<`string`, `any`\>

Defined in: [DataGeneratorBase.ts:95](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L95)

Map to store generated data associated with each instance ID

***

### logger

> **logger**: `LoggerInterface`

Defined in: [DataGeneratorBase.ts:71](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L71)

Logger instance used for logging; defaults to LoggerMemory if not provided

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`logger`](../interfaces/DataGeneratorInterface.md#logger)

***

### maxUniqueTries

> **maxUniqueTries**: `number`

Defined in: [DataGeneratorBase.ts:80](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L80)

Maximum number of attempts for generating a unique value before throwing an error

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`maxUniqueTries`](../interfaces/DataGeneratorInterface.md#maxuniquetries)

***

### name

> **name**: `string`

Defined in: [DataGeneratorBase.ts:68](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L68)

The unique name assigned to this generator

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`name`](../interfaces/DataGeneratorInterface.md#name)

***

### store

> **store**: [`DataGeneratorStore`](../interfaces/DataGeneratorStore.md)

Defined in: [DataGeneratorBase.ts:98](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L98)

Internal store object for persisting uniqueSet and instanceData

***

### storeName

> **storeName**: `string`

Defined in: [DataGeneratorBase.ts:89](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L89)

Name for the persistent data store; defaults to the generator name if not explicitly set

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`storeName`](../interfaces/DataGeneratorInterface.md#storename)

***

### unique

> **unique**: `boolean`

Defined in: [DataGeneratorBase.ts:77](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L77)

Flag indicating whether the generator should produce unique values.
The definition of uniqueness depends on the generator's implementation.

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`unique`](../interfaces/DataGeneratorInterface.md#unique)

***

### uniqueSet

> **uniqueSet**: `Set`\<`any`\>

Defined in: [DataGeneratorBase.ts:92](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L92)

Set to track unique values generated by this generator

***

### useStore

> **useStore**: `boolean`

Defined in: [DataGeneratorBase.ts:86](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L86)

Indicates whether the generator should use persistent storage

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`useStore`](../interfaces/DataGeneratorInterface.md#usestore)

***

### varDir

> **varDir**: `string`

Defined in: [DataGeneratorBase.ts:83](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L83)

Directory path used for storing persistent generator data

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`varDir`](../interfaces/DataGeneratorInterface.md#vardir)

## Accessors

### storeFileName

#### Get Signature

> **get** **storeFileName**(): `string`

Defined in: [DataGeneratorBase.ts:121](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L121)

Returns the full file path for the persistent store file.

##### Returns

`string`

Read-only getter for the file name of the persistent store.

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`storeFileName`](../interfaces/DataGeneratorInterface.md#storefilename)

## Methods

### clearContext()

> **clearContext**(): `void`

Defined in: [DataGeneratorBase.ts:148](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L148)

Clears the current generator context.

This method resets the unique value set and instance-specific data map,
effectively clearing any previously generated data.

#### Returns

`void`

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`clearContext`](../interfaces/DataGeneratorInterface.md#clearcontext)

***

### createPostProcessTodos()

> **createPostProcessTodos**(`request`): `Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

Defined in: [DataGeneratorBase.ts:280](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L280)

Creates post-processing tasks (todos) for the generated data.

Some generators may require additional processing after the main data generation,
for example, to resolve dependencies on data produced by other generators.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md)

The generation request parameters, as defined by DataGeneratorGenerateRequest.

#### Returns

`Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

A list of post-process todos, or `undefined` if no tasks are generated.

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`createPostProcessTodos`](../interfaces/DataGeneratorInterface.md#createpostprocesstodos)

***

### doGenerate()

> `protected` **doGenerate**(`request`): `Promise`\<`any`\>

Defined in: [DataGeneratorBase.ts:311](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L311)

Generates data based on the provided request.

This protected method should be overridden by subclasses to implement specific data generation logic.
It must not modify the test case data directly.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md)

The generation request parameters, as defined by DataGeneratorGenerateRequest.

#### Returns

`Promise`\<`any`\>

The generated data.

***

### generate()

> **generate**(`request`): `Promise`\<`any`\>

Defined in: [DataGeneratorBase.ts:232](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L232)

Generates data based on the provided request and caches it per instance.

If data for the given instance ID already exists, it returns the cached data.
Otherwise, it calls the generator-specific `doGenerate()` method to produce new data.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md)

The generation request parameters, as defined by DataGeneratorGenerateRequest.

#### Returns

`Promise`\<`any`\>

The generated data, or `undefined` if generation could not be completed.
The generator should return `undefined` if required referenced data is not yet available.

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`generate`](../interfaces/DataGeneratorInterface.md#generate)

***

### getGenerator()

> **getGenerator**(`generatorName`): [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

Defined in: [DataGeneratorBase.ts:132](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L132)

Retrieves a registered data generator by its name.

#### Parameters

##### generatorName

`string`

The unique name of the registered data generator.

#### Returns

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

The corresponding data generator.

#### Throws

Error if the generator with the given name is not registered.

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`getGenerator`](../interfaces/DataGeneratorInterface.md#getgenerator)

***

### getStoreData()

> **getStoreData**(): `object`

Defined in: [DataGeneratorBase.ts:214](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L214)

Returns the data structure that would be written to the persistent store.

#### Returns

`object`

An object containing arrays representing the unique set and instance data.

##### instanceData

> **instanceData**: \[`string`, `any`\][]

##### uniqueSet

> **uniqueSet**: `any`[]

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`getStoreData`](../interfaces/DataGeneratorInterface.md#getstoredata)

***

### loadStore()

> **loadStore**(): `Promise`\<`void`\>

Defined in: [DataGeneratorBase.ts:161](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L161)

Loads persisted generator data from the storage file.

If persistent storage is enabled (`useStore` is true), this method:
- Ensures the storage directory exists.
- Checks for an existing store file and loads data from it.
- Resets the current context and populates it with stored values.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`loadStore`](../interfaces/DataGeneratorInterface.md#loadstore)

***

### postProcess()

> **postProcess**(`request`): `Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

Defined in: [DataGeneratorBase.ts:296](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L296)

Performs post-processing after all generators have completed their data generation.

This method is invoked after the `generate()` method of all generators has been called.
It does not return any new data but may directly update existing data if necessary.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md)

The generation request parameters, as defined by DataGeneratorGenerateRequest.

#### Returns

`Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

A list of post-process todos, or `undefined` if no tasks are generated.

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`postProcess`](../interfaces/DataGeneratorInterface.md#postprocess)

***

### saveStore()

> **saveStore**(): `Promise`\<`void`\>

Defined in: [DataGeneratorBase.ts:194](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L194)

Saves the current generator data to the persistent store.

If persistent storage is enabled (`useStore` is true), this method:
- Converts the current unique set and instance data to arrays.
- Ensures the storage directory exists.
- Writes the data to the designated store file in JSON format.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md).[`saveStore`](../interfaces/DataGeneratorInterface.md#savestore)
