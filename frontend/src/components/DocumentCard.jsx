import { useNavigate } from "react-router-dom";

function DocumentCard({ document }) {

    const navigate = useNavigate();

    return (
        <div
            className="card"
            onClick={() => navigate(`/documents/${document._id}`)}
        >

            <h3>{document.originalName || document.name}</h3>

            <p>
                Category:{" "}
                {document.category?.name || "No Category"}
            </p>

            <p>
                Size: {document.size || 0} bytes
            </p>

        </div>
    );
}

export default DocumentCard;