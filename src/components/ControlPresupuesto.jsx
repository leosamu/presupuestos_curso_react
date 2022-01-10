import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => {
            return gasto.cantidad + total;
        }, 0);

        //calcular porcentaje

        const nuevoporcentaje = (((presupuesto - (presupuesto - totalGastado)) / presupuesto) * 100).toFixed(2)
        setTimeout(() => {
            setPorcentaje(nuevoporcentaje);
        }, 1500);


        setDisponible(presupuesto - totalGastado);
        setGastado(totalGastado);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-EU', { style: 'currency', currency: 'EUR' })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');
        if (resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: '#3B82F6',
                    }

                    )}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`} />
            </div>
            <div className='contenido-presupuesto'>
                <button className="reset-app"
                    type="button"
                    onClick={handleResetApp} >Resetear App</button>
                <p>
                    <span className={`${disponible < 0 ? 'negativo' : ''}`}>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span className={`${disponible < 0 ? 'negativo' : ''}`}>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto
