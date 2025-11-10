import { GeneralInquiriesComponent } from "../components/GeneralInquiriesComponent";
import { FooterComponent } from "../components/main/FooterComponent";
import { HeaderComponent } from "../components/main/HeaderComponent";
import { PartOfTeamComponent } from "../components/PartOfTeamComponent";
import "./ContactUsPage.css";
import { AskedQuestionsComponent } from '../components/AskedQuestionsComponent'

export function ContactUsPage() {
    return (
        <div>
            <HeaderComponent />

            <GeneralInquiriesComponent />

            <AskedQuestionsComponent />

            <PartOfTeamComponent />

            <FooterComponent />
        </div>
    );
}