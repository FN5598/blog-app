import { BlogsComponent } from "../../components/blog/BlogsComponent";
import { FooterComponent } from "../../components/main/FooterComponent";
import { HeaderComponent } from "../../components/main/HeaderComponent";
import "./BlogsPage.css";

export function BlogsPage() {
    return (
        <div>
            <HeaderComponent />

            <BlogsComponent />

            <FooterComponent />
        </div>
    );
}