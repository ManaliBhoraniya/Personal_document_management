import { useNavigate } from "react-router-dom";

function CategoryCard({ category,onRename, onDelete}) {

    const navigate = useNavigate();

    return (
        <div
            className="card"
            onClick={() => navigate(`/categories/${category._id}`)}
        >

            <h3>{category.name}</h3>

            <p>
                Click to view documents
            </p>

            <div className="category-actions">

                <button
                    className="rename-button"
                    onClick={(e) => {

                        e.stopPropagation();

                        onRename(
                            category._id,
                            category.name
                        );

                    }}
                >
                    Rename
                </button>


                <button
                    className="delete-button"
                    onClick={(e) => {

                        e.stopPropagation();

                        onDelete(category._id);

                    }}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default CategoryCard;