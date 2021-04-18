namespace App {
  export function AutoBind(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      enumerable: true,
      configurable: true,
      get() {
        return originalMethod.bind(this);
      },
    };
    return adjDescriptor;
  }
}
