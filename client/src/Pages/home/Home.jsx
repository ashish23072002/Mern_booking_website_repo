import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Navbar from "../../components/navbar/Navbar"
import PropertList from "../../components/propertList/PropertList"
import "./home.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Brouse By Property Type</h1>
        <PropertList />
        <h1 className="homeTitle">Home Guest Love</h1>
        <FeaturedProperties />
      </div>
      <MailList />
      <div className="homeContainer">
        <Footer />
      </div>
    </div>
     
  )
}

export default Home
