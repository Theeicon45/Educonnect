
import BlogSpot from "../Components/BlogSpot";
import Footer from "../Components/Footer";
import LandingNav from "../Components/LandingNav";
import LandingSlider from "../Components/LandingSlider";


const Landing = () => {
  return (
    <>
      <div className="w-full">
        <LandingNav/>
        <LandingSlider/>
        <BlogSpot/>
        <Footer/>
        
      </div>
       
    </>
  )
}

export default Landing
