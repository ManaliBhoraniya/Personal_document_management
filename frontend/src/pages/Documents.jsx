import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Documents() {

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getDocuments();
    }, []);

    const getDocuments = async () => {

        try {

            const response = await API.get("/documents");

            setDocuments(response.data);

        } catch (error) {

            console.error("Error fetching documents:", error);

        } finally {

            setLoading(false);

        }
    };

        const handleRename = async (documentId, currentName) => {

        const newName = prompt(
            "Enter new document name:",
            currentName
        );

        if (!newName || !newName.trim()) {
            return;
        }

        try {

            const response = await API.put(
                `/documents/${documentId}`,
                {
                    filename: newName.trim()
                }
            );

            setDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc._id === documentId
                        ? response.data.document
                        : doc
                )
            );

            alert("Document renamed successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to rename document"
            );
        }
    };


        const handleDelete = async (documentId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(
                `/documents/${documentId}`
            );

            setDocuments((prevDocuments) =>
                prevDocuments.filter(
                    (doc) => doc._id !== documentId
                )
            );

            alert("Document deleted successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete document"
            );
        }
    };


    const formatFileSize = (bytes) => {

        if (!bytes || bytes === 0) {
            return "0 Bytes";
        }

        const units = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];

        const index = Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

        return (
            parseFloat(
                (bytes / Math.pow(1024, index)).toFixed(2)
            ) +
            " " +
            units[index]
        );
    };


    if (loading) {
        return <h2>Loading documents...</h2>;
    }


    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <h1>All Documents</h1>

                    {documents.length === 0 ? (

                        <p>No documents found.</p>

                    ) : (

                        <div className="card-grid">

                            {documents.map((document) => (

                                <div
                                    className="document-card"
                                    key={document._id}
                                    onClick={() =>
                                        navigate(
                                            `/documents/${document._id}`
                                        )
                                    }
                                >

                                    <h3>
                                        {document.filename}
                                    </h3>

                                    <p>
                                        Category:{" "}
                                        {document.category?.name ||
                                            "No Category"}
                                    </p>

                                    <p>
                                        Size:{" "}
                                        {formatFileSize(
                                            document.fileSize
                                        )}
                                    </p>

                                    {/* Document actions */}

                                    <div className="document-actions">

                                        <button
                                            className="rename-button"
                                            onClick={(event) =>
                                                handleRename(
                                                    document._id,
                                                    document.filename,
                                                    event
                                                )
                                            }
                                        >
                                            Rename
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={(event) =>
                                                handleDelete(
                                                    document._id,
                                                    event
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default Documents;