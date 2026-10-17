import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Search() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const type = searchParams.get("type") || "documents";

    const [searchText, setSearchText] = useState("");

    const [documents, setDocuments] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        getData();

        setSearchText("");

    }, [type]);


    const getData = async () => {

        try {

            setLoading(true);

            if (type === "documents") {

                const response = await API.get("/documents");

                setDocuments(response.data);

            } else {

                const response = await API.get("/categories");

                setCategories(response.data);

            }

        } catch (error) {

            console.error("Search error:", error);

        } finally {

            setLoading(false);

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


    const filteredDocuments = documents.filter((document) => {

        const filename =
            document.filename?.toLowerCase() || "";

        return filename.includes(
            searchText.toLowerCase()
        );

    });


    const filteredCategories = categories.filter((category) => {

        const name =
            category.name?.toLowerCase() || "";

        return name.includes(
            searchText.toLowerCase()
        );

    });


    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <h1>
                        Search {type === "documents"
                            ? "Documents"
                            : "Categories"}
                    </h1>


                    {/* Search Box */}

                    <div className="search-container">

                        <div className="search-box">

                            <span className="search-icon">
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder={
                                    type === "documents"
                                        ? "Search documents..."
                                        : "Search categories..."
                                }
                                value={searchText}
                                onChange={(e) =>
                                    setSearchText(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    {loading ? (

                        <p>Loading...</p>

                    ) : type === "documents" ? (

                        /* ================================
                           DOCUMENT RESULTS
                        ================================= */

                        filteredDocuments.length === 0 ? (

                            <p className="no-results">
                                No documents found.
                            </p>

                        ) : (

                            <div className="card-grid">

                                {filteredDocuments.map(
                                    (document) => (

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

                                        </div>

                                    )
                                )}

                            </div>

                        )

                    ) : (

                        /* ================================
                           CATEGORY RESULTS
                        ================================= */

                        filteredCategories.length === 0 ? (

                            <p className="no-results">
                                No categories found.
                            </p>

                        ) : (

                            <div className="card-grid">

                                {filteredCategories.map(
                                    (category) => (

                                        <div
                                            className="card"
                                            key={category._id}
                                            onClick={() =>
                                                navigate(
                                                    `/categories/${category._id}`
                                                )
                                            }
                                        >

                                            <h3>
                                                {category.name}
                                            </h3>

                                            <p>
                                                Click to view
                                                documents
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        )

                    )}

                </main>

            </div>

        </div>
    );
}

export default Search;

