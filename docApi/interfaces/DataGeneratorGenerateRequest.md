[**@tlink/data-generator**](../README.md)

***

[@tlink/data-generator](../globals.md) / DataGeneratorGenerateRequest

# Interface: DataGeneratorGenerateRequest

Defined in: DataGeneratorInterface.ts:8

Interface representing the parameters for a data generation request.

## Properties

### instanceId

> **instanceId**: `string`

Defined in: DataGeneratorInterface.ts:13

The unique identifier for the test case instance.
For the same instance ID, the same generated data object is expected.

***

### testcaseData?

> `optional` **testcaseData**: `any`

Defined in: DataGeneratorInterface.ts:18

The already generated test case data object, if available.

***

### todoGenerator?

> `optional` **todoGenerator**: `TodoGeneratorInterface`

Defined in: DataGeneratorInterface.ts:23

An optional generator todo item associated with the generation process.
