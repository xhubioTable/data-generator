[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / DataGeneratorOptions

# Interface: DataGeneratorOptions

Defines the option for the DataGenerator Constructor

## Table of contents

### Properties

- [logger](DataGeneratorOptions.md#logger)
- [name](DataGeneratorOptions.md#name)
- [registry](DataGeneratorOptions.md#registry)
- [storeDir](DataGeneratorOptions.md#storedir)
- [storeName](DataGeneratorOptions.md#storename)
- [unique](DataGeneratorOptions.md#unique)
- [useStore](DataGeneratorOptions.md#usestore)

## Properties

### logger

• **logger**: `LoggerInterface`

The Logger for this generator

#### Defined in

DataGeneratorBase.ts:22

___

### name

• **name**: `string`

Is set when this generator is registered in the service registry

#### Defined in

DataGeneratorBase.ts:16

___

### registry

• **registry**: [`DataGeneratorRegistryInterface`](DataGeneratorRegistryInterface.md)

The registry all the generators are registered

#### Defined in

DataGeneratorBase.ts:19

___

### storeDir

• `Optional` **storeDir**: `string`

The directory used to store the unique data

#### Defined in

DataGeneratorBase.ts:32

___

### storeName

• `Optional` **storeName**: `string`

The of the file used to store the generated data if useStoree===true

#### Defined in

DataGeneratorBase.ts:35

___

### unique

• `Optional` **unique**: `boolean`

If set to a true value the data generator should return unique values
What unique means depends on the generator. If the generator create more than one field
is up to the generator

#### Defined in

DataGeneratorBase.ts:29

___

### useStore

• `Optional` **useStore**: `boolean`

Should this generator use a store

#### Defined in

DataGeneratorBase.ts:38
