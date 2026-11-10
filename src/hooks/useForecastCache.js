import { useState } from "react";
import { validateForecast } from "../weather.js";
import { fetchForecast } from "../api.js";

const CACHE_KEY = "weekend-window-forecast";
const CACHE_DURATION_MS = 30 * 60 * 1000;

function readForecastCache(city = null) {
    try {
        const entry = JSON.parse(localStorage.getItem(CACHE_KEY));

        if (
            !entry ||
            !Number.isFinite(entry.retrievedAt) ||
            Date.now() - entry.retrievedAt >= CACHE_DURATION_MS ||
            entry.retrievedAt > Date.now()
        ) {
            return null;
        }

        const savedCity = entry.city;

        if (
            !savedCity ||
            typeof savedCity.name !== "string" ||
            !Number.isFinite(savedCity.latitude) ||
            !Number.isFinite(savedCity.longitude)
        ) {
            return null;
        }

        if (
            city &&
            (city.latitude !== savedCity.latitude || city.longitude !== savedCity.longitude)
        ) {
            return null;
        }

        validateForecast(entry.data);
        return entry;
    } catch {
        // Storage may be blocked or contain an old, incomplete response. Fetch normally instead.
        return null;
    }
}

function writeForecastCache(city, result) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ city, ...result }));
        return true;
    } catch {
        // A full or unavailable store must not prevent the forecast from being displayed.
        return false;
    }
}

export default function useForecastCache() {
    const [cachedForecast, setCachedForecast] = useState(readForecastCache);

    async function getForecast(city, refresh = false, signal) {
        signal?.throwIfAborted();
        const cached = refresh ? null : readForecastCache(city);

        if (cached) {
            setCachedForecast(cached);
            return { data: cached.data, retrievedAt: cached.retrievedAt };
        }

        const result = await fetchForecast(city, signal);
        // Unmounted or canceled requests must not overwrite the last usable cache.
        signal?.throwIfAborted();
        writeForecastCache(city, result);
        setCachedForecast({ city, ...result });
        return result;
    }

    return { cachedForecast, getForecast };
}
