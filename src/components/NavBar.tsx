import "../assets/css/NavBar.css";
import { auth } from "../config/firebase";
import { signOut, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { handleLoad, signInGoogle } from "../utils/helperFunc";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotificationValue } from "../utils/contexts/contextNeeded";
import { useEffect } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const notificationMessage = useNotificationValue().notificationMessage;
  const [user] = useAuthState(auth) as [
    User | null,
    boolean,
    Error | undefined
  ];
  const location = useLocation();
  useEffect(() => {
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const navListElement: HTMLUListElement | null = document.querySelector(
      ".nav-list-container .list-items"
    );
    if (navListElement) {
      if (location.pathname !== "/") {
        navListElement.style.visibility = "hidden";
      } else {
        navListElement.style.visibility = "visible";
      }
    }
  }, [location.pathname]);

  const photoURL = user?.photoURL;
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <header className='header-navbar'>
      {notificationMessage && (
        <div className='notification-msg'>
          <span> {notificationMessage} </span>
        </div>
      )}
      <nav className='navbar'>
        <h1 className='logo' onClick={() => navigate("/")}>
          JUSTRECIT.
        </h1>
        <div className='nav-list-container'>
          <ul className='list-items'>
            <li className='list-item'>
              <a href='#'>ARTIST'S QUOTES</a>
            </li>
            <li className='list-item'>
              <a href='#'>KEY FEATURES</a>
            </li>
            <li className='list-item'>
              <a href='#'>SERVICES</a>
            </li>
            <li className='list-item'>
              <a href='#'>CONTACT</a>
            </li>
            <li className='list-item'>
              <a href='#'>ABOUT</a>
            </li>
          </ul>
          <div className='auth-container'>
            {user ? (
              <>
                <Link to={`/my-favorite/${user.uid}`} className='fave-btn'>
                  <button type='button'>My Favorite</button>
                </Link>
                <button
                  type='button'
                  className='auth-btn'
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
                <div className='user-info'>
                  {photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={`${user.displayName} profile`}
                      className='user-profile'
                      width={20}
                      height={20}
                    />
                  ) : null}
                </div>
              </>
            ) : (
              <div className='sign-in-container'>
                <button
                  type='button'
                  className='auth-btn sign-in-btn'
                  onClick={signInGoogle}
                >
                  <GoogleIcon className='google-icon' /> <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className='modal'>
        <div className='modal-content'>
          <h1>justrecit . . .</h1>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
