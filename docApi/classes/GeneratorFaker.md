[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / GeneratorFaker

# Class: GeneratorFaker

This is a Generator using Faker to create Data. The Faker function to be used is
given as a parameter.

## Hierarchy

- [`DataGeneratorBase`](DataGeneratorBase.md)

  ↳ **`GeneratorFaker`**

## Table of contents

### Constructors

- [constructor](GeneratorFaker.md#constructor)

### Properties

- [instanceData](GeneratorFaker.md#instancedata)
- [logger](GeneratorFaker.md#logger)
- [maxUniqueTries](GeneratorFaker.md#maxuniquetries)
- [name](GeneratorFaker.md#name)
- [registry](GeneratorFaker.md#registry)
- [storeDir](GeneratorFaker.md#storedir)
- [storeName](GeneratorFaker.md#storename)
- [unique](GeneratorFaker.md#unique)
- [uniqueSet](GeneratorFaker.md#uniqueset)
- [useStore](GeneratorFaker.md#usestore)

### Methods

- [clearContext](GeneratorFaker.md#clearcontext)
- [createPostProcessActions](GeneratorFaker.md#createpostprocessactions)
- [doGenerate](GeneratorFaker.md#dogenerate)
- [generate](GeneratorFaker.md#generate)
- [getGenerator](GeneratorFaker.md#getgenerator)
- [getStoreFileName](GeneratorFaker.md#getstorefilename)
- [loadStore](GeneratorFaker.md#loadstore)
- [postProcess](GeneratorFaker.md#postprocess)
- [saveStore](GeneratorFaker.md#savestore)

## Constructors

### constructor

• **new GeneratorFaker**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`DataGeneratorOptions`](../interfaces/DataGeneratorOptions.md) |

#### Overrides

[DataGeneratorBase](DataGeneratorBase.md).[constructor](DataGeneratorBase.md#constructor)

#### Defined in

generator/GeneratorFaker.ts:11

## Properties

### instanceData

• **instanceData**: `Map`<`string`, `any`\>

Stores the data per testcase instance id

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[instanceData](DataGeneratorBase.md#instancedata)

#### Defined in

DataGeneratorBase.ts:79

___

### logger

• **logger**: `LoggerInterface`

The Logger for this generator

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[logger](DataGeneratorBase.md#logger)

#### Defined in

DataGeneratorBase.ts:60

___

### maxUniqueTries

• **maxUniqueTries**: `number`

Defines how many tries the generator will do for getting a unique value until it throws an error

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[maxUniqueTries](DataGeneratorBase.md#maxuniquetries)

#### Defined in

DataGeneratorBase.ts:73

___

### name

• **name**: `string`

Is set when this generator is registered in the service registry

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[name](DataGeneratorBase.md#name)

#### Defined in

DataGeneratorBase.ts:91

___

### registry

• **registry**: [`DataGeneratorRegistryInterface`](../interfaces/DataGeneratorRegistryInterface.md)

The service registry where all the generators are registered

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[registry](DataGeneratorBase.md#registry)

#### Defined in

DataGeneratorBase.ts:63

___

### storeDir

• **storeDir**: `string`

The directory used to store the unique data

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[storeDir](DataGeneratorBase.md#storedir)

#### Defined in

DataGeneratorBase.ts:82

___

### storeName

• **storeName**: `string`

The name for the storage of the generated data. If useStore===true

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[storeName](DataGeneratorBase.md#storename)

#### Defined in

DataGeneratorBase.ts:88

___

### unique

• **unique**: `boolean`

If set to a true value the data generator should return unique values
What unique means depends on the generator. If the generator create more than one field
is up to the generator

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[unique](DataGeneratorBase.md#unique)

#### Defined in

DataGeneratorBase.ts:70

___

### uniqueSet

• **uniqueSet**: `Set`<`string` \| `number`\>

Stores the data which needs to be unique

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[uniqueSet](DataGeneratorBase.md#uniqueset)

#### Defined in

DataGeneratorBase.ts:76

___

### useStore

• **useStore**: `boolean`

Should this generator use a store

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[useStore](DataGeneratorBase.md#usestore)

#### Defined in

DataGeneratorBase.ts:85

## Methods

### clearContext

▸ **clearContext**(): `void`

Resets the context. The context stores the already generated data and is used
also to check if data is unique.

#### Returns

`void`

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[clearContext](DataGeneratorBase.md#clearcontext)

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

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[createPostProcessActions](DataGeneratorBase.md#createpostprocessactions)

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

#### Overrides

[DataGeneratorBase](DataGeneratorBase.md).[doGenerate](DataGeneratorBase.md#dogenerate)

#### Defined in

generator/GeneratorFaker.ts:56

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

#### Overrides

[DataGeneratorBase](DataGeneratorBase.md).[generate](DataGeneratorBase.md#generate)

#### Defined in

generator/GeneratorFaker.ts:25

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

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[getGenerator](DataGeneratorBase.md#getgenerator)

#### Defined in

DataGeneratorBase.ts:168

___

### getStoreFileName

▸ `Protected` **getStoreFileName**(): `string`

Creates the file name under which the data is stored

#### Returns

`string`

fileName - The generated file name

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[getStoreFileName](DataGeneratorBase.md#getstorefilename)

#### Defined in

DataGeneratorBase.ts:112

___

### loadStore

▸ **loadStore**(): `Promise`<`void`\>

Loads the data from the file

#### Returns

`Promise`<`void`\>

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[loadStore](DataGeneratorBase.md#loadstore)

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

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[postProcess](DataGeneratorBase.md#postprocess)

#### Defined in

DataGeneratorBase.ts:235

___

### saveStore

▸ **saveStore**(): `Promise`<`void`\>

Saves the data to the store

#### Returns

`Promise`<`void`\>

#### Inherited from

[DataGeneratorBase](DataGeneratorBase.md).[saveStore](DataGeneratorBase.md#savestore)

#### Defined in

DataGeneratorBase.ts:147
