import "./HomePage.css";
import { HeaderComponent } from "../components/HeaderComponent";
import { DiscoverComponent } from "../components/DiscoverComponent";
import { FooterComponent } from "../components/FooterComponent"

export function HomePage() {
    return (
        <>
            <HeaderComponent />
            
            <DiscoverComponent />

            <FooterComponent />
        </>
    );
}