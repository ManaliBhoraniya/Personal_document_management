import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="sidebar">

            <h3>Menu</h3>

            <button onClick={() => navigate("/dashboard")}>
                Dashboard
            </button>

            <button onClick={() => navigate("/categories")}>
                Categories
            </button>

            <button onClick={() => navigate("/documents")}>
                Documents
            </button>

            <button onClick={() => navigate("/upload")}>
                Upload Document
            </button>

            <button onClick={() => navigate("/storage")}>
                Storage
            </button>

        </div>
    );
}

export default Sidebar;