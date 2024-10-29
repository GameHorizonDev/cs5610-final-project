import { Routes, Route } from "react-router-dom";
import SandboxHomePage from "./HomePage";
import SandboxLoginPage from "./LogInPage";
import SandboxBootstrapDemo from "./BootstrapDemo";
import SandboxGameReview from "./GameReview";

export default function Sandbox() {
    return (
        <Routes>
            <Route path="Homepage" element={<SandboxHomePage />} />
            <Route path="Login" element={<SandboxLoginPage />} />
            <Route path="GameReview" element={<SandboxGameReview />} />
            <Route path="BootstrapDemo" element={<SandboxBootstrapDemo />} />
        </Routes>
    );
}