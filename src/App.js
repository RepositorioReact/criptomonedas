import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width:900px;
  margin:0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    column-gap:2rem;
  }
`;

const Imagen = styled.img`
  max-width:100%;
  margin-top:5rem;
`;

const Heading = styled.h1`
  font-family:'Bebas Neue', cursive;
  color:#fff;
  text-align:left;
  font-weight:700;
  font-size:50px;
  margin-bottom: 50px;
  margin-top:80px;

  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color:#66a2fe;
    display:block;
  }
`;

function App() {

  //useStates para extraer en el Formulario.js
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});

  //Spinner
  const [cargando, guardarCargando] = useState(false);

  //Cuando cambian las monedas o las criptomonedas hay que recargarlo con el useEffect
  useEffect(()=>{

    const cotizarCriptomoneda = async () => {
      //evitamos la ejecución la primera vez
      if(moneda === '') return;

      //Consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //mostrar el spinner
      guardarCargando(true);

      //ocultar spinner y mostrar el resultado
      setTimeout(() => {
        //cambiar el estado de cargando
        guardarCargando(false);

        //guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000);
    }
    cotizarCriptomoneda();
  },[moneda, criptomoneda]);

  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen} 
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        
        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
