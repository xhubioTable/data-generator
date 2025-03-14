[**@xhubiotable/data-generator**](../README.md)

***

[@xhubiotable/data-generator](../globals.md) / execStringFunction

# Function: execStringFunction()

> **execStringFunction**(`params`, `fakerPart`): `any`

Defined in: [generator/execStringFunction.ts:9](https://github.com/xhubioTable/data-generator/blob/cfc6fb9019072a1983ea5e9d9a1f0cdbae55def6/src/generator/execStringFunction.ts#L9)

Execute the function with the given method name splitted in an array of strings

## Parameters

### params

`string`[]

An array of string defining the method to call.
	faker.name.firstName is ['name','firstName']

### fakerPart

`any`

Faker plus the already added param parts

## Returns

`any`

The generated value
