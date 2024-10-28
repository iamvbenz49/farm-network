/**
 * returns heuristic value for given set of external factors
 *
 * @param factors - A 2D array values and its weight
 * @returns float
 */

export const calculateHeuristic = (factors: number[][]): number => {
    return factors.reduce((sum, subarray) => 
        sum + subarray.reduce((product, num) => product * num, 1), 0
    );
}