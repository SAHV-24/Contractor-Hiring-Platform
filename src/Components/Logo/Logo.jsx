/* eslint-disable react/prop-types */
import "../Footer/Footer.css";

export function Logo({ url, desc, href = "", target = "" }) {
  return (
    <a className="logo p-0 m-0" href={href} target={target}>
      <img src={url} alt={desc} className="logo p-0 m-0" />
    </a>
  );
}
