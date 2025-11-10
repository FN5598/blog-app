import "./HomePage.css";
import { HeaderComponent } from "../components/main/HeaderComponent";
import { DiscoverComponent } from "../components/DiscoverComponent";
import { FooterComponent } from "../components/main/FooterComponent"
import { PartOfTeamComponent } from "../components/PartOfTeamComponent";

export function HomePage() {
    return (
        <div className="home-page-container hide-scrollbar-smooth">
            <HeaderComponent />
            
            <DiscoverComponent />

            <PartOfTeamComponent />

            <FooterComponent />
        </div>
    );
}