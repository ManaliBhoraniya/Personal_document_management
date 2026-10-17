import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function DocumentViewer() {

    const { documentId } = useParams();

    const [document, setDocument] = useState(null);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getDocument = async () => {

            try {

                const response =
                    await API.get(
                        `/documents/${documentId}`
                    );

                setDocument(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        getDocument();

    }, [documentId]);

    const askQuestion = async () => {

        if (!question.trim()) {
            return;
        }

        try {

            setLoading(true);

           const response =await API.post(
                    `/ai/ask/${documentId}`,
                    {
                        question
                    }
             );

            setAnswer(
                response.data.answer
            );

        } catch (error) {

            console.log(error);

            setAnswer(
                "Unable to get answer."
            );

        } finally {

            setLoading(false);
        }
    };

    if (!document) {

        return <p>Loading document...</p>;

    }

    return (

        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <h1>
                        {document.originalName ||
                            document.name}
                    </h1>

                    {/* Document */}

                    <div className="document-viewer">

                        {document.fileType === "application/pdf" ? (

                        <iframe
                            src={document.fileUrl}
                            title="PDF Document"
                        />

                        ) : document.fileType?.startsWith("image/") ? (

                        <img
                            src={document.fileUrl}
                            alt={document.filename}
                            className="document-image"
                        />

                        ) : (

                        <div className="document-open">

                            <p>
                                Preview is not available for this file type.
                            </p>

                            <a
                                href={document.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open Document
                            </a>

                        </div>

                        )}

                    </div>

                    {/* Chatbot */}

                    <div className="chatbot">

                        <h2>
                            Ask about this document
                        </h2>

                        <textarea
                            placeholder="Ask a question..."
                            value={question}
                            onChange={(e) =>
                                setQuestion(e.target.value)
                            }
                        />

                        <button
                            onClick={askQuestion}
                            disabled={loading}
                        >
                            {loading
                                ? "Thinking..."
                                : "Ask"}
                        </button>

                        {answer && (

                            <div className="answer">

                                <h3>Answer</h3>

                                <p>
                                    {answer}
                                </p>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default DocumentViewer;