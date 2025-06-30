import FeaturedEvents from "./components/FeaturedEvents"
import HeroSection from "./components/HeroSection"
import Testimonials from "./components/Testimonials"

function HomePage() {
  return (
    <div>
      <HeroSection/>
      <FeaturedEvents/>
      <Testimonials/>
    </div>
  )
}

export default HomePage