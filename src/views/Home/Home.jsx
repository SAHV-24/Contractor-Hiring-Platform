
import "./Home.css";

export function Header() {
  return (
    <header className="header">
      <div className="image-collage">
        {/* Usa imágenes reales o placehold.it para probar el diseño */}
        <img src="https://via.placeholder.com/70" alt="img1" />
        <img src="https://via.placeholder.com/70" alt="img2" />
        <img src="https://via.placeholder.com/70" alt="img3" />
        <img src="https://via.placeholder.com/70" alt="img4" />
        <img src="https://via.placeholder.com/70" alt="img5" />
        <img src="https://via.placeholder.com/70" alt="img6" />
      </div>
      <div className="header-text">
        <h1>¡Empecemos!</h1>
        <div className="search-bar">
          <input type="text" placeholder="Técnico de Computadores" />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Home() {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="content-card"></div>
        <div className="content-card"></div>
        <div className="content-card"></div>
      </div>
    </>
  );
}
