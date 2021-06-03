export const withoutDuplicate = array => {
  let seen = new Set();
  return array.filter(item => {
    let k = item.id;
    return seen.has(k) ? false : seen.add(k);
  });
};
