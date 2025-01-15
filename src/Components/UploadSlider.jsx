import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import { Biology, Chemistry, Math, Physics } from "../Utils/images";

const subjects = [
  {
    src: Physics,
    alt: "Physics Subject for Grade 9",
    label: "Physics Grade 9",
  },
  {
    src: Biology,
    alt: "Biology Subject for Grade 10",
    label: "Biology Grade 10",
  },
  {
    src: Math,
    alt: "Mathematics Subject for Grade 2",
    label: "Mathematics Grade 2",
  },
  {
    src: Chemistry,
    alt: "Chemistry Subject for Grade 10",
    label: "Chemistry Grade 10",
  },
];

const UploadSlider = () => {
  return (
    <div className="h-full w-full ">
      
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {subjects.map((subject, index) => (
          <div key={index} className="  relative flex flex-col items-center p">
            <img
              src={subject.src}
              alt={subject.alt}
              className="h-[369px] object-cover rounded-lg mb-8 bg-white mx-auto"
            />
            <p className="  text-white font-extralight absolute text-xl w-full  px-4 py-1 mx-auto">
              {subject.label}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default UploadSlider;
