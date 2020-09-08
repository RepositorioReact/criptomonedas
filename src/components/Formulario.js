import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition:background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    //useState de listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);//viene un arreglo de objetos en el resultado.data.Data de consultarAPI
    const [error, guardarError] = useState(false);

    //Arreglo de monedas que se le pasa al hook y al useMoneda como opciones para el select
    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar de los Estar dos Unidos'},
        {codigo:'MXN', nombre:'Peso Mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra Esterlina'},
    ]

    //Uso del useMoneda, el selectMonedas es lo que hay en el retunr default como Seleccionar
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda','',MONEDAS);

    //Uso del useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    //ejecutar llamado a la API al inicar la aplicacion con useEffect
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            //Con axios
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    },[]);

    //cuando el usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();

        //validar si ambos campos están llenos, viene en el parametro state de nuestro custom hooks
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        //pasar los componentes al componete princial App.js porque de aquí se pasa el resultado a otro componente
        guardarError(false);
        //los props del App.js
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;