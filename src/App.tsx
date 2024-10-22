import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Example from './API/Example'
import LoginPage from './Pages/LogInPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import ProfileEditPage from './Pages/ProfileEditPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/sandbox/api/example" element={<Example />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
