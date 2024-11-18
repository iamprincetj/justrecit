import { lazy, Suspense, useEffect, useState } from 'react';
import './css/SongsPage.css';
import { getGenre, getRec } from '../../services/songServices';
import { SpotifyDataList } from '../../type.ts';
import { recdata } from '../../data.ts';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import NextIcon from '@mui/icons-material/NavigateNext';
import PrevIcon from '@mui/icons-material/NavigateBefore';
import {
  useNotificationDispatch,
  useSpotifyDispatch,
  useSpotifyValue,
} from '../../utils/contexts/contextNeeded.ts';
import { addNotification, nameSongArtist } from '../../utils/helperFunc.ts';
const Song = lazy(() => import('./Song'));

interface songType {
  token: string;
}

const SongsPage = ({ token }: songType) => {
  let seedArtists = '';
  let seedArtist = '';
  let seedTrack = '';
  let seedGenre = '';
  const dispatch = useSpotifyDispatch();
  const value = useSpotifyValue();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [returnsearchQuery, setReturnSearchQuery] = useState<string | null>(
    sessionStorage.getItem('searchQuery')
  );
  const [data, setData] = useState<SpotifyDataList | null>(value);
  const windowWidth = window.outerWidth;
  const dataSize = windowWidth >= 600 ? 9 : 10;
  const navBtnNum = Math.ceil((data?.tracks?.length ?? 0) / dataSize);
  const navBtnList = [];
  const [firstDataIdx, setFirstDataIdx] = useState<number>(1);
  const [lastDataIdx, setLastDataIdx] = useState<number>(dataSize);
  const activePage = lastDataIdx / dataSize;
  const notificationDispatch = useNotificationDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = data?.tracks.map(
      (item) => item.album.images[1].url
    )[0] as string;
    const imgElement = new Image();
    imgElement.src = images;
    imgElement.onload = () => {
      setLoading(false);
    };
  }, [data?.tracks]);

  for (let i = 0; i < navBtnNum; i++) {
    navBtnList.push(i + 1);
  }

  const helperGetSongs = async () => {
    if (searchQuery) {
      const req = await axios.get(
        `https://api.spotify.com/v1/search?access_token=${token}&query=${searchQuery}&type=track&limit=3`
      );
      const songData: typeof recdata = req.data.tracks.items;
      songData.forEach((val, idx) => {
        const str = val.album.artists
          .map((val) => {
            return val.id;
          })
          .toString();
        if (idx < 3 && seedArtists.split(',').length < 3) {
          if (idx === 2) {
            seedArtists += str;
          } else {
            seedArtists += str + ',';
          }
        }
        if (idx === 0) {
          seedTrack = val.id;
          seedArtist = val.album.artists[0].id;
        }
      });
      seedGenre = await getGenre(seedArtist, token);
      const recSong = await getRec(seedTrack, token, seedGenre, seedArtists);

      setData(recSong);
      dispatch({ type: 'ADD_DATA', payload: recSong });
      sessionStorage.setItem('spotifyData', JSON.stringify(recSong));
      sessionStorage.setItem('searchQuery', searchQuery);
      setReturnSearchQuery(searchQuery);
    } else {
      addNotification('Please input song name or artist', notificationDispatch);

      setTimeout(() => addNotification('', notificationDispatch), 3000);
    }
  };

  const getRecSong = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    helperGetSongs();
  };

  return (
    <div className='songs-main-container'>
      <div className='img-song-container'>
        <form action='' className='search-container' onSubmit={getRecSong}>
          <input
            type='text'
            name='search query'
            id='search-query'
            placeholder='Search for a song...'
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
          />
          <SearchIcon className='search-icon' onClick={helperGetSongs} />
        </form>
      </div>
      {data?.tracks && data?.tracks.length > 0 ? (
        <>
          <div className='songs-content-container'>
            <div className='songs-text-content'>
              <h1>Songs Similar to {returnsearchQuery}</h1>
            </div>
            <Suspense fallback={<div>loading...</div>}>
              <div className='songs-container'>
                {data.tracks.map((item, idx) => {
                  if (idx >= firstDataIdx - 1 && idx < lastDataIdx) {
                    return (
                      <Song
                        key={idx}
                        songName={item.name}
                        songImage={item.album.images[1].url}
                        songInfo={
                          item.artists.length > 1
                            ? nameSongArtist(item)
                            : item.artists[0].name
                        }
                        songId={item.id}
                      />
                    );
                  }
                })}
              </div>
            </Suspense>
            <div
              className='nav-btn-container'
              style={{ display: loading ? 'none' : '' }}
            >
              <PrevIcon
                className={`prev-icon icon ${activePage === 1 ? 'active' : ''}`}
                type='button'
                onClick={() => {
                  if (firstDataIdx > 1) {
                    setFirstDataIdx((prev) => prev - dataSize);
                    setLastDataIdx((prev) => prev - dataSize);
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                prev
              </PrevIcon>
              {navBtnList.map((item, idx) => (
                <button
                  key={idx}
                  type='button'
                  className={item === activePage ? 'active' : ''}
                  onClick={() => {
                    setFirstDataIdx(dataSize * idx + 1);
                    setLastDataIdx(item * dataSize);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item}
                </button>
              ))}
              <NextIcon
                className={`next-icon icon ${activePage === 4 ? 'active' : ''}`}
                type='button'
                onClick={() => {
                  if (lastDataIdx < data.tracks.length) {
                    setFirstDataIdx((prev) => prev + dataSize);
                    setLastDataIdx((prev) => prev + dataSize);
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                next
              </NextIcon>
            </div>
          </div>
        </>
      ) : (
        <div className='empty-container'>
          <h1>Search for a song</h1>
          <i className='fas fa-box-open empty-icon'></i>
        </div>
      )}
    </div>
  );
};

export default SongsPage;
