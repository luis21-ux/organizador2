const db = require('../confing/db');

const Tarea = {
  getAll: (callback) => {
    db.query('SELECT * FROM tareas', callback);
  },

  getById: (Id_tareas, callback) => {
    db.query('SELECT * FROM tareas WHERE Id_tareas = ?', [Id_tareas], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO tareas (nombre, Id_estado_tareas) VALUES (?, 1)',
      [data.nombre], callback);
  },

  update: (Id_tareas, callback) => {
  const nuevoEstado = 2; // fijo para marcar como terminada
  db.query(
    'UPDATE tareas SET Id_estado_tareas = ? WHERE Id_tareas = ?',
    [nuevoEstado, Id_tareas],
    callback
  );
},

  delete: (Id_tareas, callback) => {
    db.query('DELETE FROM tareas WHERE Id_tareas = ?', [Id_tareas], callback)
  }
}  


console.log('Modelo Tareas cargado:', Tarea);

module.exports = Tarea;