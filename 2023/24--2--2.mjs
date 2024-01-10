import * as z3 from "z3-solver";

const z3APIs = await z3.init();
const z3Context = new z3APIs.Context();

/*
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4

h1px, h1py, h1pz @ h1vx, h1vy, h1vz
h2px, h2py, h2pz @ h2vx, h2vy, h2vz
h3px, h3py, h3pz @ h3vx, h3vy, h3vz

rpx, rpx, rpz @ rvx, rvy, rvz

h1px + h1vx * t1 = rpx + rvx * t1
h1py + h1vy * t1 = rpy + rvy * t1
h1pz + h1vz * t1 = rpz + rvz * t1

h2px + h2vx * t2 = rpx + rvx * t2
h2py + h2vy * t2 = rpy + rvy * t2
h2pz + h2vz * t2 = rpz + rvz * t2

h3px + h3vx * t3 = rpx + rvx * t3
h3py + h3vy * t3 = rpy + rvy * t3
h3pz + h3vz * t3 = rpz + rvz * t3
*/

const h1px = ___;
const h1py = ___;
const h1pz = ___;
const h1vx = ___;
const h1vy = ___;
const h1vz = ___;
const h2px = ___;
const h2py = ___;
const h2pz = ___;
const h2vx = ___;
const h2vy = ___;
const h2vz = ___;
const h3px = ___;
const h3py = ___;
const h3pz = ___;
const h3vx = ___;
const h3vy = ___;
const h3vz = ___;

const rpx = z3Context.Real.const("rpx");
const rpy = z3Context.Real.const("rpy");
const rpz = z3Context.Real.const("rpz");
const rvx = z3Context.Real.const("rvx");
const rvy = z3Context.Real.const("rvy");
const rvz = z3Context.Real.const("rvz");
const t1 = z3Context.Real.const("t1");
const t2 = z3Context.Real.const("t2");
const t3 = z3Context.Real.const("t3");

console.log(
  (
    await z3Context.solve(
      t1.mul(h1vx).add(h1px).eq(t1.mul(rvx).add(rpx)),
      t1.mul(h1vy).add(h1py).eq(t1.mul(rvy).add(rpy)),
      t1.mul(h1vz).add(h1pz).eq(t1.mul(rvz).add(rpz)),
      t2.mul(h2vx).add(h2px).eq(t2.mul(rvx).add(rpx)),
      t2.mul(h2vy).add(h2py).eq(t2.mul(rvy).add(rpy)),
      t2.mul(h2vz).add(h2pz).eq(t2.mul(rvz).add(rpz)),
      t3.mul(h3vx).add(h3px).eq(t3.mul(rvx).add(rpx)),
      t3.mul(h3vy).add(h3py).eq(t3.mul(rvy).add(rpy)),
      t3.mul(h3vz).add(h3pz).eq(t3.mul(rvz).add(rpz))
    )
  )
    .eval(rpx.add(rpy).add(rpz))
    .toString()
);
process.exit(0);
