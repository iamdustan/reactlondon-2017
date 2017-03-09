/* @flow */

export const angle = (a, b) =>
  Math.atan2(
    b[1] - a[1],
    b[0] - a[0]
  );

export const toDeg = rad => rad / 180 * Math.PI;
export const toRad = deg => deg * 180 / Math.PI;

