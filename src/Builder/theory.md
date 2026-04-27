# Builder pattern (email example)

## Usage

1. Create an object of the builder class (`EmailBuilder`).
2. Populate all the fields you want (chained setters, or as many as you need).
3. Call the builder’s `build` function.
4. `build` first validates the payload (e.g. with Joi + `validateAsync`), then calls the factory on the main `Email` class to create the `Email` instance.
5. In the usage file (`demo.ts`), the result of `await emailBuilder.build()` is the `Email` instance.
6. Use the `Email` object for the rest of your business logic (sending, persistence, display, etc.).
