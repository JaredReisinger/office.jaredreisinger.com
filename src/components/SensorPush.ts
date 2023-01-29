import { readable } from 'svelte/store';
// import { DateTime } from 'luxon';

// try fetching from sensorpush-proxy!
const sensorApi = 'https://sensorpush-proxy.spudnoggin.com/sensors';

interface SensorReading {
  altitude: number;
  barometric_pressure: number;
  dewpoint: number;
  humidity: number;
  observed: string; // date!
  temperature: number;
  vpd: number;
}

export const sensors = readable<Record<string, SensorReading>>(
  undefined,
  function start(set) {
    // lexically scoped so as to have access to set()!
    async function fetchReadings() {
      try {
        // const timestamp = DateTime.local();
        const response = await fetch(sensorApi);
        const data = await response.json();

        // set({ timestamp, sensors });
        set(data);
      } catch (err) {
        console.log('SensorPush.sensors--unable to fetch... no sensor data');
      }
    }

    // console.log('SensorPush.sensors--starting');
    fetchReadings();
    const interval = setInterval(fetchReadings, 30 * 1000);

    return function stop() {
      // console.log('SensorPush.sensors--stopping');
      clearInterval(interval);
    };
  }
);
