import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CategoryCard from "../components/CategoryCard";
import API from "../services/api";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {

        try {

            const response = await API.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const createCategory = async (e) => {

        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Please enter category name");
            return;
        }

        try {

            await API.post("/categories", {
                name: categoryName
            });

            alert("Category created successfully");

            setCategoryName("");

            setShowCreateForm(false);

            getCategories();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create category"
            );
        }
    };

     // Rename Category
    const handleRename = async (categoryId, currentName) => {

        const newName = prompt(
            "Enter new category name:",
            currentName
        );

        if (!newName || !newName.trim()) {
            return;
        }

        try {

            const response = await API.put(
                `/categories/${categoryId}`,
                {
                    name: newName.trim()
                }
            );

            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category._id === categoryId
                        ? response.data.category
                        : category
                )
            );

            alert("Category renamed successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to rename category"
            );
        }
    };


    // Delete Category
    const handleDelete = async (categoryId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(
                `/categories/${categoryId}`
            );

            setCategories((prevCategories) =>
                prevCategories.filter(
                    (category) => category._id !== categoryId
                )
            );

            alert("Category deleted successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete category"
            );
        }
    };

    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <h1>Categories</h1>

                    <button
                        onClick={() =>
                            setShowCreateForm(!showCreateForm)
                        }
                    >
                        Create Category
                    </button>

                    <button
                        onClick={() => {
                            window.location.href = "/upload";
                        }}
                    >
                        Upload Document
                    </button>


                    {showCreateForm && (

                        <form
                            className="create-category-form"
                            onSubmit={createCategory}
                        >

                            <h3>Create Category</h3>

                            <input
                                type="text"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                            />

                            <button type="submit">
                                Create
                            </button>

                        </form>

                    )}


                    <div className="card-grid">

                        {categories.length === 0 ? (

                            <p>No categories found.</p>

                        ) : (

                            categories.map((category) => (

                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                    onRename={handleRename}
                                    onDelete={handleDelete}
                                />

                            ))

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Categories;