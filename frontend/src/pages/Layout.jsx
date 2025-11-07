import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-poppins ">
      <ScrollToTop/>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content */}
      {/* Add margin-top equal to the Navbar height instead of big arbitrary padding */}
      <main className="flex-grow flex flex-col justify-start mt-10 sm:mt-14 md:mt-16 mb-0">
        <Outlet />
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
