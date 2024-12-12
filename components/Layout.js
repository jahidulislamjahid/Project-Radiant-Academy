import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <div className="max-w-[2160px] mx-auto">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default Layout;