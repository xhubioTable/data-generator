@xhubiotable/data-generator / [Exports](docApi/modules.md)

# Data Generator

## Generator Overview

The generator is responsible for generating data. The processor will
call all the generators in a loop until each generator has returned a
value. Should the generator directly manipulate the testcaseData object,
it must nevertheless return a dummy value.

### Generator Lifecycle

![Generator Lifecycle](doc/images/data-generator/lifeCycle.svg)

The image shows the abstract lifecycle of a generator. When the
processor starts up, it gets all the generators registered in the
registry and calls the 'loadStore' function. Now, every generator is
ready to be used.

Although not all the generators use a store, the function is called for
each generator.

he processor then starts the executing the test cases. All test cases
are independent from each other. The processor loops over all the test
cases. Then it will call the 'generate' method for all the generators
until each generator has returned a value. Some generators may need data
that has been previously created by another generator. If the generator
is not able to generate data by the first call, the generator must
return 'undefined'. Then it will be called again.

If the 'generate' method has returned data, then the
'createPostProcessTodos' method will be called. The generator now has
the possibility to return an array of todos. For each returned todo, the
processor will call the 'postProcess' method. The idea behind having
post processing is that sometimes it is not possible to create data
until all the generators have created the data. However, it’s not easy
for the processor to find out if all the other generators have been
executed. A postProcessTodo has also an order property. All the todos of
all the generators are sorted by this order number. Then all the todos
are executed in this order.

After the processor has finished executing all the test cases, the
'saveStore' function is called.

### InstanceId

The idea behind the 'instanceId' is to create an ID for each instance of
generated data. So if the generator is called twice with the same
instanceId it will return the same data. The instanceId is created by
the processor for each test case.

Example  
Let’s say we have a test case where the generator should create a
password, but the password needs to be entered in two separete fields -
'Password' and 'Password repeat'. This is common each time a user needs
to reset the password. Thus, in the equivalence class table the
generator is called twice with the same instanceId. Then the generator
should return the same data. This is explained in more detail the
tutorial.

### Post processing

Although post processing is an exceptional case for a generator, it is
sometimes very useful. Post processing directly operates on the
'testcaseData' object. It will not return any data.

To make the processor call the 'postProcess' function, the generator
must have returned one or more of these 'postProcessTodo' objects
beforehand.

**post process todo object**

    {
      instanceIdSuffix: undefined   
      order: 1000                   
      config: {}                    
      generatorName: 'MyGenerator', 
    }

-   (optional) The instanceId suffix. if not given the current
    instanceId is used

-   (optional) The order number. Default is '1000'. All the todos are
    executed in the order of this number. So it’s up to the author of
    the generator to define the right order.

-   (optional) The configuration for the function 'postProcess'.

-   (mandatory) The name of the generator to be called. So it’s possible
    that one generator creates a postProcessTodo for another generator.

### Generator Constructor

<table>
<caption>options when creating a generator</caption>
<colgroup>
<col style="width: 11%" />
<col style="width: 88%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">key</th>
<th style="text-align: left;">description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>logger</p></td>
<td style="text-align: left;"><p>The logger this generator should
use.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>serviceRegistry</p></td>
<td style="text-align: left;"><p>The service registry. Each generator is
added to the Service registry and each generator has access to this
registry. So one generator could call another generator.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>unique</p></td>
<td style="text-align: left;"><p>{true/false} (default=true) If set to a
true value, the data generator should return unique values. What unique
means depends on the generator. If the generator create more than one
field is up to the generator.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>maxUniqueTries</p></td>
<td style="text-align: left;"><p>{number} (default=100) Defines how many
tries the generator will do for getting a unique value until it throws
an error</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>varDir</p></td>
<td style="text-align: left;"><p>The directory used to store the
generated data.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>useStore</p></td>
<td style="text-align: left;"><p>{true/false} (default=false) Should the
generator persists the data.</p></td>
</tr>
</tbody>
</table>

options when creating a generator

<table>
<caption>additional properties</caption>
<colgroup>
<col style="width: 11%" />
<col style="width: 88%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">key</th>
<th style="text-align: left;">description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>uniqueSet</p></td>
<td style="text-align: left;"><p>A set to store the data which has to be
unique</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>instanceData</p></td>
<td style="text-align: left;"><p>A map where all the generated data is
mapped to the instanceId</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>name</p></td>
<td style="text-align: left;"><p>The name under which the generator is
registered. Sometimes multiple instances of the same generator class may
be registered under different names.</p></td>
</tr>
</tbody>
</table>

additional properties

## Generator Interface

async loadStore()  
(Not implemented) This function should load the store of the generator.

async saveStore()  
(Not implemented) This function should save the store of the generator.

getGenerator(generatorName)  
(Implemented) Returns the generator with the given name. If the
generator does not exists, it throws an exception.

clearContext()  
(Implemented) Clears the 'uniqueSet' and the 'instanceData' property.

async generate(instanceId, testcase, todoGenerator)  
(Not implemented) This is the method normally do all the work. Here the
data is generated.

async createPostProcessTodos(instanceId, testcase, todoGenerator)  
(Not implemented) Only needed if the generator should do post
processing. Sometimes the generator should not create the data directly
or should do additional work later on.

async postProcess(instanceId, testcase, todoGenerator)  
(Not implemented) Executes the post process.

## Generator Base

The base implementation of the interface in 'DataGeneratorBase.js' adds
the load and save store function. It Also handles the use of the
instanceId.

It adds a new function '\_doGenerate()' which needs to be overwritten.
