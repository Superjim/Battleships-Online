import "./space.css";

interface Props {
  coord: string;
  image?: string;
  orientation?: string;
}

//This function returns a div with an image and classname
//The image is rotated 90 degrees in the css files depending on the orientation
function Space({ coord, image, orientation }: Props) {
  if (orientation === "x") {
    return (
      <div className="space">
        {image && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="parked x"
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="space">
        {image && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="parked y"
          ></div>
        )}
      </div>
    );
  }
}

export default Space;
