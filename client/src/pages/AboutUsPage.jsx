import { FooterComponent } from "../components/main/FooterComponent";
import { HeaderComponent } from "../components/main/HeaderComponent";
import "./AboutUsPage.css";

export function AboutUsPage() {
    return (
        <div className="about-us-container">
            <HeaderComponent />

            <FooterComponent />
        </div>
    );
}