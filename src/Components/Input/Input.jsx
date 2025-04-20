export const Input = ({ text, onInputChange, name, type = "text" }) => {
    return (
        <div className="register-input">
            <h2>{text.toUpperCase()}</h2>
            <input 
                name={name}
                type={type}
                required={name === "fotoDePerfil"} // Esto es para que no me pida la foto de Perfil
                onChange={onInputChange}
            />
        </div>
    );
};
