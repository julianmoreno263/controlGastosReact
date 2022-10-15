
import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoeditar }) => {

    //state para el nombre del gasto, para leer el state de un campo de un form se pone en el input el value y el evento onChange
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [id, setId] = useState("")
    const [fecha, setFecha] = useState("")

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])



    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoeditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios")

            setTimeout(() => {
                setMensaje("")
            }, 2000);
            return
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar-modal"
                    onClick={ocultarModal}
                />
            </div>

            {/*  con comillas invertidas y ${} podemos poner clases de css dinamicamente en react, la clase formulario es estatica pero a la hora de animar el modal ponemos la clase "animar", asi que utilizamos esta sintaxis para poner la clase dependiendo el cambio en el state animarModal*/}
            <form
                action=""
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        placeholder="Añade la Cantidad del Gasto: ej. 300"
                        id="cantidad"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}

                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name=""
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"} />
            </form>
        </div>
    )
}

export default Modal
