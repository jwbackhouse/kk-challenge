// Creating this function in a shared util file on the
// assumption it would be used elsewhere in the application

import { Cat } from 'src/comms/comms.schema';

export function concatenateCats(cats: Array<Cat>) {
  switch (cats.length) {
    case 0:
      return '';
    case 1:
      return cats[0].name;
    case 2:
      return `${cats[0].name} and ${cats[1].name}`;
    default:
      return `${cats
        .slice(0, -1)
        .map((cat) => cat.name)
        .join(', ')} and ${cats.slice(-1)[0].name}`;
  }
}
