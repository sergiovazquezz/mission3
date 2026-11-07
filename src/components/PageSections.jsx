export function SiteHeader() {
    return (
        <header className="site-header container">
            <a className="brand" href="./" aria-label="Weekend Window home">
                <span className="brand-mark" aria-hidden="true">
                    w.
                </span>
                weekend window<span className="brand-dot">●</span>
            </a>
            <span className="header-note">A little forecast. A little fresh air.</span>
        </header>
    );
}

export function Hero() {
    return (
        <section className="hero" aria-labelledby="page-title">
            <div className="hero-copy">
                <p className="eyebrow">
                    <span aria-hidden="true">✳</span> GOOD DAYS START OUTSIDE
                </p>
                <h1 id="page-title">
                    Find your window.
                    <br />
                    <span>Go enjoy outside.</span>
                </h1>
                <p className="hero-description">
                    A walk around the block. A ride with no destination. Lunch on the grass. Find
                    the weather for your kind of day.
                </p>
                <a className="text-link" href="#planner">
                    Let’s make a little plan <span aria-hidden="true">↘</span>
                </a>
            </div>
            <div className="sky-scene" aria-hidden="true">
                <div className="scene-label">LESS SCROLLING, MORE STROLLING</div>
                <div className="sun" />
                <div className="cloud cloud-one" />
                <div className="cloud cloud-two" />
                <div className="hill hill-back" />
                <div className="hill hill-front" />
                <div className="scene-caption">
                    There’s a good day out there.<span>Let’s find yours.</span>
                </div>
            </div>
        </section>
    );
}

export function HowItWorks() {
    return (
        <section className="how-it-works" aria-label="How it works">
            <div>
                <span className="step-number">01 /</span>
                <h3>Your place</h3>
                <p>Find your city, or somewhere you’d rather be.</p>
            </div>
            <div>
                <span className="step-number">02 /</span>
                <h3>Your pace</h3>
                <p>Choose a walk, a bike ride, or a blanket on the grass.</p>
            </div>
            <div>
                <span className="step-number">03 /</span>
                <h3>Your window</h3>
                <p>We connect the good hours. You make the most of them.</p>
            </div>
        </section>
    );
}

export function SiteFooter() {
    return (
        <footer className="container site-footer">
            <span>
                Made for a little more outside. <span aria-hidden="true">↗</span>
            </span>
            <span>
                Weather by <a href="https://open-meteo.com/">Open-Meteo</a>
                {" · "}Places by <a href="https://www.geonames.org/">GeoNames</a>
                {" · "}
                <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
            </span>
        </footer>
    );
}
