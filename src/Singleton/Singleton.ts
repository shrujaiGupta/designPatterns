// prefer this code, more readable

class Singleton {

    private constructor(){

    }

    private static instance: Singleton

    public static getInstance(): Singleton{
        if(Singleton.instance == null){
            Singleton.instance = new Singleton()
        }
        return Singleton.instance
    }
}

const obj1 = Singleton.getInstance()
const obj2 = Singleton.getInstance()

console.log(obj1 === obj2)

//
//
//

class SingletonRuntimeSafe {
     private constructor() {}

     static #instance: SingletonRuntimeSafe | undefined
     static getInstance(): SingletonRuntimeSafe {
         SingletonRuntimeSafe.#instance ??= new SingletonRuntimeSafe()
         return SingletonRuntimeSafe.#instance
     }
 }

/*
 * ---------------------------------------------------------------------------
 * Runtime-safe variant (native private fields) — same API, stronger hiding
 * ---------------------------------------------------------------------------
 *
 * class Singleton {
 *     private constructor() {}
 *
 *     static #instance: Singleton | undefined
 *
 *     static getInstance(): Singleton {
 *         Singleton.#instance ??= new Singleton()
 *         return Singleton.#instance
 *     }
 * }
 *
 * ---------------------------------------------------------------------------
 * Reference notes: `private` vs `#`
 * ---------------------------------------------------------------------------
 *
 * - TypeScript `private static instance` is enforced only at typecheck time.
 *   The emitted JavaScript uses a normal property; nothing stops runtime code
 *   from touching it if it tries hard enough.
 *
 * - `static #instance` is a JavaScript private field: the engine rejects access
 *   from outside the class body, so the backing storage is hidden at runtime.
 *
 * - Typing `#instance` as `Singleton | undefined` (or initializing it) matches
 *   the real lifecycle before the first `getInstance()` call; optional chaining
 *   / `??=` keep that accurate in the type checker.
 *
 * Neither version proves “singleton” to the compiler; both rely on `getInstance()`
 * for that guarantee. `#` only strengthens encapsulation of the cached instance.
 */