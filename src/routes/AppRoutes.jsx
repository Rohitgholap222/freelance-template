import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../components/Contact";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Menu from "../components/Menu";
import Error from "../pages/Error";

function AppRoutes()
{
    return(
        <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="services" element={<Services />} />
                <Route path="menu" element={<Menu />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default AppRoutes
