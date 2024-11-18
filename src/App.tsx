import { lazy, Suspense, useEffect, useState } from 'react';
import Main from './components/Main';
import NavBar from './components/NavBar';
import { getToken } from './services/songServices';
import { Routes, Route } from 'react-router-dom';
const DisplaySong = lazy(() => import('./pages/DisplaySong/DisplaySong'));
const FavoritePage = lazy(() => import('./pages/FavoritePage/FavoritePage'));
const SongsPage = lazy(() => import('./pages/song-page/SongsPage'));

const App = () => {
  const [token, setToken] = useState<string>(
    localStorage.getItem('accessToken')!
  );
  const date = Date.now();
  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');
    const expiration_time = localStorage.getItem('expireTime');
    let expirationTime = JSON.parse(expiration_time!);
    const retrieveToken = async () => {
      if (!access_token || date > expirationTime) {
        const req = await getToken();
        expirationTime = Date.now() + req.expires_in * 1000;
        setToken(req.access_token);
        localStorage.setItem('accessToken', req.access_token);
        localStorage.setItem('expireTime', JSON.stringify(expirationTime));
      } else {
        setToken(access_token);
      }
    };

    // Get the initial Token
    retrieveToken();

    setInterval(retrieveToken, (3600 - 300) * 1000);
  }, [date]);

  return (
    <div>
      <NavBar />
      <Suspense fallback={<div>loading ...</div>}>
        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/songs' element={<SongsPage token={token} />} />
            <Route path='/song/:songId' element={<DisplaySong />} />
            <Route path='/my-favorite/:userId' element={<FavoritePage />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </Suspense>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default App;
