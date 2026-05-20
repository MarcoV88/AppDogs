const fs = require('fs');

const loginController = {
    postLogin: (req, res) => {
        const { usuario, contrasena } = req.body;
        
        try {

            const data = fs.readFileSync('data/usuarios.json', 'utf8');
            const usuarios = JSON.parse(data);

            const usuarioEncontrado = usuarios.find(u => 
                u.usuario === usuario && u.contrasena === contrasena
            );
            
            if (usuarioEncontrado) {
                return res.json({ 
                    recibido: `Bienvenido ${usuario}`
                });
            } else {
                return res.status(401).json({ 
                    recibido: "Usuario o contraseña incorrecta"
                });
            }
        } catch (error) {
            console.error("Error al leer usuarios:", error);
            return res.status(500).json({ 
                recibido: "Error interno del servidor"
            });
        }
    }
}

module.exports = loginController;
