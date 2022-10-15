import { useState } from "react"
import Mensaje from "./Mensaje"


const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    //state para poner un mensaje,solo es para este componente
    const [mensaje, setMensaje] = useState("")

    //funcion para validar el input del presupuesto, se debe de pasar ese presupuesto a Number
    const handlePresupuesto = (e) => {
        e.preventDefault()
        if (!presupuesto || presupuesto < 0) {
            setMensaje("El presupuesto no es válido")
            return
        }

        setMensaje("")
        setIsValidPresupuesto(true)
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        type="number"
                        className="nuevo-presupuesto"
                        placeholder="Añade tu Presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {/* error es una clase de css */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}



            </form>
        </div>
    )
}

export default NuevoPresupuesto
