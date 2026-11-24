import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import background from "../assets/backgrounds/login-collage.png";
import { checkValidData, getAuthErrorMessage } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { API_OPTIONS, IMG_BASE_URL } from "../utils/constants";



const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [posters, setPosters] = useState([]);
  const dispatch = useDispatch();

  // Load popular posters for the wall. If this fails, the static collage is shown instead.
  useEffect(() => {
    const getPosters = async () => {
      try {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
        if (!data.ok) throw new Error("TMDB error " + data.status);
        const jsonData = await data.json();
        setPosters(jsonData.results.map((m) => m.poster_path).filter(Boolean));
      } catch (error) {
        console.error("Login posters failed:", error);
      }
    };
    getPosters();
  }, []);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);


  const handleBtnClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      isSignUp,
      name.current?.value,
      confirmPassword.current?.value
    );

    setErrorMsg(message);
    if (message) return;
    if(isSignUp){
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        //updating profile with display name and photoURL
        updateProfile(user, {
          displayName: name.current.value,
                      photoURL: "https://avatars.githubusercontent.com/u/216164954?v=4"
        }).then(() => {
          dispatch(
            addUser(
              { uid: user.uid, 
                email: user.email, 
                displayName: user.displayName, 
                photoURL: user.photoURL }));
        }).catch((error) => {
          // An error occurred while updating the profile
          setErrorMsg(getAuthErrorMessage(error.code));
        });
        // console.log(user)
      })
      .catch((error) => {
        setErrorMsg(getAuthErrorMessage(error.code));
      });
    }else{
      //signin logic
      // Header's onAuthStateChanged handles a successful sign-in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .catch((error) => {
        setErrorMsg(getAuthErrorMessage(error.code));
      });
    }

  }

  const switchMode = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsSignUp((currentMode) => !currentMode);
      window.setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#08090b]">
      <Header />
      <div className={`grid min-h-screen ${isSignUp ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"}`}>
        <div className={`relative hidden min-h-screen overflow-hidden lg:block ${isSignUp ? "lg:order-2" : ""}`}>
          {posters.length > 0 ? (
            <PosterWall posters={posters} isSignUp={isSignUp} />
          ) : (
            <img
              className={`h-full w-full object-cover transition-[object-position,transform,opacity] duration-1000 ease-out ${
                isTransitioning ? "scale-105 opacity-70" : "scale-100 opacity-100"
              } ${isSignUp ? "object-right" : "object-left"}`}
              src={background}
              alt="Login Background"
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div
            className={`absolute inset-y-0 w-1/3 ${
              isSignUp
                ? "left-0 bg-gradient-to-l from-transparent to-[#08090b]"
                : "right-0 bg-gradient-to-r from-transparent to-[#08090b]"
            }`}
          />
        </div>
        <div className={`flex min-h-screen items-center justify-center px-6 py-28 transition-[opacity,transform] duration-500 ease-out sm:px-12 lg:px-16 ${isSignUp ? "lg:order-1" : ""} ${isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}>
          <form className="w-full max-w-[380px] space-y-6" 
          onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                {isSignUp ? "Join Movexa" : "Welcome to Movexa"}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {isSignUp ? "Create your account" : "Sign in to your account"}
              </h1>
              <p className="text-sm leading-6 text-zinc-400">
                {isSignUp
                  ? "Create your account and start your journey with everything you love."
                  : "Continue your journey with everything you love in one place."}
              </p>
            </div>
            <div className="space-y-3">
              {isSignUp && (
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-red-500 focus:bg-white/[0.08] focus:ring-4 focus:ring-red-500/10"
                  type="text"
                  placeholder="Full name"
                  ref={name}
                />
              )}
              <input
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-red-500 focus:bg-white/[0.08] focus:ring-4 focus:ring-red-500/10"
                type="email"
                placeholder="Email"
                ref={email}
              />
              <input
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-red-500 focus:bg-white/[0.08] focus:ring-4 focus:ring-red-500/10"
                type="password"
                placeholder="Password"
                ref={password}
              />
              {isSignUp && (
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 hover:border-white/20 focus:border-red-500 focus:bg-white/[0.08] focus:ring-4 focus:ring-red-500/10"
                  type="password"
                  placeholder="Confirm password"
                  ref={confirmPassword}
                />
              )}
                <p className="text-sm leading-6 text-red-500">{errorMsg}</p>
            </div>
            <button className="w-full rounded-lg bg-red-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20"
            onClick = {handleBtnClick}
            >
              {isSignUp ? "Create account" : "Sign-In"}
            </button>
            <p className="text-center text-xs text-zinc-500">
              {isSignUp ? "Already have an account?" : "New to Movexa?"}{" "}
              <button
                className="font-medium text-red-500 transition hover:text-red-400 focus:outline-none focus:underline"
                type="button"
                onClick={switchMode}
              >
                {isSignUp ? "Sign in" : "Sign up now"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

// Rows of posters on a wall tilted toward the form. Switching to sign up turns the wall and reverses the rows.
const PosterWall = ({ posters, isSignUp }) => {

  const rows = Array.from({ length: 11 }, (_, i) => {
    const start = (i * 4) % posters.length;
    const row = [...posters.slice(start), ...posters.slice(0, start)];
    return [...row, ...row]; // shown twice so the scroll loops without a gap
  });

  return (
    <div className="absolute inset-0 [perspective:1100px]" aria-hidden="true">
      <div
        className="absolute -inset-x-[40%] -inset-y-[45%] flex flex-col justify-center gap-[18px] transition-transform duration-[900ms] ease-[cubic-bezier(.6,0,.2,1)]"
        style={{
          transform: isSignUp
            ? "rotateY(22deg) rotateX(8deg) rotateZ(4deg)"
            : "rotateY(-22deg) rotateX(8deg) rotateZ(-4deg)",
          transformOrigin: isSignUp ? "0% 50%" : "100% 50%",
        }}
      >
        {rows.map((row, i) => {
          const goesLeft = (i % 2 === 0) !== isSignUp;
          return (
            <div
              key={i}
              className="poster-row flex w-max gap-[18px]"
              style={{
                animationName: "poster-slide",
                animationDuration: `${i % 2 ? 85 : 70}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: goesLeft ? "normal" : "reverse",
                animationDelay: `-${i * 11}s`,
              }}
            >
              {row.map((path, j) => (
                <img
                  key={j}
                  src={IMG_BASE_URL + "w342" + path}
                  alt=""
                  className="aspect-[2/3] w-[clamp(180px,16vh,320px)] rounded-xl object-cover shadow-[0_14px_34px_rgb(0_0_0_/_0.55)]"
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Login
