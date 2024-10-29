// generateArray.test.ts
import { generate2DArray } from './generateFactors';

describe('generate2DArray', () => {
    it('should generate an array with the correct number of rows', () => {
        const rows = 5;
        const array = generate2DArray(rows);
        expect(array.length).toBe(rows);
    });

    it('should generate pairs of [integer, float]', () => {
        const rows = 5;
        const array = generate2DArray(rows);
        array.forEach(([intVal, floatVal]) => {
            expect(Number.isInteger(intVal)).toBe(true); // Check if integerValue is an integer
            expect(intVal).toBeGreaterThanOrEqual(0);
            expect(intVal).toBeLessThanOrEqual(100);
            expect(floatVal).toBeGreaterThanOrEqual(0);
            expect(floatVal).toBeLessThan(1);
        });
    });
});
