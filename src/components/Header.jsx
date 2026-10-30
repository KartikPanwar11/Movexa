import logo from "../assets/logo/movexa-dark.png";
import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigate("/")

    }).catch((error) => {
      navigate("/error")
    });
  }


  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-14">
      <div className="shrink-0">
        <img className="h-11 w-auto sm:h-14" src={logo} alt="Movexa logo" />
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <img
        className="h-10 w-10 rounded-md object-cover ring-2 ring-white/20 sm:h-11 sm:w-11"
        src="https://occ-0-2483-3647.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABU9EUlNusnlsjzEuTAFjVcvX6S1s3Y_o7Jl25L-TNSNQFgGSSjy5AP14xls_pIAljuEQFUDk84swNma8IW_CvO0mqSFRz3M5Z6MI.png?r=bd7" alt="" />
        <button 
        onClick={handleSignOut}
        className="rounded-lg border border-purple-400/40 bg-purple-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:border-purple-300/60 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/60 sm:px-4 sm:py-2.5 sm:text-sm">
          Sign Out
        </button>
      </div>
    </div>

  )
}

export default Header