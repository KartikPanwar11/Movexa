import logoDark from "../assets/logo/movexa-dark.png";
import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import purple from "../assets/pfp/purple.png"

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();

  const handleSignOut = () =>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error")
    });
  }

    useEffect(()=>{
    const unsubscribe = 
    onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      await user.reload();
      const {uid,email,displayName, photoURL} = user;
      dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
      navigate("/browse");
    } else {
      // User is signed out
      dispatch(removeUser());
      navigate("/");
      }
    });

    return unsubscribe;
  }, []);


  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-14">
      <div className="shrink-0">
        <img className="h-11 w-auto sm:h-14" 
          src={logoDark} 
          alt="Movexa logo" />
      </div>
      
      {user &&<div className="flex items-center gap-3 sm:gap-4">
        <img
        className="h-10 w-10 rounded-md object-cover ring-2 ring-white/20 sm:h-11 sm:w-11"
        src={purple}
        alt="Profile picture" />
        <button 
        onClick={handleSignOut}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/35 bg-white/15 px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.45),0_8px_30px_rgb(0_0_0_/_0.25)] backdrop-blur-xl transition duration-300 hover:border-white/60 hover:bg-white/25 hover:shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.65),0_10px_35px_rgb(0_0_0_/_0.35)] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-900 sm:px-4 sm:py-2.5 sm:text-sm">
          <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <span className="absolute -inset-y-8 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[500%]" />
          Sign Out
        </button>
      </div>}
    </div>

  )
}

export default Header