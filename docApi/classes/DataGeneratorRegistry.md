[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / DataGeneratorRegistry

# Class: DataGeneratorRegistry

The data generator registry stores all the generators by its name. So each generator could ask the service
for an other generator by its service name. So it is possible to compose a generator out of other
generators.
The registry is also used by the processor to access the generators.

## Implements

- [`DataGeneratorRegistryInterface`](../interfaces/DataGeneratorRegistryInterface.md)

## Table of contents

### Constructors

- [constructor](DataGeneratorRegistry.md#constructor)

### Properties

- [services](DataGeneratorRegistry.md#services)

### Methods

- [getGenerator](DataGeneratorRegistry.md#getgenerator)
- [loadStore](DataGeneratorRegistry.md#loadstore)
- [registerGenerator](DataGeneratorRegistry.md#registergenerator)
- [saveStore](DataGeneratorRegistry.md#savestore)

## Constructors

### constructor

• **new DataGeneratorRegistry**()

## Properties

### services

• **services**: `Map`<`String`, [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)\>

This map stortes all the data generators

#### Defined in

DataGeneratorRegistry.ts:12

## Methods

### getGenerator

▸ **getGenerator**(`generatorName`): [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

Returns the generator with given name

**`Throws`**

GeneraorNotExists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generatorName` | `string` | The name of the generator |

#### Returns

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

generator - The registered Generator

#### Implementation of

DataGeneratorRegistryInterface.getGenerator

#### Defined in

DataGeneratorRegistry.ts:64

___

### loadStore

▸ **loadStore**(): `Promise`<`void`\>

Calls the 'loadStore()' function of each registered Generator

#### Returns

`Promise`<`void`\>

#### Implementation of

DataGeneratorRegistryInterface.loadStore

#### Defined in

DataGeneratorRegistry.ts:51

___

### registerGenerator

▸ **registerGenerator**(`generatorName`, `generator`): `void`

Registers a new Generator to the registry. If there already was a generator with the same name
an exception is thrown.

**`Throws`**

GeneraorAlreadyExists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generatorName` | `string` | The name of the generator |
| `generator` | [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md) | The generator object |

#### Returns

`void`

#### Implementation of

DataGeneratorRegistryInterface.registerGenerator

#### Defined in

DataGeneratorRegistry.ts:21

___

### saveStore

▸ **saveStore**(): `Promise`<`void`\>

Calls the 'saveStore()' function of each registered Generator

#### Returns

`Promise`<`void`\>

#### Implementation of

DataGeneratorRegistryInterface.saveStore

#### Defined in

DataGeneratorRegistry.ts:41
