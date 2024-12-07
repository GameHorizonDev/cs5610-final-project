import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import Example from './API/Example';
import LoginPage from './Pages/LoginPage/LogInPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import ProfileEditPage from './Pages/ProfileEditPage';
import Sandbox from './Sandbox';
import SearchResultPage from './Pages/SearchResultPage';
import ViewGamePage from './Pages/ViewGamePage';
import HomePage from './Homepage/index'
import BookmarkedReviews from './Pages/BookmarkedReviews';
import FavoritedGames from './Pages/FavoritedGames';
import GameReview from './Pages/GameReviews';
import SingleReview from './Pages/SingleReview';
import ReviewEditor from './Pages/ReviewEditor';
import UserProfilePage from './Pages/UserProfilePage';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <div className="App" >
      <Router>
        <Navigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:profileId" element={<UserProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/sandbox/api/example" element={<Example />} />
            <Route path="/sandbox/*" element={<Sandbox />} />
            <Route path="/search-results/:search_query?" element={<SearchResultPage header={"Search Results for Games"} />} />
            <Route path="/view-game/default" element={<SearchResultPage limit={5} header={"5 Random Games"} />} />
            <Route path="/view-game/:gameId" element={<ViewGamePage />} />
            <Route path='/profile/bookmarked-reviews' element={<BookmarkedReviews />} />
            <Route path='/profile/favorite-games' element={<FavoritedGames />} />
            <Route path="/GameReviews/:gameId" element={<GameReview />} />
            <Route path="/GameReviews/:gameId/review/:revId" element={<SingleReview />} />
            <Route path="/GameReviews/:gameId/review/:revId/edit" element={<ReviewEditor />} />
            <Route path='/landing' element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </div >
  );
}

export default App;
