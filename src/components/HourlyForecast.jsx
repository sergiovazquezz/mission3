import { getHourReason } from "../weather.js";

function measurement(value, unit) {
    return Number.isFinite(value) ? `${value}${unit}` : "Unavailable";
}

export default function HourlyForecast({ hours, activity }) {
    return (
        <details className="hourly-details" open>
            <summary>The day, hour by hour <span aria-hidden="true">↗</span></summary>
            <p className="small-note">
                Forecast samples in local time. Highlighted hours match all your activity preferences.
            </p>
            <div className="table-scroll">
                <table>
                    <caption className="sr-only">Hourly weather and activity matches</caption>
                    <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">Rain chance</th>
                            <th scope="col">Wind</th>
                            <th scope="col">Your plan</th>
                        </tr>
                    </thead>
                    <tbody id="hourly-rows">
                        {hours.map((hour) => {
                            const reason = getHourReason(hour, activity);
                            const matches = reason === "Good to go";
                            return (
                                <tr key={hour.time} className={matches ? "matching-hour" : ""}>
                                    <th scope="row">{hour.clock}</th>
                                    <td>{measurement(hour.temperature, "°C")}</td>
                                    <td>{measurement(hour.rain, "%")}</td>
                                    <td>{measurement(hour.wind, " km/h")}</td>
                                    <td>
                                        <span className={matches ? "hour-status match" : "hour-status"}>
                                            {reason}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </details>
    );
}
