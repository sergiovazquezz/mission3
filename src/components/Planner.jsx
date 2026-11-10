import { useEffect, useRef, useState } from "react";
import { searchCities } from "../api.js";
import { ACTIVITIES } from "../weather.js";
import CitySearch from "./CitySearch.jsx";
import ActivitySelector from "./ActivitySelector.jsx";

export default function Planner() {
    const [query, setQuery] = useState("");
    const [activityName, setActivityName] = useState("walking");
    const [search, setSearch] = useState({ status: "idle", cities: [], error: "" });
    const inputRef = useRef(null);
    const searchRequest = useRef(null);
    const busy = search.status === "loading";
    const activity = ACTIVITIES[activityName];

    useEffect(() => {
        return () => searchRequest.current?.abort();
    }, []);

    async function handleSearch(event) {
        event.preventDefault();
        if (searchRequest.current) return;

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
        searchRequest.current = controller;
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
            if (searchRequest.current === controller) searchRequest.current = null;
        }
    }

    function handleCitySelect(city) {
        setQuery(city.name);
        setSearch({ status: "selected", cities: [], error: "" });
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
                    onSelect={handleCitySelect}
                />
                <ActivitySelector value={activityName} onChange={setActivityName} disabled={busy} />
            </div>
            <p id="activity-rules" className="rules">
                {activity.label} weather: {activity.minTemperature}–{activity.maxTemperature}°C
                {" · "}Rain ≤ {activity.maxRain}% · Wind ≤ {activity.maxWind} km/h · Daylight only
            </p>
            <div
                id="forecast-status"
                className="forecast-status"
                role="status"
                aria-live="polite"
            />
            <div id="welcome" className="welcome">
                <span className="welcome-icon" aria-hidden="true">
                    ☀
                </span>
                <h3>A change of scenery starts here.</h3>
                <p>Pick a city above. We’ll find a little time for outside.</p>
                <span className="welcome-tag">NO SIGN-UP. JUST SKY.</span>
            </div>
        </section>
    );
}
