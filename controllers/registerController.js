const registerController = {
    getRegister: (req, res) => {
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
        return res.status(400).json({ 
            mensaje: "Faltan datos: nombre, email y password son requeridos" 
        });
    }
    
    res.status(201).json({ 
        mensaje: "Usuario registrado exitosamente",
        usuario: { nombre, email }
    });
}
};

module.exports = registerController