export default function Planner() {
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
                <form id="search-form" noValidate>
                    <label htmlFor="city-search">
                        01 <span>Pick a place</span>
                    </label>
                    <div className="search-field">
                        <span aria-hidden="true">⌕</span>
                        <input
                            id="city-search"
                            name="city"
                            type="search"
                            placeholder="Search a city, e.g. Madrid"
                            autoComplete="off"
                            minLength={2}
                            required
                            disabled
                            aria-describedby="search-status"
                        />
                        <button id="search-button" type="submit" disabled>
                            Find city <span aria-hidden="true">→</span>
                        </button>
                    </div>
                    <p id="search-status" className="field-status" role="status" />
                    <ul id="city-results" className="city-results" aria-label="Matching cities" />
                </form>
                <fieldset id="activities" disabled>
                    <legend>
                        02 <span>Choose your little escape</span>
                    </legend>
                    <div className="activity-options">
                        <label className="activity-option">
                            <input type="radio" name="activity" value="walking" defaultChecked />
                            <span>
                                <span aria-hidden="true">↟</span> Walking
                            </span>
                        </label>
                        <label className="activity-option">
                            <input type="radio" name="activity" value="cycling" />
                            <span>
                                <span aria-hidden="true">◎</span> Cycling
                            </span>
                        </label>
                        <label className="activity-option">
                            <input type="radio" name="activity" value="picnic" />
                            <span>
                                <span aria-hidden="true">♧</span> Picnic
                            </span>
                        </label>
                    </div>
                </fieldset>
            </div>
            <p id="activity-rules" className="rules">
                Walking weather: 10–28°C · Rain ≤ 30% · Wind ≤ 20 km/h · Daylight only
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
