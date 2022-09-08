import "./space.css";

interface Props {
  coord: string;
  image?: string;
}

function Space({ coord, image }: Props) {
  return (
    <div className="space">
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="parked"
        ></div>
      )}
    </div>
  );
}

export default Space;
