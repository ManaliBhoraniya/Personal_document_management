import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ContactUs() {

    return (
        <div>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="info-page">

                    <div className="info-hero">

                        <h1>Contact Us</h1>

                        <p>
                            Have a question, suggestion or need help?
                            We are here to help.
                        </p>

                    </div>


                    <div className="info-content">

                        <div className="info-card">

                            <div className="info-icon">
                                📧
                            </div>

                            <h2>Email</h2>

                            <p>
                                personaldoc@gmail.com
                            </p>

                        </div>


                        <div className="info-card">

                            <div className="info-icon">
                                📞
                            </div>

                            <h2>Phone</h2>

                            <p>
                                +91 9876543210
                            </p>

                        </div>


                        <div className="info-card">

                            <div className="info-icon">
                                📍
                            </div>

                            <h2>Location</h2>

                            <p>
                                India
                            </p>

                        </div>

                    </div>


                    <div className="info-description">

                        <h2>Get in Touch</h2>

                        <p>
                            If you have any questions, suggestions or feedback
                            about Personal Document Manager, feel free to contact us.
                        </p>

                        <p>
                            You can contact us regarding document management,
                            categories, storage, document search or any other
                            feature of the application.
                        </p>

                        <p>
                            We appreciate your feedback and suggestions as they
                            help us improve the application and provide a better
                            user experience.
                        </p>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default ContactUs;