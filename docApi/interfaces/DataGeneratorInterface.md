[**@xhubiotable/data-generator**](../README.md)

***

[@xhubiotable/data-generator](../globals.md) / DataGeneratorInterface

# Interface: DataGeneratorInterface

Defined in: [DataGeneratorInterface.ts:32](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L32)

Interface defining the structure and functionality of a data generator.

A data generator is responsible for generating test case data, handling persistent storage,
and managing internal state such as uniqueness and instance-specific data.

## Properties

### generatorRegistry

> **generatorRegistry**: [`DataGeneratorRegistry`](../classes/DataGeneratorRegistry.md)

Defined in: [DataGeneratorInterface.ts:38](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L38)

The registry containing all available data generators.

***

### logger?

> `optional` **logger**: `LoggerInterface`

Defined in: [DataGeneratorInterface.ts:49](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L49)

Logger instance used for logging purposes.
If not provided, a default logger (e.g., LoggerMemory) may be used.

***

### maxUniqueTries?

> `optional` **maxUniqueTries**: `number`

Defined in: [DataGeneratorInterface.ts:60](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L60)

Maximum number of attempts to generate a unique value before throwing an error.

***

### name

> **name**: `string`

Defined in: [DataGeneratorInterface.ts:43](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L43)

The unique name assigned when this generator is registered in the service registry.

***

### storeFileName

> `readonly` **storeFileName**: `string`

Defined in: [DataGeneratorInterface.ts:80](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L80)

Read-only getter for the file name of the persistent store.

***

### storeName?

> `optional` **storeName**: `string`

Defined in: [DataGeneratorInterface.ts:75](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L75)

The name of the persistent data store associated with this generator.

***

### unique?

> `optional` **unique**: `boolean`

Defined in: [DataGeneratorInterface.ts:55](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L55)

Flag indicating whether the generator should produce unique values.
The definition of uniqueness depends on the generator implementation.

***

### useStore?

> `optional` **useStore**: `boolean`

Defined in: [DataGeneratorInterface.ts:70](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L70)

Indicates whether the generator should use persistent storage.

***

### varDir?

> `optional` **varDir**: `string`

Defined in: [DataGeneratorInterface.ts:65](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L65)

Directory path used for persistently storing unique data.

## Methods

### clearContext()

> **clearContext**(): `void`

Defined in: [DataGeneratorInterface.ts:95](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L95)

Clears the generator's internal context, including cached data and unique value sets.

#### Returns

`void`

***

### createPostProcessTodos()

> **createPostProcessTodos**(`request`): `Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

Defined in: [DataGeneratorInterface.ts:134](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L134)

Creates post-processing tasks (todos) that may be required after data generation.

This is useful when additional processing or coordination between generators is needed.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md)

The parameters for data generation.

#### Returns

`Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

A promise that resolves to an array of post-process todos,
         or `undefined` if no tasks are required.

***

### generate()

> **generate**(`request`): `Promise`\<`any`\>

Defined in: [DataGeneratorInterface.ts:123](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L123)

Generates data for a test case based on the provided request parameters.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md)

The parameters required for data generation.

#### Returns

`Promise`\<`any`\>

A promise that resolves to the generated data object,
         or `undefined` if data generation is not possible.

***

### getGenerator()

> **getGenerator**(`generatorName`): `any`

Defined in: [DataGeneratorInterface.ts:90](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L90)

Retrieves a registered generator by its unique name.

#### Parameters

##### generatorName

`string`

The name of the generator to retrieve.

#### Returns

`any`

The data generator corresponding to the specified name.

***

### getStoreData()

> **getStoreData**(): `object`

Defined in: [DataGeneratorInterface.ts:114](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L114)

Retrieves the current data in the format that would be stored persistently.

#### Returns

`object`

An object containing arrays for unique values and instance-specific data.

##### instanceData

> **instanceData**: `any`[]

##### uniqueSet

> **uniqueSet**: `any`[]

***

### loadStore()

> **loadStore**(): `Promise`\<`void`\>

Defined in: [DataGeneratorInterface.ts:102](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L102)

Loads stored data from the persistent store.

This method restores any previously persisted state into the generator's context.

#### Returns

`Promise`\<`void`\>

***

### postProcess()

> **postProcess**(`request`): `Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

Defined in: [DataGeneratorInterface.ts:147](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L147)

Performs post-processing on the generated data.

This method is invoked after all primary data generation has completed.

#### Parameters

##### request

[`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md)

The parameters for data generation.

#### Returns

`Promise`\<`undefined` \| `TodoGeneratorInterface`[]\>

A promise that resolves to an array of post-process todos,
         or `undefined` if no post-processing is needed.

***

### saveStore()

> **saveStore**(): `Promise`\<`void`\>

Defined in: [DataGeneratorInterface.ts:107](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L107)

Saves the current generator data to the persistent store.

#### Returns

`Promise`\<`void`\>
