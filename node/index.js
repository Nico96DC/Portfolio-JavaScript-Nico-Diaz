// Creación de script para leer y escribir JSON
export function node() {
    const express = require('express');
    const app = express();
    const port = 3000;

    app.use(express.json());

    let objeto = [
        {id: 1, nombre: "Elemento 1"},
        {id: 2, nombre: "Elemento 2"},
        {id: 3, nombre: "Elemento 3"}
    ];

    app.get('/leer-datos', (req, res) => {
        res.json(objeto);
    });

    app.post('/guardar-datos', (req, res) => {
        let nuevoObjeto = {
            id: objeto.length + 1,
            nombre: req.body.nombre
        };

        objeto.push(nuevoObjeto);

        return res.json({mensaje: 'Datos guardados correctamente', objeto: nuevoObjeto});
    });

    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });

    console.log("Datos de objeto final en JSON:" + JSON.stringify(objeto, null, 2));
}
