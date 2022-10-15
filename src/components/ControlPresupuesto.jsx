import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    //gastos es un array de objetos, por eso se utiliza mejor reduce() para almacenar lo que haya en ese array en una variable, reduce es un array method que toma 2 valores, una variable que llamaremos total, y la instancia del gasto, entonces el gasto.cantidad se va a ir acumulando en la variable total, y le decimos que esa variable total comienza en cero.Entonces este calculo en si es para que en el state de gastado se vaya actualizando con los valores de lo que vamos gastando,osea si yo hago un gasto de 40,ese 40 se va almacenando en ese state.Si vamos sumando mas gastos pues se va sumando ese valor.
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
    }, [gastos])

    //funcion con codigo js utilizando una nueva API de js para formatear cantidades de numeros a dinero, se debe tener presente a la hora de querer utilizar nuevas apis que no vayan a modificar el tipo de dato original del state(en este caso el state presupuesto) porque esto va contra las regals de react, aqui se le pasa el state de presupuesto a la funcion pero no modifica el tipo de dato,solo lo formatea, podemos verificar esto en components, vemos el App y alli el state sigue siendo un numero(porque esta en azul), y en pantalla vemos el nuevo formato.
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }


    //funcion para resetear la app
    const handleResetApp = () => {
        const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?")
        if (resultado) {
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }




    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
                        trailColor: "#C9C4C3",
                        textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>Reset App</button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}

                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}

                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}

                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
