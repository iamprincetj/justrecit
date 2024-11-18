import { Link, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import '../assets/css/Main.css';
import mainImage from '/images/music-img1.jpeg';
const FlipCard = lazy(() => import('./FlipCard'));
const XIcon = lazy(() => import('@mui/icons-material/X'));
const FacebookOutlinedIcon = lazy(() => import('@mui/icons-material/FacebookOutlined'));
const LinkedInIcon = lazy(() => import('@mui/icons-material/LinkedIn'));

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className='main-container'>
      <img src={mainImage} alt='background image' className='bg-image' />
      <div className='social-media-icon'>
        <Suspense fallback={<div>loading...</div>}>
        <Link to='https://facebook.com/tochukwu.nwanze.1' target='_blank'>
          <FacebookOutlinedIcon className='facebook social-icon' />
        </Link>
        <Link
          to='https://www.linkedin.com/in/justin-nwanze-7983b2254/'
          target='_blank'
        >
          <LinkedInIcon className='linkedin social-icon' />
        </Link>
        <Link to='https://x.com/Iam_princetj' target='_blank'>
          <XIcon className='twitter social-icon' />
        </Link>
        </Suspense>
      </div>
      <div className='main-content'>
        <div className='upper-main-content'>
          <div className='text-content'>
            <h1 className='heading'>Keep the Mood Going!</h1>
            <h2 className='sub-heading'>
              Find more songs similar to your favorite
            </h2>
          </div>
          <button
            type='button'
            className='try-it'
            onClick={() => navigate('/songs')}
          >
            Try it Now
          </button>
        </div>
        <img
          src='images/headphones.png'
          alt='headphone with cord witten as music'
          className='headphone-icon'
        />

        <div id='key-features'>
          <div className='feature'>
            <div className='feature-content'>
              <img
                src='images/search-bar-icon.svg'
                alt='search bar icon'
                className='search-bar-icon'
              />
              <h3>Input your Fave song</h3>
              <p>
                The search feature is user-friendly and easy to use. You can
                search for any song you want by the song's name or the artist.{' '}
                <span>
                  The search results will display songs similar to that of your
                  query
                </span>
              </p>
            </div>
          </div>
          <div className='feature'>
            <div className='feature-content'>
              <img
                src='images/Google-Symbol.png'
                alt='search bar icon'
                className='search-bar-icon'
              />
              <h3>Sign in with Google</h3>
              <p>
                The sign in with google feature is optional. This means using
                this site doesn't require you signing in to use its features.
              </p>
            </div>
          </div>
          <div className='feature'>
            <div className='feature-content'>
              <img
                src='images/search-bar-icon.svg'
                alt='search bar icon'
                className='search-bar-icon'
              />
              <h3>Sign in to Add to Favorite</h3>
              <p>
                The Sign in feature is require only when you need to add to
                favorite, remove from favorite or see your added favorites
              </p>
            </div>
          </div>
          <div className='feature'>
            <div className='feature-content'>
              <img
                src='images/search-bar-icon.svg'
                alt='search bar icon'
                className='search-bar-icon'
              />
              <h3>Listen to Song</h3>
              <p>
                The listen to song feature is user-friendly and easy to use. You
                can listen to the recommended songs for your searched songs.
              </p>
            </div>
          </div>

          <div className='feature'>
            <div className='feature-content'>
              <img
                src='images/add-to-favorites-icon.png'
                alt='search bar icon'
                className='search-bar-icon'
              />
              <h3>Add to Favorite</h3>
              <p>
                The Add to Favorite feature can be used only when logged in.
                After listening to a recommended song, you add them to your
                favorite
              </p>
            </div>
          </div>
        </div>

        <div id='services'>
          <img
            src='images/spotify.svg'
            alt='spotify icon'
            className='spotify-icon'
          />
          <div className='services-content'>
            <h3>So easy to use</h3>
            <p>
              JustReciT is powered by Spotify's API, <a href='#'>Spotify</a> is
              a music streaming service that provides access to millions of
              songs, podcasts, and videos from artists all over the world.
              JustReciT is easy to use. You can start by clicking on this{' '}
              <a href='#'>“Try it now”</a> button
            </p>
          </div>
        </div>

        <div id='artist'>
          <Suspense fallback={<div>loading</div>}>
            <FlipCard
              artistName={`Justin Bieber`}
              artistQuote={`
              once said, “If you don’t dream big, then there’s no use in
                    dreaming. If you don’t have faith, there’s nothing worth
                    believing.” This quote is a reminder that having faith and
                    dreaming big are essential to achieving your goals. It’s
                    important to believe in yourself and your abilities, and to
                    never give up on your dreams.`}
              artistImg={`images/01Bieber.png`}
            />
            <FlipCard
              artistName={`Juice Wrld`}
              artistQuote={`once said, “You can do anything that you put your mind to.
                    Period.” This quote is a reminder that with determination
                    and hard work, you can achieve anything you set your mind
                    to. It’s important to believe in yourself and your
                    abilities, and to never give up on your dreams.`}
              artistImg={`images/juice-wrld.jpeg`}
            />
            <FlipCard
              artistQuote={`once said, “I didn’t have nothin’ going for me… school,
                home… until I found something I loved, which was music, and
                that changed everything.” This quote is a reminder that
                finding something you love can change your life. It’s
                important to pursue your passions and never give up on your
                dreams.`}
              artistName={'Eminem'}
              artistImg={`images/eminem.jpeg`}
            />
          </Suspense>
        </div>
        <img
          src='images/headphones.png'
          alt='headphone with cord witten as music'
          className='headphone-icon'
        />
      </div>
    </div>
  );
};

export default Main;
