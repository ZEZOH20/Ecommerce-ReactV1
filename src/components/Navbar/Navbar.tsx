import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextValue";

const loggedNavbarLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Cart",
    path: "/cart",
  },
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "Categories",
    path: "/categories",
  },
];

const notLoggedNavbarLinks = [
  {
    title: "Signin",
    path: "/signin",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);
  const links = token ? loggedNavbarLinks : notLoggedNavbarLinks;

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/signin");
  }

  return (
    <header>
      <nav>
        <ul className="bg-blue-500 flex justify-center items-center h-15 relative">
          {links.map((link) => (
            <li key={link.path} className="text-xl font-bold text-white mr-4">
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}

          {token && (
            <li className="text-xl font-bold text-white mr-4 absolute right-5">
              <button type="button" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
