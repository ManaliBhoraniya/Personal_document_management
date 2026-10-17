import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("User");

    const [dashboard, setDashboard] = useState({
        totalDocuments: 0,
        totalCategories: 0,
        storageUsed: 0,
        storageRemaining: 0
    });

    // Get logged-in user's name
    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {

            try {

                const user =
                    JSON.parse(storedUser);

                setUserName(
                    user.name || "User"
                );

            } catch (error) {

                console.log(
                    "Error reading user data:",
                    error
                );

            }
        }

    }, []);

    useEffect(() => {

        const getDashboard = async () => {

            try {

                const response =
                    await API.get("/documents/dashboard");

                setDashboard(response.data);

            } catch (error) {

                console.log(error);

            }
        };

        getDashboard();

    }, []);

    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <div className="welcome-section">

                    <h1>
                        Welcome, {userName}! 👋
                    </h1>

                    </div>

                    <h2 className="dashboard-title">
                        Dashboard
                    </h2>

                    <div className="dashboard-grid">

                        <div
                            className="dashboard-card"
                            onClick={() => navigate("/documents")}
                        >
                            <h2>{dashboard.totalDocuments}</h2>
                            <p>Total Documents</p>
                        </div>

                        <div
                            className="dashboard-card"
                            onClick={() => navigate("/categories")}
                        >
                            <h2>{dashboard.totalCategories}</h2>
                            <p>Total Categories</p>
                        </div>

                        <div
                            className="dashboard-card"
                            onClick={() => navigate("/storage")}
                        >
                            <h2>
                                {formatBytes(dashboard.storageUsed)}
                            </h2>
                            <p>Storage Used</p>
                        </div>

                        <div
                            className="dashboard-card"
                            onClick={() => navigate("/storage")}
                        >
                            <h2>
                                {formatBytes(
                                    dashboard.storageRemaining
                                )}
                            </h2>
                            <p>Storage Remaining</p>
                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

function formatBytes(bytes) {

    if (!bytes) return "0 MB";

    const mb = bytes / (1024 * 1024);

    if (mb < 1024) {
        return mb.toFixed(3) + " MB";
    }

    return (mb / 1024).toFixed(3) + " GB";
}

export default Dashboard;