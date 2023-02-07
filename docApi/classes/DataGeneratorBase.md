[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / DataGeneratorBase

# Class: DataGeneratorBase

The Base Generator implementation.
This class implements loading and saving of the generated data.
Also it handels the instance id. If a generator is called with the same
instance id it is expected that the generator returns the same data.

## Hierarchy

- **`DataGeneratorBase`**

  ↳ [`GeneratorFaker`](GeneratorFaker.md)

## Implements

- [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

## Table of contents

### Constructors

- [constructor](DataGeneratorBase.md#constructor)

### Properties

- [instanceData](DataGeneratorBase.md#instancedata)
- [logger](DataGeneratorBase.md#logger)
- [maxUniqueTries](DataGeneratorBase.md#maxuniquetries)
- [name](DataGeneratorBase.md#name)
- [registry](DataGeneratorBase.md#registry)
- [storeDir](DataGeneratorBase.md#storedir)
- [storeName](DataGeneratorBase.md#storename)
- [unique](DataGeneratorBase.md#unique)
- [uniqueSet](DataGeneratorBase.md#uniqueset)
- [useStore](DataGeneratorBase.md#usestore)

### Methods

- [clearContext](DataGeneratorBase.md#clearcontext)
- [createPostProcessActions](DataGeneratorBase.md#createpostprocessactions)
- [doGenerate](DataGeneratorBase.md#dogenerate)
- [generate](DataGeneratorBase.md#generate)
- [getGenerator](DataGeneratorBase.md#getgenerator)
- [getStoreFileName](DataGeneratorBase.md#getstorefilename)
- [loadStore](DataGeneratorBase.md#loadstore)
- [postProcess](DataGeneratorBase.md#postprocess)
- [saveStore](DataGeneratorBase.md#savestore)

## Constructors

### constructor

• **new DataGeneratorBase**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`DataGeneratorOptions`](../interfaces/DataGeneratorOptions.md) |

#### Defined in

DataGeneratorBase.ts:93

## Properties

### instanceData

• **instanceData**: `Map`<`string`, `any`\>

Stores the data per testcase instance id

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[instanceData](../interfaces/DataGeneratorInterface.md#instancedata)

#### Defined in

DataGeneratorBase.ts:79

___

### logger

• **logger**: `LoggerInterface`

The Logger for this generator

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[logger](../interfaces/DataGeneratorInterface.md#logger)

#### Defined in

DataGeneratorBase.ts:60

___

### maxUniqueTries

• **maxUniqueTries**: `number`

Defines how many tries the generator will do for getting a unique value until it throws an error

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[maxUniqueTries](../interfaces/DataGeneratorInterface.md#maxuniquetries)

#### Defined in

DataGeneratorBase.ts:73

___

### name

• **name**: `string`

Is set when this generator is registered in the service registry

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[name](../interfaces/DataGeneratorInterface.md#name)

#### Defined in

DataGeneratorBase.ts:91

___

### registry

• **registry**: [`DataGeneratorRegistryInterface`](../interfaces/DataGeneratorRegistryInterface.md)

The service registry where all the generators are registered

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[registry](../interfaces/DataGeneratorInterface.md#registry)

#### Defined in

DataGeneratorBase.ts:63

___

### storeDir

• **storeDir**: `string`

The directory used to store the unique data

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[storeDir](../interfaces/DataGeneratorInterface.md#storedir)

#### Defined in

DataGeneratorBase.ts:82

___

### storeName

• **storeName**: `string`

The name for the storage of the generated data. If useStore===true

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[storeName](../interfaces/DataGeneratorInterface.md#storename)

#### Defined in

DataGeneratorBase.ts:88

___

### unique

• **unique**: `boolean`

If set to a true value the data generator should return unique values
What unique means depends on the generator. If the generator create more than one field
is up to the generator

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[unique](../interfaces/DataGeneratorInterface.md#unique)

#### Defined in

DataGeneratorBase.ts:70

___

### uniqueSet

• **uniqueSet**: `Set`<`string` \| `number`\>

Stores the data which needs to be unique

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[uniqueSet](../interfaces/DataGeneratorInterface.md#uniqueset)

#### Defined in

DataGeneratorBase.ts:76

___

### useStore

• **useStore**: `boolean`

Should this generator use a store

#### Implementation of

[DataGeneratorInterface](../interfaces/DataGeneratorInterface.md).[useStore](../interfaces/DataGeneratorInterface.md#usestore)

#### Defined in

DataGeneratorBase.ts:85

## Methods

### clearContext

▸ **clearContext**(): `void`

Resets the context. The context stores the already generated data and is used
also to check if data is unique.

#### Returns

`void`

#### Implementation of

DataGeneratorInterface.clearContext

#### Defined in

DataGeneratorBase.ts:120

___

### createPostProcessActions

▸ **createPostProcessActions**(`request`): `Promise`<`undefined` \| [`PostProcessAction`](../interfaces/PostProcessAction.md)[]\>

Creates the postProcessTodos. Each generator could creates todos which will be executed later on.
Sometimes a generator needs to wait for other generators created there data.
This function is called after the 'generate' function

**`See`**

DataGeneratorGenerateRequest

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md) | The parameter as defined in |

#### Returns

`Promise`<`undefined` \| [`PostProcessAction`](../interfaces/PostProcessAction.md)[]\>

actions - The generated postProcessActions or undefined

#### Implementation of

DataGeneratorInterface.createPostProcessActions

#### Defined in

DataGeneratorBase.ts:222

___

### doGenerate

▸ `Protected` **doGenerate**(`request`): `Promise`<`any`\>

This method returns the generated data. It must not update the data in the testcase.

**`See`**

generate

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

DataGeneratorBase.ts:243

___

### generate

▸ **generate**(`request`): `Promise`<`any`\>

Generates the value and saves it for the given instance.

**`See`**

DataGeneratorGenerateRequest

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md) | The parameter as defined in |

#### Returns

`Promise`<`any`\>

data - The genrated data. If the data could not be generated because of missing data
then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
needs referenced data which is not generated yet.

#### Implementation of

DataGeneratorInterface.generate

#### Defined in

DataGeneratorBase.ts:185

___

### getGenerator

▸ **getGenerator**(`generatorName`): [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown

**`Throws`**

GeneratorDoesNotExistsException

#### Parameters

| Name | Type |
| :------ | :------ |
| `generatorName` | `string` |

#### Returns

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

generator - The generator

#### Implementation of

DataGeneratorInterface.getGenerator

#### Defined in

DataGeneratorBase.ts:168

___

### getStoreFileName

▸ `Protected` **getStoreFileName**(): `string`

Creates the file name under which the data is stored

#### Returns

`string`

fileName - The generated file name

#### Defined in

DataGeneratorBase.ts:112

___

### loadStore

▸ **loadStore**(): `Promise`<`void`\>

Loads the data from the file

#### Returns

`Promise`<`void`\>

#### Implementation of

DataGeneratorInterface.loadStore

#### Defined in

DataGeneratorBase.ts:128

___

### postProcess

▸ **postProcess**(`request`): `Promise`<`void`\>

This method will be called after the generate method of all the generators are called.
The order is the same as before.
This method does not return any data. It could update the data directly if needed

**`See`**

DataGeneratorGenerateRequest

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](../interfaces/DataGeneratorGenerateRequest.md) | The parameter as defined in |

#### Returns

`Promise`<`void`\>

#### Implementation of

DataGeneratorInterface.postProcess

#### Defined in

DataGeneratorBase.ts:235

___

### saveStore

▸ **saveStore**(): `Promise`<`void`\>

Saves the data to the store

#### Returns

`Promise`<`void`\>

#### Implementation of

DataGeneratorInterface.saveStore

#### Defined in

DataGeneratorBase.ts:147
