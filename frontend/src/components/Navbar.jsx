import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [showSearchMenu, setShowSearchMenu] = useState(false);


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };


    return (

        <div className="navbar">

            <h2>
                Personal Document Manager
            </h2>


            {/* Search Dropdown */}

            <div className="search-dropdown">

                <button
                    className="search-menu-button"
                    onClick={() =>
                        setShowSearchMenu(
                            !showSearchMenu
                        )
                    }
                >
                    🔍 Search ▾
                </button>


                {showSearchMenu && (

                    <div className="search-menu">

                        <button
                            onClick={() => {
                                navigate(
                                    "/search?type=documents"
                                );

                                setShowSearchMenu(false);
                            }}
                        >
                            📄 Documents
                        </button>


                        <button
                            onClick={() => {
                                navigate(
                                    "/search?type=categories"
                                );

                                setShowSearchMenu(false);
                            }}
                        >
                            📁 Categories
                        </button>

                    </div>

                )}

            </div>


            <button
                onClick={() =>
                    navigate("/about")
                }
            >
                About Us
            </button>


            <button
                onClick={() =>
                    navigate("/contact")
                }
            >
                Contact Us
            </button>


            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default Navbar;

