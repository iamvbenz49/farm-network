/**
 * Calculates the distance between two points on the Earth given their latitude and longitude.
 * @param lat1 Latitude of point 1 in decimal degrees.
 * @param lon1 Longitude of point 1 in decimal degrees.
 * @param lat2 Latitude of point 2 in decimal degrees.
 * @param lon2 Longitude of point 2 in decimal degrees.
 * @returns Distance in kilometers.
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371; 
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}
