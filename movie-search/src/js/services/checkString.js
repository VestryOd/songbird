import { invalidInput } from "./messages";
import { getTranslate } from "../services/getData";

const checkString = text => {
  let query = text;
  if (
    query.length <= 1 ||
    query === "" ||
    query.match(/[a-zA-Zа-яА-Я]/) === null
  ) {
    throw new Error(invalidInput);
  }

  if (query.match(/@|#|\$|%|\^|&|\*|\(|\)/)) {
    let str = query;
    query = str.match(/[a-zA-Zа-яА-Я\s\\'\\"]/g).join("");
  }

  if (query[0] === `'` || query[0] === `"`) {
    query = query.slice(1);
  }

  if (query[query.length - 1] === `'` || query[query.length - 1] === `"`) {
    query = query.slice(0, query.length - 1);
  }

  return query;
}

export default checkString;
