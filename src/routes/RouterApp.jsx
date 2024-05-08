import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "../layout/NavBar"
import Footer from "../layout/Footer"

import Home from "../pages/Home"
import Upload from "../pages/Upload"
import Contact from "../pages/Contact"
import About from "../pages/About"
import Detail from "../pages/Detail"


function RouterApp() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<Detail />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default RouterApp