const loginController = {
    getLogin: (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ 
            mensaje: "Faltan datos: email y password son requeridos" 
        });
    }
    
    res.json({ 
        mensaje: "Login exitoso",
        usuario: { email }
    });
}
}

module.exports = loginController