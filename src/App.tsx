import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import NotFoundPage from './Pages/NotFoundPage';
import Example from './API/Example'
import LoginPage from './Pages/LogInPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import ProfileEditPage from './Pages/ProfileEditPage';
import Sandbox from './Sandbox';
import SearchResultPage from './Pages/SearchResultPage';
import ViewGamePage from './Pages/ViewGamePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/sandbox/api/example" element={<Example />} />
          <Route path="/sandbox/*" element={<Sandbox />} />
          <Route path='/search-results/:search_query?' element={<SearchResultPage />} />
          <Route path='/view-game/:gameId' element={<ViewGamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
