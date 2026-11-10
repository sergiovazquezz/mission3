import { ACTIVITIES } from "../weather.js";

const symbols = { walking: "↟", cycling: "◎", picnic: "♧" };

export default function ActivitySelector({ value, onChange, disabled }) {
    return (
        <fieldset id="activities" disabled={disabled}>
            <legend>
                02 <span>Choose your little escape</span>
            </legend>
            <div className="activity-options">
                {Object.entries(ACTIVITIES).map(([name, activity]) => (
                    <label className="activity-option" key={name}>
                        <input
                            type="radio"
                            name="activity"
                            value={name}
                            checked={value === name}
                            onChange={() => onChange(name)}
                        />
                        <span>
                            <span aria-hidden="true">{symbols[name]}</span> {activity.label}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
