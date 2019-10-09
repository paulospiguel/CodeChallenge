import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandPointRight,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';

import * as moment from 'moment';
import 'moment/locale/pt';

import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  HeaderName,
  DivSimulator,
  DivList,
  List,
  DivInput,
  DivReport,
} from './styles';
import TableRules from '../TableRules';
import ReportPatients from '../ReportPatients';
import Counter from '../Counter';

export default function Dashboard() {
  // const [dead, setDead] = useState(0);s

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
      <header>
        <HeaderName>
          <div>
            <h1>Hospital Simulator</h1>
            <p>
              Simulador de administração de medicamentos para estados de
              pacientes
            </p>
          </div>
        </HeaderName>
        <Counter />
      </header>

      {/* handleKeyDrugs("p") */}
      <TableRules />
      <DivSimulator>
        <DivList>
          <List>
            <h4>Medicamentos</h4>
            <div>
              {drugs.map(drug => (
                <li key={drug.key}>{`${drug.key} = ${drug.title}`}</li>
              ))}
            </div>
          </List>
          <List>
            <h4>Estado dos Pacientes</h4>
            <div>
              {patientsState.map(state => (
                <li key={state.key}>
                  {`${state.key.toUpperCase()} = ${state.title}`}
                </li>
              ))}
            </div>
          </List>
        </DivList>
        <div className="divForm">
          <DivInput>
            <div>
              <label htmlFor="fieldState">
                Inserir código do estado do paciente(s):{' '}
              </label>
              <input
                id="fieldState"
                type="text"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
            <div>
              <label htmlFor="fieldDrugs">
                Inserir código do(s) medicamento(s):{' '}
              </label>
              <input id="fieldDrugs" type="text" onChange={handleFild} />
            </div>
          </DivInput>
          <button type="button" onClick={handleStatePatienties}>
            Simular
          </button>
        </div>

        <DivReport>
          <h3>Relatório:</h3>
          <div className="divMessage">
            <ul>
              {messages.map(message => (
                <li key={message}>
                  <FontAwesomeIcon icon={faHandPointRight} />
                  {message}
                </li>
              ))}
              {flyings.map(message => (
                <li key={message}>
                  <FontAwesomeIcon icon={faBullhorn} />
                  {message}
                </li>
              ))}
            </ul>
            {messages.map(message => {
              alert(message);
            })}
          </div>
          <ReportPatients />
          <p className="dateTime">
            {moment()
              .locale('pt')
              .format('LLLL')}
          </p>
        </DivReport>
      </DivSimulator>
    </Container>
  );
}
