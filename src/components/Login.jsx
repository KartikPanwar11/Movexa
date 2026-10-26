import { useRef, useState } from "react";
import Header from "./Header";
import background from "../assets/backgrounds/login-collage.png";
import {checkValidData} from "../utils/Validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/Firebase'


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null)

  const email = useRef(null);
  const password = useRef(null);


  const handleBtnClick = () =>{
    // console.log(email.current.value)
    // console.log(password.current.value)
  const message = checkValidData(email.current.value,
                  password.current.value);
  
  setErrorMsg(message);
  //  console.log(msg)
    if(message) return;
    if(isSignUp){
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode+ "-" +errorMessage)
      });
    }else{
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode+ "-" +errorMessage)
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
          <img
            className={`h-full w-full object-cover transition-[object-position,transform,opacity] duration-1000 ease-out ${
              isTransitioning ? "scale-105 opacity-70" : "scale-100 opacity-100"
            } ${isSignUp ? "object-right" : "object-left"}`}
            src={background}
            alt="Login Background"
          />
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

export default Login