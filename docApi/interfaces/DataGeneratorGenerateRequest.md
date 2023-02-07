[@xhubiotable/data-generator](../README.md) / [Exports](../modules.md) / DataGeneratorGenerateRequest

# Interface: DataGeneratorGenerateRequest

## Table of contents

### Properties

- [config](DataGeneratorGenerateRequest.md#config)
- [instanceId](DataGeneratorGenerateRequest.md#instanceid)
- [testcaseDataObject](DataGeneratorGenerateRequest.md#testcasedataobject)

## Properties

### config

• **config**: [`DataGeneratorConfigInterface`](DataGeneratorConfigInterface.md)

Any additional parameter for this generator call

#### Defined in

InterfaceDataGenerator.ts:104

___

### instanceId

• **instanceId**: `string`

The testcase instance id. for the same instance id the same data object
will be returned. If this is undefined then always a new value will be created.

#### Defined in

InterfaceDataGenerator.ts:98

___

### testcaseDataObject

• `Optional` **testcaseDataObject**: `any`

The already generated testcase data object.

#### Defined in

InterfaceDataGenerator.ts:101
