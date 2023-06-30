import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { SignUp } from "./pages/signup";
import Explore from "./pages/explore";
import Generate from "./pages/generate";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import Profile from "./pages/profile";

// Create your first component
const Layout = () => {
  // The basename is used when your project is published in a subdirectory and not in the root of the domain
  // You can set the basename on the .env file located at the root of this project, e.g., BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
    return <BackendURL />;
  }

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/single/:id" element={<Single />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);