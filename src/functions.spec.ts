
// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { calculateRPNResult } from "./calculator_functions";
expect.extend(matchers);

test('Calculate RPN Result', () => {
  expect(calculateRPNResult('1 1 +')).toEqual(2);
  expect(calculateRPNResult('1 NEGATE')).toEqual(-1);
  expect(calculateRPNResult('8 6 -')).toEqual(2);
  expect(calculateRPNResult('2 2 x')).toEqual(4);
  expect(calculateRPNResult('1 1 3 4 + x -')).toEqual(-6);
  expect(calculateRPNResult('8 2 /')).toEqual(4);
  expect(calculateRPNResult('1 2 4 6 + x -')).toEqual(-19);
  expect(calculateRPNResult('5 1 2 + 4 x + 3 -')).toEqual(14);
})

