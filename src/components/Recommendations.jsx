import { findWindows, summarizeWindows, windowLabel } from "../weather.js";

function WindowCard({ hours, best }) {
    const rain = Math.max(...hours.map((hour) => hour.rain));
    const wind = Math.max(...hours.map((hour) => hour.wind));
    const minTemperature = Math.min(...hours.map((hour) => hour.temperature));
    const maxTemperature = Math.max(...hours.map((hour) => hour.temperature));

    return (
        <article className={best ? "window-card best-window" : "window-card"}>
            <span className="window-tag">
                {best ? "✳ YOUR BEST WINDOW" : "ANOTHER LITTLE OPENING"}
            </span>
            <h4>{windowLabel(hours)}</h4>
            <p>{hours.length} {hours.length === 1 ? "hour" : "hours"} to make your own</p>
            <div className="window-weather">
                {minTemperature}–{maxTemperature}°C · Rain ≤ {rain}% · Wind ≤ {wind} km/h
            </div>
        </article>
    );
}

export default function Recommendations({ hours, activity, date }) {
    const windows = findWindows(hours, activity);
    const summary = summarizeWindows(windows);

    return (
        <div id="recommendations">
            <div className="results-heading">
                <h3>Your {activity.label.toLowerCase()} outlook</h3>
                <span className="small-note">{date}</span>
            </div>
            <div className="stats">
                <div className="stat">
                    <span className="stat-label">TIME FOR OUTSIDE</span>
                    <strong className="stat-value">
                        {summary.totalHours} {summary.totalHours === 1 ? "hour" : "hours"}
                    </strong>
                </div>
                <div className="stat">
                    <span className="stat-label">YOUR LONGEST WINDOW</span>
                    <strong className="stat-value">
                        {summary.longest.length > 0 ? windowLabel(summary.longest) : "No window yet"}
                    </strong>
                </div>
            </div>
            {windows.length === 0 && (
                <div className="empty-results">
                    <h3>A good day for a different plan.</h3>
                    <p>
                        No daylight hours match these preferences. Try another activity or day;
                        the forecast is below.
                    </p>
                </div>
            )}
            <div className="window-cards">
                {windows.map((hours) => (
                    <WindowCard key={hours[0].time} hours={hours} best={hours === summary.longest} />
                ))}
            </div>
        </div>
    );
}
