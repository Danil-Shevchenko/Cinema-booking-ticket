import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";



function Layout({search,setSearch}) {  
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Outlet></Outlet>
      <Footer/>
    </>
  );
}

export default Layout;