[**@tlink/data-generator**](../README.md)

***

[@tlink/data-generator](../globals.md) / DataGeneratorOptions

# Interface: DataGeneratorOptions

Defined in: DataGeneratorBase.ts:25

Options for configuring a Data Generator.

## Properties

### generatorRegistry

> **generatorRegistry**: [`DataGeneratorRegistry`](../classes/DataGeneratorRegistry.md)

Defined in: DataGeneratorBase.ts:27

The registry that holds all available generators

***

### logger?

> `optional` **logger**: `LoggerInterface`

Defined in: DataGeneratorBase.ts:33

The logger instance; if not provided, LoggerMemory will be used

***

### maxUniqueTries?

> `optional` **maxUniqueTries**: `number`

Defined in: DataGeneratorBase.ts:42

The maximum number of attempts to generate a unique value before throwing an error

***

### name

> **name**: `string`

Defined in: DataGeneratorBase.ts:30

The unique name assigned when this generator is registered in the service registry

***

### storeName?

> `optional` **storeName**: `string`

Defined in: DataGeneratorBase.ts:51

The name for the data store associated with this generator

***

### unique?

> `optional` **unique**: `boolean`

Defined in: DataGeneratorBase.ts:39

Indicates whether the data generator should produce unique values.
The definition of uniqueness is determined by the generator itself.

***

### useStore?

> `optional` **useStore**: `boolean`

Defined in: DataGeneratorBase.ts:48

Determines if the generator should use persistent storage

***

### varDir?

> `optional` **varDir**: `string`

Defined in: DataGeneratorBase.ts:45

Directory path for storing unique data persistently
