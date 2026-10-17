import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AboutUs() {
    return (
        <div>
            <Navbar />

            <div className="layout">
                <Sidebar />

                <main className="content">

                    <div className="about-container">

                        <div className="about-hero">
                            <h1>About Personal Document Manager</h1>

                            <p>
                                Organize, manage and access your important
                                documents easily from one place.
                            </p>
                        </div>

                        <div className="about-card">

                            <h2>What is Personal Document Manager?</h2>

                            <p>
                                Personal Document Manager is a document
                                management application designed to help users
                                store, organize and manage their personal
                                documents in a simple and convenient way.
                            </p>

                            <p>
                                Users can upload documents, organize them
                                into categories, search for documents and
                                keep track of their storage usage.
                            </p>

                        </div>

                        <div className="about-features">

                            <div className="feature-card">
                                <div className="feature-icon">📁</div>

                                <h3>Organize Documents</h3>

                                <p>
                                    Create categories and keep your documents
                                    organized in one place.
                                </p>
                            </div>


                            <div className="feature-card">
                                <div className="feature-icon">🔍</div>

                                <h3>Search Easily</h3>

                                <p>
                                    Quickly find documents by their filename
                                    or category.
                                </p>
                            </div>


                            <div className="feature-card">
                                <div className="feature-icon">☁️</div>

                                <h3>Manage Storage</h3>

                                <p>
                                    Monitor your used and remaining storage
                                    space at any time.
                                </p>
                            </div>


                            <div className="feature-card">
                                <div className="feature-icon">🤖</div>

                                <h3>AI Assistance</h3>

                                <p>
                                    Ask questions about your documents and
                                    get useful information from them.
                                </p>
                            </div>

                        </div>

                        <div className="about-card">

                            <h2>Our Goal</h2>

                            <p>
                                Our goal is to provide a simple and user-friendly
                                platform where users can manage their important
                                documents efficiently without unnecessary
                                complexity.
                            </p>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default AboutUs;

