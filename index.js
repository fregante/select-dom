module.exports = one;
module.exports.all = all;

function one (selector, parent) {
  if (!parent) parent = document;
  return parent.querySelector(selector);
}

function all (selector, parent) {
  if (!parent) parent = document;
  return parent.querySelectorAll(selector);
}
