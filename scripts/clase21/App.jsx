import Tarjeta from "./Tarjeta";

const datos = [
    {
        titulo: "Montañas",
        imagen: "https://via.placeholder.com/200",
        texto: "Un paisaje increíble de montañas."
    },
    {
        titulo: "Playa",
        imagen: "https://via.placeholder.com/200",
        texto: "Una playa hermosa al atardecer."
    },
    {
        titulo: "Ciudad",
        imagen: "https://via.placeholder.com/200",
        texto: "Vista de una ciudad moderna."
    }
];

function App() {
    return (
        <div>
            {datos.map((item, index) => (
                <Tarjeta
                    key={index}
                    titulo={item.titulo}
                    imagen={item.imagen}
                    texto={item.texto}
                />
            ))}
        </div>
    );
}

export default App;
