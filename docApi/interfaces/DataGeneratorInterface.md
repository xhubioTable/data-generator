[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / DataGeneratorInterface

# Interface: DataGeneratorInterface

## Implemented by

- [`DataGeneratorBase`](../classes/DataGeneratorBase.md)

## Table of contents

### Properties

- [clearContext](DataGeneratorInterface.md#clearcontext)
- [createPostProcessActions](DataGeneratorInterface.md#createpostprocessactions)
- [generate](DataGeneratorInterface.md#generate)
- [getGenerator](DataGeneratorInterface.md#getgenerator)
- [instanceData](DataGeneratorInterface.md#instancedata)
- [loadStore](DataGeneratorInterface.md#loadstore)
- [logger](DataGeneratorInterface.md#logger)
- [maxUniqueTries](DataGeneratorInterface.md#maxuniquetries)
- [name](DataGeneratorInterface.md#name)
- [postProcess](DataGeneratorInterface.md#postprocess)
- [registry](DataGeneratorInterface.md#registry)
- [saveStore](DataGeneratorInterface.md#savestore)
- [storeDir](DataGeneratorInterface.md#storedir)
- [storeName](DataGeneratorInterface.md#storename)
- [unique](DataGeneratorInterface.md#unique)
- [uniqueSet](DataGeneratorInterface.md#uniqueset)
- [useStore](DataGeneratorInterface.md#usestore)

## Properties

### clearContext

• **clearContext**: () => `void`

#### Type declaration

▸ (): `void`

Resets the context. The context stores the already generated data and is used
also to check if data is unique.

##### Returns

`void`

#### Defined in

InterfaceDataGenerator.ts:62

___

### createPostProcessActions

• **createPostProcessActions**: (`request`: [`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md)) => `Promise`<`undefined` \| [`PostProcessAction`](PostProcessAction.md)[]\>

#### Type declaration

▸ (`request`): `Promise`<`undefined` \| [`PostProcessAction`](PostProcessAction.md)[]\>

Creates the postProcessTodos. Each generator could creates todos which will be executed later on.
Sometimes a generator needs to wait for other generators created there data.
This function is called after the 'generate' function

**`See`**

DataGeneratorGenerateRequest

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md) | The request as described in |

##### Returns

`Promise`<`undefined` \| [`PostProcessAction`](PostProcessAction.md)[]\>

generateActions - The generated postProcess actions

#### Defined in

InterfaceDataGenerator.ts:80

___

### generate

• **generate**: (`request`: [`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md)) => `Promise`<`any`\>

#### Type declaration

▸ (`request`): `Promise`<`any`\>

Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown

**`See`**

DataGeneratorGenerateRequest

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md) | The request as described in |

##### Returns

`Promise`<`any`\>

generatedData - The genrated data. If the data could not be generated because of missing data
then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
needs referenced data which is not generated yet.

#### Defined in

InterfaceDataGenerator.ts:71

___

### getGenerator

• **getGenerator**: (`generatorName`: `string`) => [`DataGeneratorInterface`](DataGeneratorInterface.md)

#### Type declaration

▸ (`generatorName`): [`DataGeneratorInterface`](DataGeneratorInterface.md)

Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generatorName` | `string` | The name the generator was registered in the registry. |

##### Returns

[`DataGeneratorInterface`](DataGeneratorInterface.md)

#### Defined in

InterfaceDataGenerator.ts:56

___

### instanceData

• **instanceData**: `Map`<`string`, `any`\>

Stores the data per testcase instance id

#### Defined in

InterfaceDataGenerator.ts:27

___

### loadStore

• **loadStore**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Loads the store data from the file. The store is used to persist generated data
over multiple data generator runs

##### Returns

`Promise`<`void`\>

#### Defined in

InterfaceDataGenerator.ts:45

___

### logger

• **logger**: `LoggerInterface`

The Logger for this generator

#### Defined in

InterfaceDataGenerator.ts:8

___

### maxUniqueTries

• **maxUniqueTries**: `number`

Defines how many tries the generator will do for getting a unique value until it throws an error

#### Defined in

InterfaceDataGenerator.ts:21

___

### name

• **name**: `string`

Is set when this generator is registered in the service registry

#### Defined in

InterfaceDataGenerator.ts:39

___

### postProcess

• **postProcess**: (`request`: [`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`request`): `Promise`<`void`\>

This method will be called after the generate method of all the generators are called.
The order is the same as before.
This method does not return any data. It could update the data directly if needed

**`See`**

DataGeneratorGenerateRequest

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`DataGeneratorGenerateRequest`](DataGeneratorGenerateRequest.md) | The request as described in |

##### Returns

`Promise`<`void`\>

#### Defined in

InterfaceDataGenerator.ts:90

___

### registry

• **registry**: [`DataGeneratorRegistryInterface`](DataGeneratorRegistryInterface.md)

The service registry where all the generators are registered

#### Defined in

InterfaceDataGenerator.ts:11

___

### saveStore

• **saveStore**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Saves the data to the store

##### Returns

`Promise`<`void`\>

#### Defined in

InterfaceDataGenerator.ts:50

___

### storeDir

• **storeDir**: `string`

The directory used to store the unique data

#### Defined in

InterfaceDataGenerator.ts:30

___

### storeName

• **storeName**: `string`

The name for the storage of the generated data. If useStore===true

#### Defined in

InterfaceDataGenerator.ts:36

___

### unique

• **unique**: `boolean`

If set to a true value the data generator should return unique values
What unique means depends on the generator. If the generator create more than one field
is up to the generator

#### Defined in

InterfaceDataGenerator.ts:18

___

### uniqueSet

• **uniqueSet**: `Set`<`string` \| `number`\>

Stores the data which needs to be unique

#### Defined in

InterfaceDataGenerator.ts:24

___

### useStore

• **useStore**: `boolean`

Should this generator use a store

#### Defined in

InterfaceDataGenerator.ts:33
