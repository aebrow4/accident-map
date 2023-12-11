export function unreachable(val: never): never {
  throw new Error(`Unreachable. Val=${JSON.stringify(val)}`);
}
