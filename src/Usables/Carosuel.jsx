import { useState, useEffect } from "react";
import { Box} from "@mui/material";
import { styled } from "@mui/system";

// Carousel Container Styling
const CarouselContainer = styled(Box)({
  width: '80%', 
  maxWidth: '1200px',
  margin: 'auto', 
  backgroundColor: '#181818', 
  borderRadius: '10px',  
  overflow: 'hidden', 
  position: 'relative',
  padding: '10px 0',  // Adds padding on top and bottom
});

// Slide Styling
const Slide = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '400px', // Adjusted to provide more space for images
  width: '100%', // Ensure each slide takes up full width of the container
  color: '#fff',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexShrink: 0, // Prevent slides from shrinking
});

// Dot Navigation Styling
const DotNavigation = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
  gap: '10px',
});

// Dot Styling
const Dot = styled(Box)(({ active }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: active ? '#CE1F60' : '#ffffff',
  cursor: 'pointer',
}));

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const slides = [
    {
      image: "https://wallpapercave.com/wp/wp7609209.jpg",
      title: "Slide 1 - Beautiful Landscape",
      description: "A breathtaking view of nature's beauty.",
    },
    {
      image: "https://www.hondaindiafoundation.org/Uploads/CSRCategoryImages/070320230513254839women--banner-main.jpg",
      title: "Slide 2 - Women's Empowerment",
      description: "Empowering women for a better future.",
    },
    {
      image: "https://wallpapercave.com/wp/wp7609400.jpg",
      title: "Slide 3 - City Life",
      description: "The hustle and bustle of urban living.",
    },
    {
      image: "https://i.ytimg.com/vi/-wW2yvpK16I/maxresdefault.jpg",
      title: "Slide 4 - Technology",
      description: "Innovations shaping the future.",
    },
  ];

  // Change slide every 3 seconds if autoSlide is true
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // 3 seconds interval
      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, );

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setAutoSlide(false); // Stop auto sliding once a dot is clicked
  };

  return (
    <CarouselContainer>
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentSlide * 100}%)`,
          
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            sx={{
              backgroundImage: `url(${slide.image})`, 
              borderRadius: 4,
            }}
          >
          </Slide>
        ))}
      </Box>

      {/* Dot Navigation */}
      <DotNavigation>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotNavigation>
    </CarouselContainer>
  );
};

export default Carousel;
