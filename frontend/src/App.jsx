import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import CategoryDocuments from "./pages/CategoryDocuments";
import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
import Storage from "./pages/Storage";
import DocumentViewer from "./pages/DocumentViewer";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./pages/Contactus";
import Search from "./pages/Search";

function App() {

    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/categories" element={<Categories />} />

            <Route path="/search" element={<Search />} />

            <Route
                path="/categories/:categoryId"
                element={<CategoryDocuments />}
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="/documents" element={<Documents />} />

            <Route path="/upload" element={<UploadDocument />} />

            <Route path="/storage" element={<Storage />} />

            <Route
                path="/documents/:documentId"
                element={<DocumentViewer />}
            />

        </Routes>
    );
}

export default App;