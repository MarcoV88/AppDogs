const fs = require('fs');
const bcrypt = require('bcrypt');
const registerController = {
    postRegister: async (req, res) => {
        const { usuario, correo, contrasena } = req.body;
        if (!usuario || !correo || !contrasena) {
            return res.status(400).json({ 
                recibido: "Faltan datos: usuario, correo y contraseña son requeridos",
                status : 400
            });
        }
        
        try {
 
            let usuarios = [];
            const data = fs.readFileSync('data/usuarios.json', 'utf8');
            usuarios = JSON.parse(data);
        
            const usuarioExiste = usuarios.find(u => u.usuario === usuario);
            if (usuarioExiste) {
                return res.status(400).json({ 
                    recibido: "Nombre de usuario incorrecto (ya registrado)",
                    status : 400
                });
            }
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const correoExiste = usuarios.find(u => u.correo === correo);
            if (correoExiste) {
                return res.status(400).json({ 
                    recibido: "Email incorrecto (ya registrado)",
                    status : 400
                });
            }
            if (!regex.test(correo)) {
                return res.status(400).json({ 
                    recibido: "Email incorrecto (no cumple con los requisitos)",
                    status : 400
                });
            }
            const comprobarContrasena = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if(!comprobarContrasena.test(contrasena)) {
                return res.status(400).json({ 
                    recibido: "Contraseña incorrecta (no cumple con los requisitos)",
                    status : 400
                });
            }

            
            const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

            const nuevoUsuario = { usuario, correo, contrasena, contrasenaEncriptada };
            usuarios.push(nuevoUsuario);

            fs.writeFileSync('data/usuarios.json', JSON.stringify(usuarios, null, 2));
            
            const usuarioRegistrado = usuarios.find(u => 
                u.usuario === usuario);
                if (usuarioRegistrado){
                    return res.status(201).json({ 
                    recibido: `¡Registro exitoso! Bienvenido ${usuario}`, 
                    status : 201
                });
            } else {
                    return res.status(400).json({ 
                    recibido: `Usuario incorrecto`,
                    status : 400
                });
            }
            
            
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            return res.status(500).json({ 
                recibido: "Error interno del servidor."
            });
        }
    }
};

module.exports = registerController;
