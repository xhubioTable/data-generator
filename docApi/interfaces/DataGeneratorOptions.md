[**@xhubiotable/data-generator**](../README.md)

***

[@xhubiotable/data-generator](../globals.md) / DataGeneratorOptions

# Interface: DataGeneratorOptions

Defined in: [DataGeneratorBase.ts:25](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L25)

Options for configuring a Data Generator.

## Properties

### generatorRegistry

> **generatorRegistry**: [`DataGeneratorRegistry`](../classes/DataGeneratorRegistry.md)

Defined in: [DataGeneratorBase.ts:27](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L27)

The registry that holds all available generators

***

### logger?

> `optional` **logger**: `LoggerInterface`

Defined in: [DataGeneratorBase.ts:33](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L33)

The logger instance; if not provided, LoggerMemory will be used

***

### maxUniqueTries?

> `optional` **maxUniqueTries**: `number`

Defined in: [DataGeneratorBase.ts:42](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L42)

The maximum number of attempts to generate a unique value before throwing an error

***

### name

> **name**: `string`

Defined in: [DataGeneratorBase.ts:30](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L30)

The unique name assigned when this generator is registered in the service registry

***

### storeName?

> `optional` **storeName**: `string`

Defined in: [DataGeneratorBase.ts:51](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L51)

The name for the data store associated with this generator

***

### unique?

> `optional` **unique**: `boolean`

Defined in: [DataGeneratorBase.ts:39](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L39)

Indicates whether the data generator should produce unique values.
The definition of uniqueness is determined by the generator itself.

***

### useStore?

> `optional` **useStore**: `boolean`

Defined in: [DataGeneratorBase.ts:48](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L48)

Determines if the generator should use persistent storage

***

### varDir?

> `optional` **varDir**: `string`

Defined in: [DataGeneratorBase.ts:45](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorBase.ts#L45)

Directory path for storing unique data persistently
