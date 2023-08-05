
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
