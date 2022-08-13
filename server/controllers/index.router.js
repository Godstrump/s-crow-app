const { Router } = require('express')
const authRoutes = require('./auths/routes/auth.router')

const router = Router();

router.use('/auths', authRoutes);

router.get('/', async (req, res) => {    
    res.send(`V0`);
});

module.exports = {
    indexRouter: router
}