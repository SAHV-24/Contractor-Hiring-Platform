// eslint-disable-next-line react/prop-types
export function ImageFrame({ source, h = 32 }) {
  return (
    <div>
      <img src={source} alt={` image of a ${source} `} width={h} />
    </div>
  );
}
