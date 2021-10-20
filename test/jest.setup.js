const { keys, difference } = require('lodash');

expect.extend({
  toHaveStructure(obj, structure) {
    const objectKeys = keys(obj);

    return {
      pass: difference(structure, objectKeys).length === 0,
      message: () => {
        let message = 'Doesnt exists on the object:';
        const x = structure
          .filter((key) => !objectKeys.includes(key))
          .forEach((key) => {
            message = `${message} ${key}`;
          });
        return message;
      },
    };
  },
});
