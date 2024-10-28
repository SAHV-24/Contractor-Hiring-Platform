import "../Footer/Footer.css";

export function Logo({ url, desc }) {
  return (
    <a className="logo">
      <img src={url} alt={desc} className="logo"/>
    </a>
  );
}


