import Gasto from "./Gasto"


const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
    return (
        <div className="listado-gastos contenedor">

            {filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>

                    {gastosFiltrados.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>

            ) : (
                <>
                    <h2>{gastos.length ? "Gastos" : "No hay Gastos"}</h2>

                    {gastos.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>

            )}


            {/* el map se ejecuta segun el numero de elementos que tenga el array,si no tiene nada  no se ejecuta */}


        </div>
    )
}

export default ListadoGastos
