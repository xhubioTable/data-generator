/**
 * Execute the function with the given method name splitted in an array of string
 * @param params {array} An array of string defining the method to call.
 * 	faker.name.firstName is ['name','firstName']
 * @param fakerPart {object} Faker plus the already added param parts
 * @return val {string} The generated value
 */
export function execStringFunction(params, fakerPart) {
  if (params.length > 1) {
    const newFakerPart = fakerPart[params.shift()]
    return execStringFunction(params, newFakerPart)
  }
  return fakerPart[params[0]]()
}
