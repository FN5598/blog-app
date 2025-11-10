import "./LastLikedBlogPage.css";
import { HeaderComponent } from "../../components/main/HeaderComponent";
import { FooterComponent } from "../../components/main/FooterComponent";

export function LastLikedBlogPage() {
    return (
        <div className="last-visited-blog-container">
            <HeaderComponent />

            <FooterComponent />
        </div>
    );
}