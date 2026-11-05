import logoDark from "../assets/logo/movexa-dark.png";
import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import purple from "../assets/pfp/purple.png"

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const handleAiSearchClick = () => {
    
  }


  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-14">
      <div className="shrink-0">
        <img className="h-11 w-auto sm:h-14" 
          src={logoDark} 
          alt="Movexa logo" />
      </div>
      
      {user &&<div className="flex items-center gap-3 sm:gap-4">
        <button
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/35 bg-white/15 px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.45),0_8px_30px_rgb(0_0_0_/_0.25)] backdrop-blur-xl transition duration-300 hover:border-white/60 hover:bg-white/25 hover:shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.65),0_10px_35px_rgb(0_0_0_/_0.35)] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-900 sm:px-4 sm:py-2.5 sm:text-sm"
        onClick={handleAiSearchClick}
        >
          <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <span className="absolute -inset-y-8 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[500%]" />
          <svg
            aria-hidden="true"
            className="relative left-[-1px] top-[1px] h-4 w-4 shrink-0 text-violet-200"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.5 14.1 9.9 21.5 12l-7.4 2.1L12 21.5l-2.1-7.4L2.5 12l7.4-2.1L12 2.5Z" />
            <path d="m19 2 .7 2.3L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7L19 2Z" />
          </svg>
          Ask AI
        </button>
        <div
          className="group/profile relative"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-expanded={showProfileMenu}
            aria-label="Open profile menu"
            className="rounded-xl border border-white/25 bg-white/10 p-1 shadow-[0_8px_24px_rgb(0_0_0_/_0.3)] backdrop-blur-md transition duration-300 hover:border-white/50 hover:bg-white/20 hover:shadow-[0_10px_28px_rgb(0_0_0_/_0.4)] focus:outline-none focus:ring-2 focus:ring-violet-300/80 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            <img
              className="h-9 w-9 rounded-lg object-cover sm:h-10 sm:w-10"
              src={purple}
              alt="Profile picture"
            />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 top-full w-36 pt-3">
              <button
                onClick={handleSignOut}
                className="group relative inline-flex w-full items-center gap-3 overflow-hidden rounded-xl border border-white/20 bg-zinc-900/80 px-3 py-2.5 text-left text-xs font-semibold text-white shadow-[0_12px_30px_rgb(0_0_0_/_0.35)] backdrop-blur-xl transition duration-300 hover:border-violet-300/50 hover:bg-zinc-800/90 focus:outline-none focus:ring-2 focus:ring-violet-300/70"
              >
                <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-violet-200/80 to-transparent" />
                <svg aria-hidden="true" className="h-4 w-4 text-violet-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 12h9m0 0-3-3m3 3-3 3" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>}
    </div>

  )
}

export default Header