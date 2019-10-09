import React, { useEffect, useState } from 'react';

import * as moment from 'moment';
import 'moment/locale/pt';

import { useSelector, useDispatch } from 'react-redux';

import Container from './styles';
import TableRules from '../../components/TableRules';
import ReportPatienties from '../../components/ReportPatienties';
import Counter from '../../components/Counter';

export default function Dashboard() {
  // const [dead, setDead] = useState(0);

  const { drugs, patientsState, messages, flyings } = useSelector(
    state => state.toggleSimulator
  );

  const dispatch = useDispatch();

  /* ##################
  Verifica se o medicaento é para o em estado de óbito */
  /*  if (codeStates.indexOf('x') !== -1) {
     setDead({ dead: 1 });
   } */

  /*
  useEffect(() => {
    if (dead) {
      dispatch({ type: 'TOGGLE_COUNTER' });
    }
  }, [dead, dispatch]);
  ####################
  */

  /** Pega valores dos campos input */
  const handleStatePatienties = () => {
    const inputStates = document.getElementById('fieldState');
    const inputDrugs = document.getElementById('fieldDrugs');

    const [codeStates, codeDrugs] = [
      inputStates.value.split(',').map(code => code.toLowerCase()),
      inputDrugs.value.split(',').map(code => code.toLowerCase()),
    ];

    /* Dispara as actions */

    dispatch({ type: 'TOGGLE_COUNTER' });
    dispatch({ type: 'TOGGLE_FLYING' });
    dispatch({ type: 'TOGGLE_SIMULATOR', codeStates, codeDrugs });

    /** Verifica campo paciente está em branco */
    // if (inputStates.value === "") {
    // alert("Preencher o código do estado do paciente");
    // inputStates.focus();
    // return false;
    // }
    // Verify code insert in the field
    // if (verifyField(codeStates, patientsState)) {
    // drugsPatients(codeStates, codeDrugs);
    // }
  };

  /** Busca nomes dos medicamentos na tabela * */
  const handleKeyDrugs = obj => {
    const findByField = field => (value, list) =>
      list.find(obj => obj[field] === value);

    const findByKey = value => ({
      in: list => findByField('key')(value, list),
    });

    const newObj = findByKey(obj).in(drugs);
    console.log(newObj.title);
  };

  /** Verifica campos paciente/medicamento » Caso foi digitado em brando retorna erro */
  const verifyField = (codes, arrayTable) => {
    let verify = true;
    codes.map(code => {
      if (arrayTable.findIndex(obj => obj.key === code) === -1) {
        console.log(
          'Estado de paciente inserido inexistente/inválido. Introduza um código válido para continuar.'
        );
        verify = false;
      }
    });
    return verify;
  };

  /** Retira espaços field medicamentos */
  const handleFild = e => {
    const arrWords = e.target.value;
    if (e.target.id === 'fieldDrugs') {
      document.getElementById(e.target.id).value = arrWords.trim();
      /* (TESTE) mostra medicamentos digitados */
      // console.log(arrWords, arrWords.split(",").length);
    }
  };

  /** Automatiza buttom simular » Ao precionar tecla enter */
  document.addEventListener('keypress', e => {
    // console.clear();
    if (e.which === 13) handleStatePatienties();
  });

  return (
    <Container>
      <Counter />
      {/* handleKeyDrugs("p") */}
      <TableRules />
      <p>Medicamentos</p>
      <ul>
        {drugs.map(drug => (
          <li key={drug.key}>{`${drug.key} = ${drug.title}`}</li>
        ))}
      </ul>
      <p>Estado dos Pacientes</p>
      <ul>
        {patientsState.map(state => (
          <li key={state.key}>{`${state.key.toUpperCase()} = ${
            state.title
          }`}</li>
        ))}
      </ul>
      <div className="fieldInput">
        <div>
          <label htmlFor="">Inserir código do estado do paciente(s)</label>
          <input
            id="fieldState"
            type="text"
            style={{ textTransform: 'uppercase' }}
            required
          />
        </div>
        <div>
          <label htmlFor="">Inserir código do(s) medicamento(s)</label>
          <input id="fieldDrugs" type="text" onChange={handleFild} />
        </div>
      </div>

      <button type="button" onClick={handleStatePatienties}>
        Simular
      </button>
      <div>
        <p>Relatório:</p>
        <div>
          <ul>
            {messages.map(message => (
              <li key={message}>{message}</li>
            ))}
            {flyings.map(message => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          {messages.map(message => {
            alert(message);
          })}
        </div>
        <ReportPatienties />
        <p>
          {moment()
            .locale('pt')
            .format('LLLL')}
        </p>
      </div>
    </Container>
  );
}
