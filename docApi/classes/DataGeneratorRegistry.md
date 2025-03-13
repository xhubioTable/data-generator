[**@tlink/data-generator**](../README.md)

***

[@tlink/data-generator](../globals.md) / DataGeneratorRegistry

# Class: DataGeneratorRegistry

Defined in: DataGeneratorRegistry.ts:8

## Constructors

### new DataGeneratorRegistry()

> **new DataGeneratorRegistry**(): [`DataGeneratorRegistry`](DataGeneratorRegistry.md)

#### Returns

[`DataGeneratorRegistry`](DataGeneratorRegistry.md)

## Properties

### registry

> **registry**: `Map`\<`string`, [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)\>

Defined in: DataGeneratorRegistry.ts:12

Internal map that stores data generators by their unique names.

## Methods

### getGenerator()

> **getGenerator**(`generatorName`): [`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

Defined in: DataGeneratorRegistry.ts:77

Retrieves a data generator by its unique name.

#### Parameters

##### generatorName

`string`

The name under which the generator is registered.

#### Returns

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

The data generator associated with the specified name.

#### Throws

If no generator is found with the given name.

***

### loadStore()

> **loadStore**(): `Promise`\<`void`\>

Defined in: DataGeneratorRegistry.ts:60

Invokes the `loadStore()` method on each registered data generator.

This method restores the state of all generators from persistent storage.

#### Returns

`Promise`\<`void`\>

***

### registerGenerator()

> **registerGenerator**(`generatorName`, `dataGenerator`): `void`

Defined in: DataGeneratorRegistry.ts:25

Registers a new data generator in the registry.

#### Parameters

##### generatorName

`string`

The unique name to assign to the generator.

##### dataGenerator

[`DataGeneratorInterface`](../interfaces/DataGeneratorInterface.md)

The instance of the data generator to be registered.

#### Returns

`void`

#### Throws

If a generator with the given name is already registered.

***

### saveStore()

> **saveStore**(): `Promise`\<`void`\>

Defined in: DataGeneratorRegistry.ts:46

Invokes the `saveStore()` method on each registered data generator.

This method persists the state of all generators in the registry.

#### Returns

`Promise`\<`void`\>
