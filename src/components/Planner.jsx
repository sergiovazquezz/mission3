import { useEffect, useRef, useState } from "react";
import { searchCities } from "../api.js";
import { ACTIVITIES, getDays, normalizeHours } from "../weather.js";
import useForecastCache from "../hooks/useForecastCache.js";
import Forecast from "./Forecast.jsx";
import CitySearch from "./CitySearch.jsx";
import ActivitySelector from "./ActivitySelector.jsx";

export default function Planner() {
    const { cachedForecast, getForecast } = useForecastCache();
    const [forecast, setForecast] = useState(() => {
        const cached = cachedForecast;
        return {
            city: cached?.city ?? null,
            data: cached?.data ?? null,
            retrievedAt: cached?.retrievedAt ?? null,
            status: cached ? "success" : "idle",
            error: "",
        };
    });
    const [query, setQuery] = useState(forecast.city?.name ?? "");
    const [selectedDate, setSelectedDate] = useState("");
    const [activityName, setActivityName] = useState("walking");
    const [search, setSearch] = useState({
        status: forecast.city ? "selected" : "idle",
        cities: [],
        error: "",
    });
    const inputRef = useRef(null);
    const activeRequest = useRef(null);
    const locationRef = useRef(null);
    const busy = search.status === "loading" || forecast.status === "loading";
    const activity = ACTIVITIES[activityName];

    useEffect(() => {
        return () => activeRequest.current?.abort();
    }, []);

    useEffect(() => {
        if (forecast.status === "success") {
            locationRef.current.focus({ preventScroll: true });
        }
    }, [forecast]);

    async function handleSearch(event) {
        event.preventDefault();
        if (activeRequest.current) return;

        if (query.trim().length < 2) {
            setSearch({
                status: "error",
                cities: [],
                error: "Enter at least two characters to find a city.",
            });
            inputRef.current.focus();
            return;
        }

        const controller = new AbortController();
        activeRequest.current = controller;
        setSearch({ status: "loading", cities: [], error: "" });

        try {
            const cities = await searchCities(query, controller.signal);
            if (!controller.signal.aborted) {
                setSearch({ status: "success", cities, error: "" });
            }
        } catch (error) {
            if (!controller.signal.aborted) {
                setSearch({ status: "error", cities: [], error: error.message });
            }
        } finally {
            activeRequest.current = null;
        }
    }

    async function loadForecast(city, refresh = false) {
        if (activeRequest.current) return;

        const sameCity =
            forecast.city?.latitude === city.latitude &&
            forecast.city?.longitude === city.longitude;
        if (!sameCity) setSelectedDate("");

        const controller = new AbortController();
        activeRequest.current = controller;
        setForecast({ city, status: "loading", data: null, retrievedAt: null, error: "" });

        try {
            const result = await getForecast(city, refresh, controller.signal);
            if (!controller.signal.aborted) {
                const days = getDays(normalizeHours(result.data), result.data.current.time);
                setSelectedDate((previous) => (days.includes(previous) ? previous : days[0]));
                setForecast({ city, ...result, status: "success", error: "" });
                setQuery(city.name);
                setSearch({ status: "selected", cities: [], error: "" });
            }
        } catch (error) {
            if (!controller.signal.aborted) {
                setForecast({
                    city,
                    status: "error",
                    data: null,
                    retrievedAt: null,
                    error: error.message,
                });
            }
        } finally {
            activeRequest.current = null;
        }
    }

    let forecastMessage = "";
    if (forecast.status === "loading") {
        forecastMessage = `Looking at the sky over ${forecast.city.name}…`;
    } else if (forecast.status === "success") {
        forecastMessage = `Forecast ready for ${forecast.city.name}. Choose a day to find your window.`;
    } else if (forecast.status === "error") {
        forecastMessage = forecast.error;
    }

    return (
        <section id="planner" className="planner" aria-labelledby="planner-title">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">YOUR NEXT BREATH OF FRESH AIR</p>
                    <h2 id="planner-title">What’s the plan?</h2>
                </div>
                <span className="small-note">One city. Seven days. Plenty of possibilities.</span>
            </div>
            <div className="controls-card">
                <CitySearch
                    ref={inputRef}
                    query={query}
                    onQueryChange={setQuery}
                    search={search}
                    busy={busy}
                    onSubmit={handleSearch}
                    onSelect={loadForecast}
                />
                <ActivitySelector value={activityName} onChange={setActivityName} disabled={busy} />
            </div>
            <p id="activity-rules" className="rules">
                {activity.label} weather: {activity.minTemperature}–{activity.maxTemperature}°C
                {" · "}Rain ≤ {activity.maxRain}% · Wind ≤ {activity.maxWind} km/h · Daylight only
            </p>
            <div id="forecast-status" className="forecast-status" role="status" aria-live="polite">
                {forecastMessage}
            </div>
            {forecast.status === "error" && (
                <button
                    id="retry-forecast"
                    className="secondary-button"
                    type="button"
                    disabled={busy}
                    onClick={() => loadForecast(forecast.city, true)}
                >
                    Try forecast again
                </button>
            )}
            {forecast.status === "success" && (
                <Forecast
                    ref={locationRef}
                    forecast={forecast}
                    activity={activity}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onRefresh={() => loadForecast(forecast.city, true)}
                    busy={busy}
                />
            )}
            {forecast.status === "idle" && (
                <div id="welcome" className="welcome">
                    <span className="welcome-icon" aria-hidden="true">
                        ☀
                    </span>
                    <h3>A change of scenery starts here.</h3>
                    <p>Pick a city above. We’ll find a little time for outside.</p>
                    <span className="welcome-tag">NO SIGN-UP. JUST SKY.</span>
                </div>
            )}
        </section>
    );
}
