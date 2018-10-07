import { vec3 } from "gl-matrix";
import { getRandominUnitSphere, getRandomInUnitDisc, reflect } from "./Util";

describe("Random Units", () => {
  test("Sphere", () => {
    expect(getRandominUnitSphere()[0]).toBeLessThanOrEqual(1.0);
    expect(getRandominUnitSphere()[0]).toBeGreaterThanOrEqual(-1.0);
    expect(getRandominUnitSphere()[1]).toBeLessThanOrEqual(1.0);
    expect(getRandominUnitSphere()[1]).toBeGreaterThanOrEqual(-1.0);
    expect(getRandominUnitSphere()[2]).toBeLessThanOrEqual(1.0);
    expect(getRandominUnitSphere()[2]).toBeGreaterThanOrEqual(-1.0);
  });

  test("Disc", () => {
    expect(getRandomInUnitDisc()[0]).toBeLessThanOrEqual(1.0);
    expect(getRandomInUnitDisc()[0]).toBeGreaterThanOrEqual(-1.0);
    expect(getRandomInUnitDisc()[1]).toBeLessThanOrEqual(1.0);
    expect(getRandomInUnitDisc()[1]).toBeGreaterThanOrEqual(-1.0);
    expect(getRandomInUnitDisc()[2]).toBe(0.0);
  });
});

describe("Reflect", () => {
  test("X", () => {
    expect(reflect(vec3.fromValues(1, 0, 0), vec3.fromValues(1, 0, 0))).toEqual(
      vec3.fromValues(-1, 0, 0)
    );
  });

  test("Y", () => {
    expect(reflect(vec3.fromValues(0, 1, 0), vec3.fromValues(0, 1, 0))).toEqual(
      vec3.fromValues(0, -1, 0)
    );
  });

  test("Z", () => {
    expect(reflect(vec3.fromValues(0, 0, 1), vec3.fromValues(0, 0, 1))).toEqual(
      vec3.fromValues(0, 0, -1)
    );
  });
});
