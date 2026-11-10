import { getDays, getDayHours, normalizeHours } from "../weather.js";
import DaySelector from "./DaySelector.jsx";
import Recommendations from "./Recommendations.jsx";
import HourlyForecast from "./HourlyForecast.jsx";

export default function Forecast({ forecast, activity, selectedDate, onDateChange, onRefresh, busy, ref }) {
    const { city, data, retrievedAt } = forecast;
    const hours = normalizeHours(data);
    const days = getDays(hours, data.current.time);
    const date = days.includes(selectedDate) ? selectedDate : days[0];
    const dayHours = getDayHours(hours, date, data.current.time);
    const location = [city.name, city.region, city.country].filter(Boolean).join(", ");

    return (
        <section id="forecast" aria-label="Your forecast" aria-busy={busy}>
            <div className="forecast-heading">
                <div>
                    <p className="eyebrow">A LOOK AHEAD</p>
                    <h2 id="location-title" tabIndex={-1} ref={ref}>{city.name}</h2>
                    <p id="forecast-meta" className="small-note">
                        {location} · {data.timezone} · Local times
                        {" · "}Retrieved {new Date(retrievedAt).toISOString().slice(11, 16)} UTC
                    </p>
                </div>
                <button id="refresh-button" type="button" className="secondary-button" onClick={onRefresh} disabled={busy}>
                    ↻ Refresh forecast
                </button>
            </div>
            <DaySelector days={days} value={date} onChange={onDateChange} />
            <Recommendations hours={dayHours} activity={activity} date={date} />
            <HourlyForecast hours={dayHours} activity={activity} />
        </section>
    );
}
