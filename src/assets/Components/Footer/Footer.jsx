import "./Footer.css";

function Footer() {
  //TODO implement the SVG's
  return (
    <footer>
      <section id="footer-contact">
        <div>
          <span id="footer-cont-text">Contáctanos</span>
        </div>
        <div>
          <span id="footer-cont-text">|</span>
        </div>
        <div id="footer-email">
          <h3>Añade tu correo</h3>
          <input
            type="text"
            name=""
            id=""
          />
        </div>
      </section>
      <section id="footer-media">
        <div>
          <h1 id="footer-networks">Redes</h1>
        </div>

        <div>{/*SVGS*/}</div>
      </section>
    </footer>
  );
}

export default Footer;
