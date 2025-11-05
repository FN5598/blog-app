import "./HomePage.css";
import { HeaderComponent } from "../components/HeaderComponent";
import { DiscoverComponent } from "../components/DiscoverComponent";
import { FooterComponent } from "../components/FooterComponent"
import { PartOfTeamComponent } from "../components/PartOfTeamComponent";

export function HomePage() {
    return (
        <>
            <HeaderComponent />
            
            <DiscoverComponent />

            <PartOfTeamComponent />

            <FooterComponent />
        </>
    );
}