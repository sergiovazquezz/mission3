export default function CitySearch({
    query,
    onQueryChange,
    search,
    busy,
    onSubmit,
    onSelect,
    ref,
}) {
    let message = "";
    switch (search.status) {
        case "loading":
            message = "Finding your place…";
            break;
        case "success":
            message = search.cities.length
                ? `${search.cities.length} ${search.cities.length === 1 ? "place" : "places"} found. Choose your city below.`
                : "No cities found. Try another name, or add a country after a comma.";
            break;
        case "error":
            message = search.error;
            break;
        case "selected":
            message = "Want a change of scenery? Search another city.";
            break;
    }

    return (
        <form id="search-form" noValidate onSubmit={onSubmit} aria-busy={busy}>
            <label htmlFor="city-search">
                01 <span>Pick a place</span>
            </label>
            <div className="search-field">
                <span aria-hidden="true">⌕</span>
                <input
                    ref={ref}
                    id="city-search"
                    name="city"
                    type="search"
                    placeholder="Search a city, e.g. Madrid"
                    autoComplete="off"
                    minLength={2}
                    required
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    disabled={busy}
                    aria-describedby="search-status"
                />
                <button id="search-button" type="submit" disabled={busy}>
                    Find city <span aria-hidden="true">→</span>
                </button>
            </div>
            <p id="search-status" className="field-status" role="status">
                {message}
            </p>
            <ul id="city-results" className="city-results" aria-label="Matching cities">
                {search.cities.map((city) => (
                    <li key={city.id ?? `${city.latitude},${city.longitude}`}>
                        <button
                            className="city-result"
                            type="button"
                            disabled={busy}
                            onClick={() => onSelect(city)}
                        >
                            {[city.name, city.region, city.country].filter(Boolean).join(", ")}
                        </button>
                    </li>
                ))}
            </ul>
        </form>
    );
}
