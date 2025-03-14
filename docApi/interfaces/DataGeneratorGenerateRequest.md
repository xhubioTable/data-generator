[**@xhubiotable/data-generator**](../README.md)

***

[@xhubiotable/data-generator](../globals.md) / DataGeneratorGenerateRequest

# Interface: DataGeneratorGenerateRequest

Defined in: [DataGeneratorInterface.ts:8](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L8)

Interface representing the parameters for a data generation request.

## Properties

### instanceId

> **instanceId**: `string`

Defined in: [DataGeneratorInterface.ts:13](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L13)

The unique identifier for the test case instance.
For the same instance ID, the same generated data object is expected.

***

### testcaseData?

> `optional` **testcaseData**: `any`

Defined in: [DataGeneratorInterface.ts:18](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L18)

The already generated test case data object, if available.

***

### todoGenerator?

> `optional` **todoGenerator**: `TodoGeneratorInterface`

Defined in: [DataGeneratorInterface.ts:23](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/DataGeneratorInterface.ts#L23)

An optional generator todo item associated with the generation process.
