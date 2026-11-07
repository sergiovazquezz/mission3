import { Hero, HowItWorks, SiteFooter, SiteHeader } from "./components/PageSections.jsx";
import Planner from "./components/Planner.jsx";

function App() {
    return (
        <>
            <a className="skip-link" href="#planner">
                Skip to planner
            </a>
            <SiteHeader />
            <main className="container">
                <Hero />
                <Planner />
                <HowItWorks />
            </main>
            <SiteFooter />
        </>
    );
}

export default App;
