import { useEffect, useState } from "react";
import "../assets/css/Carousel.css";

import img1 from "../assets/images/music-img.jpeg";
import img2 from "../assets/images/music-img1.jpeg";

const Carousel = () => {
  const [totalSlide, setTotalSlide] = useState<number>();
  let slideIndex: number = 0;
  const [slides, setSlides] = useState<NodeListOf<HTMLDivElement>>();

  useEffect(() => {
    const carouselItem: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(".carousel-item");
    setTotalSlide(carouselItem.length);
    setSlides(carouselItem);
    showSlide(slideIndex);
  }, []);

  function showSlide(index: number) {
    slides?.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
  }
  
  function moveSlide(n:number) {
    slideIndex = (slideIndex + n + totalSlide!) % totalSlide!;
    showSlide(slideIndex);
  }
  
  function autoSlide() {
    moveSlide(1);
  }

  setInterval(autoSlide, 10000);

  return (
    <div className='carousel'>
      <div className='carousel-inner'>
        <div className='carousel-item'>
          <img src={img1} alt='main image' />
        </div>
        <div className='carousel-item'>
          <img src={img2} alt='main image' />
        </div>
      </div>
      <button type='button' className='prev'>
        prev
      </button>
      <button type='button' className='next'>
        next
      </button>
    </div>
  );
};

export default Carousel;
