import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function UploadDocument() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);


    // Get all categories
    useEffect(() => {

        const getCategories = async () => {

            try {

                setLoadingCategories(true);

                const response = await API.get("/categories");

                // If backend returns array directly
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                }

                // If backend returns { categories: [...] }
                else if (Array.isArray(response.data.categories)) {
                    setCategories(response.data.categories);
                }

            } catch (error) {

                console.error("Error loading categories:", error);

                alert(
                    error.response?.data?.message ||
                    "Failed to load categories"
                );

            } finally {

                setLoadingCategories(false);

            }
        };

        getCategories();

    }, []);


    // Upload document
    const handleUpload = async (e) => {

        e.preventDefault();


        if (!file) {
            alert("Please select a file");
            return;
        }


        if (!categoryId) {
            alert("Please select a category");
            return;
        }


        try {

            setLoading(true);

            const formData = new FormData();

            // File
            formData.append("file", file);

            // Category ID
            formData.append("category", categoryId);


            const response = await API.post(
                "/documents/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );


            alert("Document uploaded successfully");


            // Go to category page
            if (categoryId) {

                navigate(`/categories/${categoryId}`);

            } else {

                navigate("/categories");

            }


        } catch (error) {

            console.error("Upload error:", error);

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <h1>Upload Document</h1>


                    <form
                        className="upload-form"
                        onSubmit={handleUpload}
                    >


                        {/* Select File */}

                        <label>
                            Select Document
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.txt,.jpg,.jpeg,.png"
                            onChange={(e) =>
                                setFile(e.target.files[0])
                            }
                            required
                        />


                        {file && (

                            <p>
                                Selected file:
                                {" "}
                                {file.name}
                            </p>

                        )}


                        {/* Select Category */}

                        <label>
                            Category
                        </label>


                        {loadingCategories ? (

                            <p>Loading categories...</p>

                        ) : categories.length === 0 ? (

                            <p>
                                No categories found. Please create a category first.
                            </p>

                        ) : (

                            <select
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    -- Select Category --
                                </option>


                                {categories.map((category) => (

                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>

                                ))}

                            </select>

                        )}


                        {/* Upload Button */}

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                loadingCategories ||
                                categories.length === 0
                            }
                        >

                            {loading
                                ? "Uploading..."
                                : "Upload Document"}

                        </button>


                    </form>

                </main>

            </div>

        </div>
    );
}

export default UploadDocument;