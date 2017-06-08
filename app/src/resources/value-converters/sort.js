  export class SortValueConverter {
    toView(array, config) {
      var factor = (config.direction || 'ascending') === 'ascending' ? 1 : -1;
      return (array || [])
        .slice(0)
        .sort((a, b) => {
          return (a[config.propertyName] < b[config.propertyName] ? -1 : 1) *
            factor
        });
    }
  }

  export class GroupsValueConverter {
    toView(array, count) {
      if (count < 2)
        return [array];

      var len = array.length,
        out = [],
        i = 0,
        size;

      if (len % count === 0) {
        size = Math.floor(len / count);
        while (i < len) {
          out.push(array.slice(i, i += size));
        }
      } else {
        while (i < len) {
          size = Math.ceil((len - i) / count--);
          out.push(array.slice(i, i += size));
        }
      }

      return out;

    }
  }
