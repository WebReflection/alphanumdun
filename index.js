/**
 * Returns a string with only alphanumeric characters plus "_" or "-".
 * @param {string} str
 * @returns {string}
 */
export const encode = str => str.replace(
  /[^a-zA-Z0-9_]/g,
  c => `-${c.charCodeAt(0).toString(36)}-`,
);

/**
 * Returns a string with the original characters.
 * @param {string} str
 * @returns {string}
 */
export const decode = str => str.replace(
  /-([^-]+?)-/g,
  (_, c) => String.fromCharCode(parseInt(c, 36)),
);
