/**
 * Execute the function with the given method name splitted in an array of string
 * @param params - An array of string defining the method to call. Example: faker.name.firstName is ['name','firstName']
 * @param fakerPart - Faker function plus the already added param parts
 * @returns val - The generated value
 */
export function execStringFunction(params: string[], fakerPart: any): string {
  if (params.length > 1) {
    const newFakerPart = fakerPart[params.shift() as string]
    return execStringFunction(params, newFakerPart)
  }
  return fakerPart[params[0]]() as string
}
