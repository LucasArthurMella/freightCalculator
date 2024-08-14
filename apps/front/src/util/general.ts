export function removeEmptyStringProperties(obj: Object): Object {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != "")
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyStringProperties(v) : v])
  );
}
