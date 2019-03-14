
export const parseBoolean = (bool, strict: boolean = false): boolean => {
  if(strict && bool === null) {
    return null;
  } else if(strict && bool === undefined) {
    return undefined;
  }

  return bool === 'false' ? false : !!bool;
};