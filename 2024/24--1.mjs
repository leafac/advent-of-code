function x00() {
  return 1;
}
function x01() {
  return 1;
}
function x02() {
  return 1;
}
function y00() {
  return 0;
}
function y01() {
  return 1;
}
function y02() {
  return 0;
}

function z00() {
  return x00() & y00();
}
function z01() {
  return x01() ^ y01();
}
function z02() {
  return x02() | y02();
}

console.log(parseInt(String(z02()) + String(z01()) + String(z00()), 2));
