import { HSVtoRGB } from "./Colour";

test("HSVtoRGB Black", () => {
  expect(HSVtoRGB(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
});

test("HSVtoRGB White", () => {
  expect(HSVtoRGB(0, 0, 1)).toEqual({ r: 1, g: 1, b: 1 });
});

test("HSVtoRGB Red", () => {
  expect(HSVtoRGB(1, 1, 1)).toEqual({ r: 1, g: 0, b: 0 });
});
