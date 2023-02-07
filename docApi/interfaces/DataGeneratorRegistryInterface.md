[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / DataGeneratorRegistryInterface

# Interface: DataGeneratorRegistryInterface

## Implemented by

- [`DataGeneratorRegistry`](../classes/DataGeneratorRegistry.md)

## Table of contents

### Properties

- [getGenerator](DataGeneratorRegistryInterface.md#getgenerator)
- [loadStore](DataGeneratorRegistryInterface.md#loadstore)
- [registerGenerator](DataGeneratorRegistryInterface.md#registergenerator)
- [saveStore](DataGeneratorRegistryInterface.md#savestore)

## Properties

### getGenerator

• **getGenerator**: (`generatorName`: `string`) => [`DataGeneratorInterface`](DataGeneratorInterface.md)

#### Type declaration

▸ (`generatorName`): [`DataGeneratorInterface`](DataGeneratorInterface.md)

Returns the generator with given name

**`Throws`**

GeneraorNotExists

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generatorName` | `string` | The name of the generator |

##### Returns

[`DataGeneratorInterface`](DataGeneratorInterface.md)

generator - The registered Generator

#### Defined in

InterfaceDataGeneratorRegistry.ts:32

___

### loadStore

• **loadStore**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Calls the loadStore method on all the generators

##### Returns

`Promise`<`void`\>

#### Defined in

InterfaceDataGeneratorRegistry.ts:24

___

### registerGenerator

• **registerGenerator**: (`generatorName`: `string`, `generator`: [`DataGeneratorInterface`](DataGeneratorInterface.md)) => `void`

#### Type declaration

▸ (`generatorName`, `generator`): `void`

Registers a new Generator to the registry. If there already was a generator with the same name
an exception is thrown.

**`Throws`**

GeneraorAlreadyExists

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generatorName` | `string` | The name of the generator |
| `generator` | [`DataGeneratorInterface`](DataGeneratorInterface.md) | The generator object |

##### Returns

`void`

#### Defined in

InterfaceDataGeneratorRegistry.ts:11

___

### saveStore

• **saveStore**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Calls the saveStore method on all the generators

##### Returns

`Promise`<`void`\>

#### Defined in

InterfaceDataGeneratorRegistry.ts:19
