{
  /*File: loader.js
   Objective: 
   The objective of the page is is to render a loading animation and display a logo image while the content is being loaded in a React component.
   The Loading component renders a container (div) with a specified height and applies a CSS class of "divLoader". 
   Inside the container, there is an SVG loader element (svg) that displays a circular path animated with a rotating motion.
   The path has a fill color of #51CACC and transforms to achieve the rotating effect. 
   The animation is defined using the animateTransform element within the path.

   Additionally, the component includes a logo image (img) displayed within a span element with a CSS class of "fvloadio". 
   The image source is set to "/public/img/tgzlogo.jpg" and is displayed with a width of '70px'.
   The purpose of this component is to provide a visual indication to the user that the content is being loaded. 
   It combines an animated loader with a logo image to create a more engaging loading experience.

*/
}
// Import React Componentimport React from "react";
import React from "react";

const Loading = () => {
  return (
    <div className="divLoader" style={{ height: "60vh" }}>
      {/* SVG loader */}
      <svg
        className="svgLoader"
        viewBox="0 0 100 100"
        width="10em"
        height="10em"
      >
        {/* Circular path representing the loader */}
        <path
          ng-attr-d="{{config.pathCmd}}"
          ng-attr-fill="{{config.color}}"
          stroke="none"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#51CACC"
          transform="rotate(179.719 50 51)"
        >
          {/* Animation for rotation */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 51;360 50 51"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Logo image */}
      <span className="fvloadio">
        <img src="/public/img/tgzlogo.jpg" alt="#" style={{ width: "70px" }} />
      </span>
    </div>
  );
};

export default Loading;
