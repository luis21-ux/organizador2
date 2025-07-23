const Tareas = require('../models/organizadorModel');

console.log('¿Qué es Tareas?', Tareas);

exports.getTareas = (req, res) => {
  Tareas.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTareasById = (req, res) => {
  const { Id_tareas } = req.params;
  Tareas.getById(Id_tareas, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(results[0]);
  });
};

exports.crearTareas = (req, res) => {
  Tareas.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ Id_tareas: result.insertId, ...req.body });
  });
};

exports.actualizarTareas = (req, res) => {
  const { Id_tareas } = req.params;
  Tareas.update(Id_tareas, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Tarea marcada como terminada' });
  });
};

exports.eliminarTareas = (req, res) => {
  const { Id_tareas } = req.params;
  Tareas.delete(Id_tareas, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Tarea eliminada' });
  });
};