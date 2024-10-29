import { haversineDistance } from './haversineDistance';

describe('haversineDistance', () => {
    it('should calculate the correct distance between Berlin and Paris', () => {
        const distance = haversineDistance(52.5200, 13.4050, 48.8566, 2.3522); // Berlin and Paris
        expect(distance).toBeCloseTo(877.46, 2); 
    });

    it('should calculate the distance between New York and Los Angeles', () => {
        const distance = haversineDistance(40.7128, -74.0060, 34.0522, -118.2437); // New York and Los Angeles
        expect(distance).toBeCloseTo(3935.75, 2); 
    });

    it('should calculate the distance between two identical points as 0', () => {
        const distance = haversineDistance(37.7749, -122.4194, 37.7749, -122.4194); // San Francisco to itself
        expect(distance).toBe(0); 
    });

    it('should calculate the distance between two points very close to each other', () => {
        const distance = haversineDistance(51.5007, -0.1246, 51.5008, -0.1245); // Very close points in London
        expect(distance).toBeLessThan(0.2); 
    });
});
