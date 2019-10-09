import React, { useState } from 'react';
import resetCount from '../../controllers/Utils';

function DashboardController() {
  const initialStateCount = '@hospiral-simulator/count';
  let [count, setCount] = useState(localStorage.getItem(initialStateCount));
  let random = [];

  const randomFlying = e => {
    e.preventDefault();
    if (resetCount(e)) return;

    // Obtem valor do localStorage
    random = JSON.parse(localStorage['@hospiral-simulator/random']);
    const min = Math.ceil(1);
    const max = Math.floor(10);
    const num = 8;

    // Obtem um número aleatório entre max e min
    const temp = Math.floor(Math.random() * (max - min + 1)) + min;

    // Verifica a picada do mosquito min/max, adiciona em um array de numeros repetidos.
    // Loop até encontrar um número não repetido, quando encontra add no array e o loop.

    while (!random.includes(temp)) {
      random.push(temp);
      console.log('número novo => ', temp);
      // Add no localStorage
      const JSONReadyRandom = JSON.stringify(random);
      localStorage.setItem('@hospiral-simulator/random', JSONReadyRandom);
      if (temp === num) {
        console.log(
          `Por um milagre divino, o paciente foi ressuscitado. Chamem a imprensa!`
        );
        console.log(JSON.parse(localStorage['@hospiral-simulator/random']));
        console.log(`Foi na tentativa ${random.length}`);
        // Caso o musquito ressusite alguma pessoa zera o contador
        if (resetCount(e, true)) return;
        return;
      }
    }

    const count = max - random.length;
    console.log(
      `Não foi desta vez. restão ${count.toLocaleString(
        'pt-BR'
      )}/${max.toLocaleString('pt-BR')} tentativas.`
    );

    if (random.length === max) {
      console.log('Chegou ao limite máximo de execuções');
      // Caso chegue no ultimo número zera o contador
      if (resetCount(e, true)) return;
    }
  };

  const handleCount = e => {
    e.preventDefault();
    switch (e.target.id) {
      case 'add':
        setCount(++count);
        localStorage.setItem(initialStateCount, count);
        break;
      case 'remove':
        setCount(--count);
        localStorage.setItem(initialStateCount, count);
        break;
      case 'reset':
        localStorage.removeItem(initialStateCount);
        setCount((count = 0));
        localStorage.setItem(initialStateCount, count);
        break;
      default:
        break;
    }
  };
}

export default DashboardController;
