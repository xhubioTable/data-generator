**@xhubiotable/data-generator**

***

# Data Generator

## Generator Overview

The generator is responsible for creating data during test execution.
The processor continuously calls all registered generators in a loop
until each generator returns a value. If a generator directly modifies
the `testcaseData` object, it must still return a dummy value to
indicate completion.

### Generator Lifecycle

![Generator Lifecycle](doc/images/data-generator/lifeCycle.svg)

The diagram above illustrates the abstract lifecycle of a generator.
When the processor starts up, it registers all generators in the service
registry and calls each generator’s `loadStore()` method to initialize
persistent data. Even if a generator does not use persistent storage,
this function is invoked.

Once initialization is complete, the processor begins executing test
cases. Each test case is processed independently. For every test case,
the processor iterates over all generators and calls their `generate()`
method repeatedly until each generator returns a valid value. If a
generator cannot produce data on the first call—perhaps due to missing
dependencies—it should return `undefined`, and it will be called again
later.

When a generator returns data from `generate()`, the processor
subsequently calls its `createPostProcessTodos()` method. This method
allows the generator to schedule additional post-processing tasks. All
returned post-process todo objects are collected, sorted by their order
value, and then processed by calling the corresponding `postProcess()`
methods.

After processing all test cases, the processor calls `saveStore()` on
each generator to persist any state changes.

### InstanceId

The `instanceId` is a unique identifier generated by the processor for
each test case instance. It ensures that if the generator is called
multiple times with the same `instanceId`, it returns the same data.

Example  
Consider a scenario where a test case requires a password to be
generated, but the password must be entered in two separate fields
("Password" and "Password repeat"). The generator is invoked twice with
the same `instanceId` for this test case, ensuring that both fields
receive identical data. More details on this concept can be found in the
accompanying tutorial.

### Post Processing

While post processing is an exceptional use case, it can be very useful.
Post processing directly modifies the `testcaseData` object without
returning any new data.

For the processor to invoke the `postProcess()` method, the generator
must first return one or more post-process todo objects from the
`createPostProcessTodos()` method.

**Post Process Todo Object**

    {
      instanceIdSuffix: undefined,   
      order: 1000,                   
      config: {},                    
      generatorName: 'MyGenerator'   
    }

-   The instanceId suffix is optional. If not provided, the current
    instanceId is used.

-   The order number determines the execution sequence of todos. Default
    is 1000; adjust this value to enforce the desired order.

-   The config object can pass additional parameters to the
    `postProcess` method.

-   The generatorName (mandatory) specifies which generator’s
    postProcess function will handle the todo.

### Generator Constructor

When creating a generator, several options are available to configure
its behavior. The following table outlines the available options:

<table>
<colgroup>
<col style="width: 11%" />
<col style="width: 88%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Key</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>logger</p></td>
<td style="text-align: left;"><p>The logger instance that the generator
should use.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>dataGeneratorRegistry</p></td>
<td style="text-align: left;"><p>The data generator registry. Each
generator is registered here, allowing them to reference one
another.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>unique</p></td>
<td style="text-align: left;"><p>{true/false} (default: true). If true,
the generator must produce unique values. The definition of uniqueness
is determined by the generator.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>maxUniqueTries</p></td>
<td style="text-align: left;"><p>{number} (default: 100). Maximum number
of attempts to generate a unique value before throwing an
error.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>varDir</p></td>
<td style="text-align: left;"><p>The directory used to persist generated
data.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>useStore</p></td>
<td style="text-align: left;"><p>{true/false} (default: false).
Indicates whether the generator should persist its state.</p></td>
</tr>
</tbody>
</table>

**additional properties**

The following properties are maintained by the generator:

<table>
<colgroup>
<col style="width: 11%" />
<col style="width: 88%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Key</th>
<th style="text-align: left;">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>uniqueSet</p></td>
<td style="text-align: left;"><p>A Set used to store values that must
remain unique.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>instanceData</p></td>
<td style="text-align: left;"><p>A Map where generated data is stored
and associated with each instanceId.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>name</p></td>
<td style="text-align: left;"><p>The unique name under which the
generator is registered. Note that multiple instances of the same
generator class can be registered under different names.</p></td>
</tr>
</tbody>
</table>

## Generator Interface

This interface defines the core methods that every data generator must
support to integrate seamlessly into the system. It establishes a
contract for managing persistent state, generating data, and handling
post-processing tasks.

