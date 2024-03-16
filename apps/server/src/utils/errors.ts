export const errorAsValue = <T, C extends () => T>(
  cb: C,
): [T] | [null, Error] => {
  try {
    return [cb()];
  } catch (error) {
    return [null, error as Error];
  }
};
