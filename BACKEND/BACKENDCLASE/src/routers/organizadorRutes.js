const express = require('express');
const router = express.Router();
const organizadorControllers = require('../controllers/organizadorControllers');

router.get('/', organizadorControllers.getTareas);
router.get('/:Id_tareas', organizadorControllers.getTareasById);
router.post('/', organizadorControllers.crearTareas);
router.put('/:Id_tareas', organizadorControllers.actualizarTareas);
router.delete('/:Id_tareas', organizadorControllers.eliminarTareas);

module.exports = router;