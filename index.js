/**
 *
 * @param {Object} objectToFlatten a multi-level deep object
 *
 // tslint:disable-next-line:max-line-length
 * Source: <https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object>
 *
 */
const flattenObject = (objectToFlatten) =>
  Object.assign(
    {},
    ...(function _flatten(o) {
      return [].concat(
        ...Object.keys(o).map((k) =>
          typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] },
        ),
      );
    })(objectToFlatten),
  );

/**
 *
 * @param {*} array the array to be converted into a dictionary
 * @param {*} key_field the field to use as they 'key'
 * for each object in the dictionary
 */
const arrayToDictionary = (array, keyField = 'id') => {
  const obj = {};

  array.forEach((item) => (obj[item[keyField]] = item));

  return obj;
};

/**
 *
 * @param {Object} conditions
 * @param {Object} styles
 *
 * @description matches keys of the provided `conditions` object
 * to the keys of the provided `styles` object
 * @returns {Object} an empty object, or a flattened object of styles
 *
 * @example
 *
 * ```
 * const styles = {
 *   disabled: { activeOpacity: 0.5, },
 *   bgGreen: { backgroundColor: 'green', },
 * }
 *
 * const combined = combineStyles({ disabled: true, bgGreen: false }, styles)
 *
 * // => { activeOpacity: 0.5 }
 *
 * props.isGreen = true
 * const combined =
 * combineStyles({ disabled: true, bgGreen: props.isGreen }, styles)
 *
 * // => { activeOpacity: 0.5, backgroundColor: 'green' }
 * ```
 */
export const clsx = (conditions, styles) => {
  if (!conditions || !styles) {
    return {};
  }
  let results = {};
  let normalizedConditions = conditions;
  if (Array.isArray(conditions)) {
    normalizedConditions = arrayToDictionary(conditions);
    normalizedConditions = flattenObject(conditions);
  }

  Object.keys(normalizedConditions).map((key) => {
    if (
      normalizedConditions[key] &&
      Object.keys(normalizedConditions[key]).length < 1
    ) {
      results = { ...results, ...styles[key] };
      return flattenObject(results);
    }

    if (Object.keys(normalizedConditions[key]).length > 0) {
      Object.keys(normalizedConditions[key]).map((secondKey) => {
        if (normalizedConditions[key][secondKey]) {
          results = { ...results, ...styles[key][secondKey] };
        }
      });
    }
  });

  return results;
};
