import { useEffect, useState } from "react";
import axios from "axios";

function TablaTareas() {
  const [pendientes, setPendientes] = useState([]);
  const [terminadas, setTerminadas] = useState([]);

  const [modal, setModal] = useState(false);
  const [nombreNuevaTarea, setNombreNuevaTarea] = useState("");

  useEffect(() => {
    cargarTareas();
  }, []);

  function cargarTareas() {
    axios.get("http://localhost:3000/api/tareas")
      .then(res => {
        const tareas = res.data;
        setPendientes(tareas.filter(t => t.Id_estado_tareas === 1));
        setTerminadas(tareas.filter(t => t.Id_estado_tareas === 2));
      })
      .catch(e => console.log("Error al cargar tareas", e));
  }

  function marcarTerminada(id) {
    axios.put(`http://localhost:3000/api/tareas/${id}`, { Id_estado_tareas: 2 })
      .then(() => cargarTareas())
      .catch(e => console.log("Error al actualizar", e));
  }

  function eliminar(id) {
    axios.delete(`http://localhost:3000/api/tareas/${id}`)
      .then(() => cargarTareas())
      .catch(e => console.log("Error al eliminar", e));
  }

  function guardarTarea() {
    if (!nombreNuevaTarea.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }
    axios.post("http://localhost:3000/api/tareas", { nombre: nombreNuevaTarea, Id_estado_tareas: 1 })
      .then(() => {
        setNombreNuevaTarea("");
        setModal(false);
        cargarTareas();
      })
      .catch(e => console.log("Error al crear tarea", e));
  }

  const filas = Math.max(pendientes.length, terminadas.length);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: 48, marginTop: 40, marginBottom: 60 }}>
        Organizador de tareas
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: 900, border: "1px solid black", textAlign: "center", backgroundColor: "white" }}>
          <thead style={{ backgroundColor: "#adebad" }}>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px", fontSize: 18 }}>Pendiente</th>
              <th style={{ border: "1px solid black", padding: "10px", fontSize: 18 }}>Terminada</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(filas)].map((_, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid black", padding: 10, textAlign: "left" }}>
                  {pendientes[i] && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>{pendientes[i].nombre}</span>
                      <button
                        style={{ backgroundColor: "green", color: "white", borderRadius: 4, border: "none", padding: "5px 10px", cursor: "pointer" }}
                        onClick={() => marcarTerminada(pendientes[i].Id_tareas)}
                      >
                        Marcar terminada
                      </button>
                    </div>
                  )}
                </td>
                <td style={{ border: "1px solid black", padding: 10, textAlign: "left" }}>
                  {terminadas[i] && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>{terminadas[i].nombre}</span>
                      <button
                        style={{ backgroundColor: "red", color: "white", borderRadius: 4, border: "none", padding: "5px 10px", cursor: "pointer" }}
                        onClick={() => eliminar(terminadas[i].Id_tareas)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filas === 0 && (
              <tr>
                <td colSpan={2} style={{ border: "1px solid black", padding: 10 }}>
                  No hay tareas para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <button
          style={{ backgroundColor: "green", color: "white", padding: "10px 20px", borderRadius: 6, border: "none", cursor: "pointer" }}
          onClick={() => setModal(true)}
        >
          Agregar tarea
        </button>
      </div>

      {modal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{ backgroundColor: "white", padding: 20, borderRadius: 6, width: 320 }}>
            <h2 style={{ marginBottom: 20 }}>Agregar nueva tarea</h2>
            <input
              type="text"
              placeholder="Nombre de la tarea"
              value={nombreNuevaTarea}
              onChange={e => setNombreNuevaTarea(e.target.value)}
              autoFocus
              style={{ width: "100%", padding: 8, marginBottom: 20, borderRadius: 4, border: "1px solid #ccc" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setModal(false)}
                style={{ padding: "8px 16px", borderRadius: 4, border: "1px solid #999", cursor: "pointer" }}
              >
                Cancelar
              </button>
              <button
                onClick={guardarTarea}
                style={{ backgroundColor: "green", color: "white", padding: "8px 16px", borderRadius: 4, border: "none", cursor: "pointer" }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaTareas;
