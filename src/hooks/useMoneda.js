import React,{Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family:'Bebas Neue', cursive;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    font-size:2.4rem;
    margin-top:2rem;
    display:block;
`;

const Select = styled.select`
    width:100%;
    display:block;
    padding:1rem;
    -webkit-appearance:none;
    border-radius:10px;
    border:none;
    font-size:1.2rem;
`;

//Cuando usemos este hook se crea un label y un select
//le pasamos un label porque el texto del useMoneda en el Formulario al final es lo que va en el label
//stateInicial es para la moneda que elige el usuario, que en un primer lugar está vacío en el Formulario.js
//opciones viene del Formulario del arreglo MONEDAS para usarlo en el select
const useMoneda = (label, stateInicial, opciones) => {

    //Para poder pasar los parámetros que usamos normalmente en el useState, se debe usar el useState en nuestro hook
    const [state, actualizarState] = useState(stateInicial);

    //Se da por implicito el return
    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">- Seleccione una moneda -</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    //retornar state, interfaz y funcion que modifica el state
    return[state, Seleccionar, actualizarState];
};

export default useMoneda;