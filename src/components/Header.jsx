import logo from "../assets/logo/movexa-dark.png";

const Header = () => {
  return (
    <div className="absolute left-6 top-6 z-20 sm:left-10 sm:top-8">
      <img className="h-12 w-auto sm:h-14" src={logo} alt="Movexa logo" />
    </div>
  )
}

export default Header