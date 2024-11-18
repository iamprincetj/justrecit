import { signInWithPopup, User } from "firebase/auth";
import { auth, db, provider } from "../config/firebase";
import { NotificationAction, SpotifyData } from "../type";
import { collection, getDocs } from "firebase/firestore";

export const signInGoogle = async () => {
  await signInWithPopup(auth, provider);
};

export const nameSongArtist = (val: SpotifyData) => {
  let artist = "";
  val.artists.forEach((item, idx) => {
    if (idx === 0) {
      artist += item.name + " feat ";
    } else if (idx === val.artists.length - 1) {
      artist += item.name;
    } else {
      artist += item.name + " and ";
    }
  });

  return artist;
};

export const addNotification = (
  message: string,
  dispatch: React.Dispatch<NotificationAction>
) => {
  dispatch({
    type: "ADD_DATA",
    payload: { notificationMessage: message },
  });
};

export const handleLoad = () => {
  const modalElement: HTMLDivElement | null = document.querySelector(".modal");
  if (modalElement) {
    modalElement.style.display = "none";
  }
};

export const getFavoriteSong = async (user: User | null) => {
  const favoriteSongRef = collection(db, "favoriteSongs");
  const querySnapshot = await getDocs(favoriteSongRef);
  const userFavorite = querySnapshot.docs.filter(
    (doc) => doc.data().userId === user?.uid
  );
  return JSON.parse(JSON.stringify(userFavorite.map((doc) => doc.data())));
};
