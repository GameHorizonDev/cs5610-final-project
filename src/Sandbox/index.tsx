import { Routes, Route } from "react-router-dom";
import SandboxHomePage from "./HomePage";
import SandboxLoginPage from "./LogInPage";
import SandboxBootstrapDemo from "./BootstrapDemo";
import SandboxGameReview from "../Pages/GameReviews";
import SandboxSingleReview from "../Pages/SingleReview";

export default function Sandbox() {
    return (
        <Routes>
            <Route path="Homepage" element={<SandboxHomePage />} />
            <Route path="Login" element={<SandboxLoginPage />} />

            <Route path="BootstrapDemo" element={<SandboxBootstrapDemo />} />
        </Routes>
    );
}
