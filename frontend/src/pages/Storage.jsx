
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Storage() {

    const [storage, setStorage] = useState({
        storageLimit: 0,
        storageUsed: 0,
        storageRemaining: 0
    });

    useEffect(() => {

        const getStorage = async () => {

            try {

                const response =
                    await API.get("/documents/storage");

                setStorage(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        getStorage();

    }, []);

    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <h1>Storage</h1>

                    <div className="dashboard-grid">

                        <div className="dashboard-card">

                            <h2>
                                {formatBytes(storage.storageLimit)}
                            </h2>

                            <p>Total Storage</p>

                        </div>

                        <div className="dashboard-card">

                            <h2>
                                {formatBytes(storage.storageUsed)}
                            </h2>

                            <p>Used Storage</p>

                        </div>

                        <div className="dashboard-card">

                            <h2>
                                {formatBytes(storage.storageRemaining)}
                            </h2>

                            <p>Remaining Storage</p>

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

export default Storage;