### Methods Overview

#### async loadStore()

-   **Purpose:** Loads the generator’s persistent state.

-   **Details:** Implement this method to restore the generator’s stored
    data (e.g., unique values, instance-specific data) from a persistent
    medium before new data is generated.

#### async saveStore()

-   **Purpose:** Saves the current state of the generator.

-   **Details:** Implement this method to persist the generator’s
    current state (e.g., caching unique values or instance data) to a
    storage medium, ensuring consistency across invocations.

#### getGenerator(generatorName)

-   **Purpose:** Retrieves a data generator by its registered name.

-   **Returns:** The data generator associated with the specified name.

-   **Throws:** An exception if no generator is found with the given
    name.

#### clearContext()

-   **Purpose:** Clears the internal context.

-   **Details:** Resets internal properties such as `uniqueSet` and
    `instanceData` to remove any cached or temporary data, ensuring a
    fresh state for new operations.

#### async generate(instanceId, testcase, todoGenerator)

-   **Purpose:** Generates data for a given test case.

-   **Details:** This is the primary method for data generation. It
    should return the generated data or `undefined` if generation cannot
    be completed—typically due to missing dependencies or data that is
    not yet available.

#### async createPostProcessTodos(instanceId, testcase, todoGenerator)

-   **Purpose:** Creates post-processing tasks (todos) for additional
    operations after data generation.

-   **Details:** Implement this method if the generator needs to
    schedule further processing steps (e.g., to resolve dependencies
    between generated data) after the main data generation phase.

#### async postProcess(instanceId, testcase, todoGenerator)

-   **Purpose:** Executes post-processing steps on the generated data.

-   **Details:** Use this method to perform any necessary final
    operations, such as validation, transformation, or cleanup, after
    all primary data generation is complete.

### Summary

The Generator Interface sets the standard for data generators by
specifying methods for loading and saving persistent state, generating
data, and handling post-processing. Proper implementation of these
methods is crucial for ensuring consistent, reliable data generation and
integration within the system.

## Data Generator Base

The Data Generator Base provides a default implementation of the data
generator interface as defined in `DataGeneratorBase.js`. It handles
common functionalities such as persistent storage, instance-specific
data management via an instance ID, and ensuring unique generated values
when required.

### Key Features

-   **Persistent Storage:** Implements `loadStore()` and `saveStore()`
    methods to manage the generator’s state persistently.

-   **Instance Management:** Uses an `instanceId` to ensure that
    repeated calls with the same identifier return the same generated
    data.

-   **Unique Value Handling:** Maintains a unique set of values to
    ensure uniqueness when the generator is configured for unique
    output.

-   **Custom Data Generation:** Introduces an abstract method
    `_doGenerate()` that must be overridden by subclasses to implement
    the specific logic for generating data.

### Methods Overview

-   **loadStore():** Loads the stored generator data (unique values and
    instance-specific data) from persistent storage.

-   **saveStore():** Persists the current state of the generator data to
    a storage file.

-   **getStoreData():** Returns an object representing the current data
    that would be saved, including unique values and instance data.

-   **generate(request):** Returns the generated data for a given test
    case instance. If data for the specified instance ID already exists,
    it is returned immediately. Otherwise, it delegates data generation
    to the `_doGenerate()` method.

-   **\_doGenerate(request):** Abstract method that must be implemented
    by subclasses. This method contains the custom logic for data
    generation and should not modify test case data directly.

### How to Extend the Data Generator Base

To create a custom data generator, follow these steps: 1. **Subclass the
Base:** Create a new class that extends `DataGeneratorBase`. 2.
**Override \_doGenerate():** Implement the `doGenerate()` method with
your custom data generation logic. 3. **Optional – Utilize
Persistence:** If your generator needs to persist state, use the
built-in `loadStore()` and `saveStore()` methods.

For example:

    class CustomDataGenerator extends DataGeneratorBase {
      protected async doGenerate(request: DataGeneratorGenerateRequest): Promise<any> {
        // Implement custom data generation logic here
        return { generated: "data" }
      }
    }

### Summary

The Data Generator Base streamlines the process of building new data
generators by handling common tasks such as persistence, instance
management, and unique value enforcement. Ensure to override the
`doGenerate()` method in your subclasses to define the generator’s
specific behavior.
