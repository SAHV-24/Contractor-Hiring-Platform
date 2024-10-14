import "./Footer.css";
import { Logo } from "./Logo";

export function Footer() {

  const logos = [
    {
      url: "https://cdn-icons-png.flaticon.com/512/87/87390.png",
      alt: "instagram logo",
    },
    {
      url: "https://cdn-icons-png.flaticon.com/256/20/20673.png",
      alt: "facebook logo",
    },
    {
      url: "https://cdn.icon-icons.com/icons2/2389/PNG/512/github_logo_icon_145252.png",
      alt: "github logo",
    },
  ];


  return (
    <footer>
      <section id="footer-contact">
        <div>
          <span id="footer-cont-text">Contáctanos</span>
        </div>
        <div>
          <span id="footer-cont-text">|</span>
        </div>
        <form id="footer-email" onSubmit={(e)=>{e.preventDefault()}}>
          <h3>Añade tu correo</h3>
          
          <input type="text" name="" id="" />
          <button type="submit" id="send-email-btn">Enviar</button>
        </form>
      </section>
      <section id="footer-media">
        {logos.map((logo, index) => (
          <Logo key={index} url={logo.url} desc = {logo.alt} />
        ))}
      </section>
    </footer>
  );
}
