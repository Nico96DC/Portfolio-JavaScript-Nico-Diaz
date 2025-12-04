function Tarjeta({ titulo, imagen, texto }) {
    return (
        <div className="tarjeta">
            <img src={imagen} alt={titulo} />
            <h2>{titulo}</h2>
            <p>{texto}</p>
        </div>
    );
}

export default Tarjeta;
