export default function DaySelector({ days, value, onChange }) {
    return (
        <fieldset className="days-fieldset">
            <legend className="sr-only">Choose a forecast day</legend>
            <div id="day-options" className="day-options">
                {days.map((date, index) => (
                    <button
                        key={date}
                        className="day-button"
                        type="button"
                        aria-label={`Forecast for ${date}`}
                        aria-pressed={value === date}
                        onClick={() => onChange(date)}
                    >
                        <span className="day-eyebrow">{index === 0 ? "NEXT UP" : "LOOK AHEAD"}</span>
                        <span className="day-date">{date.slice(5)}</span>
                    </button>
                ))}
            </div>
        </fieldset>
    );
}
