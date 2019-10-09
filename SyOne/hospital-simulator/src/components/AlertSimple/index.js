import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// import { Container } from './styles';

export default function AlertSimple(props) {
  return confirmAlert({
    title: 'Aviso',
    message: props.message,
    buttons: [
      {
        label: 'Continuar',
        onClick: () => {}, // alert("Adicionado...")
      },
      {
        label: 'Cancelar',
        onClick: () => {},
      },
    ],
  });
}
