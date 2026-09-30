/**
 * Geolocation & Reverse Geocoding Utility
 * Uses navigator.geolocation.getCurrentPosition and Nominatim OpenStreetMap
 */

export async function detectCurrentLocation(): Promise<string> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser or device.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Reverse geocode using Nominatim OpenStreetMap
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
          const response = await fetch(url, {
            headers: {
              Accept: 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Reverse geocoding failed with status: ${response.status}`);
          }

          const data = await response.json();
          const address = data.address || {};

          // Extract area and city names
          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.subdistrict ||
            address.city_district ||
            address.quarter;

          const city =
            address.city ||
            address.town ||
            address.municipality ||
            address.village ||
            address.county ||
            address.state_district;

          const state = address.state;

          const components: string[] = [];
          if (area) components.push(area);
          if (city && city !== area) components.push(city);
          if (!components.length && state) components.push(state);

          if (components.length > 0) {
            resolve(components.join(', '));
          } else if (data.display_name) {
            const parts = data.display_name.split(',').map((s: string) => s.trim());
            resolve(parts.slice(0, 2).join(', '));
          } else {
            resolve(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          }
        } catch (err: any) {
          console.error('[Nominatim Reverse Geocoding Error]:', err);
          reject(new Error('Failed to reverse geocode coordinates to an address.'));
        }
      },
      (geoError) => {
        let errorMsg = 'Unable to detect your location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. Please allow location access in your browser.';
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is unavailable.';
        } else if (geoError.code === geoError.TIMEOUT) {
          errorMsg = 'Location detection request timed out.';
        }
        reject(new Error(errorMsg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  });
}
