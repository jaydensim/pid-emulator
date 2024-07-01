export function uEl<Type>(id: string) {
  const el = document.getElementById(id);
  if (el !== null) {
    return el as Type;
  } else {
    throw new Error(`Element ${id} not found`);
  }
}
