import { Routes, Route } from "react-router-dom";
import SandboxHomePage from "./HomePage";
import SandboxLoginPage from "./LogInPage";
import SandboxBootstrapDemo from "./BootstrapDemo";
import SandboxGameReview from "./GameReviews";
import SandboxSingleReview from "./SingleReview";

export default function Sandbox() {
    return (
        <Routes>
            <Route path="Homepage" element={<SandboxHomePage />} />
            <Route path="Login" element={<SandboxLoginPage />} />
            <Route path="GameReviews/:gameId" element={<SandboxGameReview />} />
            <Route path="GameReviews/:gameId/review/:revId" element={<SandboxSingleReview />} />
            <Route path="BootstrapDemo" element={<SandboxBootstrapDemo />} />
        </Routes>
    );
}