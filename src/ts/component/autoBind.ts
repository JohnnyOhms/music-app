export function autoBind(
  target: object,
  name: string,
  description: PropertyDescriptor
) {
  const mainMethode = description.value;
  let obj: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return mainMethode.bind(this);
    },
  };
  return obj;
}
