const INITIAL_STATE = {
  messages: [],
  reports: [
    { id: 'f', value: 0 },
    { id: 'h', value: 0 },
    { id: 'd', value: 0 },
    { id: 't', value: 0 },
    { id: 'x', value: 0 },
  ],
  patientsState: [
    { key: 'f', title: 'Fever' },
    { key: 'h', title: 'Healthy' },
    { key: 'd', title: 'Diabetes' },
    { key: 't', title: 'Tuberculosis' },
    { key: 'x', title: 'Dead' },
  ],
  drugs: [
    { key: 'as', title: 'Aspirin' },
    { key: 'an', title: 'Antibiotic' },
    { key: 'i', title: 'Insulin' },
    { key: 'p', title: 'Paracetamol' },
  ],
  rules: [
    { id: Math.random, description: 'Aspirina cura Febre' },
    { id: Math.random, description: 'Antibiótico cura a tuberculose' },
    {
      id: Math.random,
      description:
        'A insulina impede paciente diabético de morrer, não cura a diabetes',
    },
    {
      id: Math.random,
      description:
        'Se insulina é misturada com antibiótico = Pessoa saudáveis fica com febre',
    },
    { id: Math.random, description: 'Paracetanol cura febre' },
    {
      id: Math.random,
      description: 'Paracetamol misturado com aspirina pode matar',
    },
    {
      id: Math.random,
      description:
        '1 em 1 milhão, o mostro voador mostra sua força e ressuscita um paciente morto (fica Saldável)',
    },
  ],
};

/* while (!random.includes(temp)) {
  random.push(temp);
  console.log('número novo => ', temp);
  // Add no localStorage
  const JSONReadyRandom = JSON.stringify(random);
  localStorage.setItem('@hospiral-simulator/random', JSONReadyRandom);
  if (temp === num) {
    resetCount();
    return (messages = `Por um milagre divino, o paciente foi ressuscitado. Chamem a imprensa!`);
    // Caso o musquito ressusite alguma pessoa zera o contador
  }
}

const count = max - random.length;
return (messages = `Não foi desta vez. restão ${count.toLocaleString(
  'pt-BR'
)}/${max.toLocaleString('pt-BR')} tentativas.`);

if (random.length === max) {
  resetCount();
  return (messages = 'Chegou ao limite máximo de execuções');
  // Caso chegue no ultimo número zera o contador
}
return messages; */

// Obtem um número aleatório entre max e min

// Verifica a picada do mosquito min/max, adiciona em um array de numeros repetidos.
// Loop até encontrar um número não repetido, quando encontra add no array e o loop.
// *
//    ===== Início =========
// cria uma array vazio - ok
// cria array de 1 a 100 - ok

//   -Se for
//         -mersagem de sortudo
//         -zera array 2
//         -restitui arra1
//   - Se não for
//         -mensagem de tente novamaente
//         -sair

// verificar a quantidade de número no array 2
//     - se for menos Igual a 100
//         -zera array 2
//         -restitui arra1
//     =========  FIM ========

/* if (result) {
    random.push(temp);
    random.sort((a, b) => a - b);
    const JSONReadyRandom = JSON.stringify(random);
    localStorage.setItem('@hospiral-simulator/random', JSONReadyRandom);
    if (temp === numLuck) {
      messages = `O número da sorte foi${temp}`;
    } else {
      const rest = max - random.length;
      messages = `Não foi desta vez. Restão ${rest} tenativas`;
    }
    if (random.length >= max) resetCount();
  }
  console.log(messages, random.length); */
let random = [];
let message = [];
const listAll = [];
let listRepet = [];
// Function para zerar o contatdor do musquito mostro
const resetCount = () => {
  localStorage.removeItem('@hospiral-simulator/random');
  const JSONReadyRandom = JSON.stringify([]);
  localStorage.setItem('@hospiral-simulator/random', JSONReadyRandom);
  const randomCount = JSON.parse(localStorage['@hospiral-simulator/random']);
  // console.log(randomCount, `${randomCount.length} itens`);
  return randomCount;
};

const toggleReport = (state, patient) => {
  const newState = { ...state };
  let indexPatient = null;
  state.patientsState.map((element, index) => {
    if (element.title === patient) {
      indexPatient = index;
    }
  });

  if (patient === 'Dead') {
    if (newState.reports[indexPatient].value === 0) {
      newState.reports = [
        newState.reports[indexPatient],
        {
          value: --state.reports[indexPatient].value,
        },
      ];
    }
    this.patient = 'Healthy';

    state.patientsState.map((element, index) => {
      if (element.title === patient) {
        indexPatient = index;
      }
    });
  }

  newState.reports = [
    newState.reports[indexPatient],
    {
      value: ++state.reports[indexPatient].value,
    },
  ];
  return newState;
};

const handleList = state => {
  // Obtem valor array de numeros já sorteados do localStorage
  random = JSON.parse(localStorage['@hospiral-simulator/random']);
  const min = Math.ceil(1);
  const max = Math.floor(100);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  // sorteia um número de 1 a 100 - ok
  const temp = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(num, temp);

  const createNewList = () => {
    for (let i = 1; i <= max; i++) {
      listAll.push(i);
    }
  };

  if (listAll.length === 0) createNewList();

  // retira o numero sorteado do array 1
  const index = listAll.indexOf(num);
  console.log(index);

  if (index > -1) {
    listAll.splice(index, 1);
    listRepet.push(num);
    console.log(listAll);
    console.log(listRepet);
  }
  // coloca o numero sorteado no array 2
  // verificar o número sorteado é o da sorte
  if (temp === num) {
    message = `o mosquino voador mostrou a sua força. Ressucitou uma pessoa em estado de óbito`;
    createNewList();
    const newState = 'Healthy';
    toggleReport(state, newState);
    return;
  }
  if (listRepet.length === max) {
    createNewList();
    const newState = 'Healthy';
    toggleReport(state, newState);
    listRepet = [];
  }
  console.log(listRepet.length);
};

const handleDrugs = (state, action) => {
  const messages = [];
  action.codeStates.map((patient, index) => {
    const patientCurrent = index + 1;
    /** Verifica se foi digitado algum estado de paciente que não existe na lista */
    function searchPatient(element) {
      let result = false;
      state.patientsState.map(code => {
        if (element === code.key) result = true;
      });
      return result;
    }

    if (!action.codeStates.some(searchPatient)) {
      if (!action.codeStates)
        return messages.push(
          `Estado do paciente ${patientCurrent} desconhecido`
        );
    }
    /** Verifica se foi digitado algum medicamento que não existe na lista */
    function searchDrug(element) {
      let result = false;
      state.drugs.map(code => {
        if (element === code.key) result = true;
      });
      return result;
    }

    if (!action.codeDrugs.some(searchDrug)) {
      if (!action.codeStates.includes('d'))
        return messages.push('Medicamento desconhecido digitado');
    }

    /** Search by name the table codes * */
    let verifyDrugs;
    let tableDrugs;
    let drugsX = [];
    /** Mostra os nomes dos códigos medicamentos * */
    action.codeDrugs.map(code => {
      tableDrugs = state.drugs.findIndex(obj => obj.key === code);
      verifyDrugs = tableDrugs !== -1 ? state.drugs[tableDrugs].title : null;
      return drugsX.push(verifyDrugs);
    });
    drugsX = drugsX.join('/');

    switch (patient) {
      case 'h':
        if (
          action.codeDrugs.indexOf('as') !== -1 &&
          action.codeDrugs.indexOf('p') !== -1
        ) {
          /* Atualiza tabela de relatórios */
          const newState = 'Dead';
          toggleReport(state, newState);

          return messages.push(
            `O paciente ${patientCurrent} poderá ir a óbito com a junção dos medicamentos ${drugsX}.`
          );
        }
        if (
          action.codeDrugs.indexOf('an') !== -1 &&
          action.codeDrugs.indexOf('i') !== -1
        ) {
          const newState = 'Fever';
          toggleReport(state, newState);
          return messages.push(
            `O Paciente ${patientCurrent} poderá obter febre com a junção dos medicamentos ${drugsX}`
          );
        }
        if (action.codeDrugs.indexOf('i') !== -1) {
          return messages.push(
            `Medicamento ${drugsX} inadequado para o paciente ${patientCurrent}, porém sem efeitos colaterias.`
          );
        }

        if (
          action.codeDrugs.indexOf('as') !== -1 ||
          action.codeDrugs.indexOf('p') !== -1 ||
          action.codeDrugs.indexOf('an') !== -1
        ) {
          const newState = 'Healthy';
          toggleReport(state, newState);
          return messages.push(
            `Medicamento ${drugsX} não causa efeitos colaterais para o paciente ${patientCurrent}`
          );
        }

        return messages.push(
          `Nenhum medicamento prescrito para o parciente ${patientCurrent}.`
        );

      case 'f':
        if (
          action.codeDrugs.indexOf('as') !== -1 &&
          action.codeDrugs.indexOf('p') !== -1
        ) {
          const newState = 'Dead';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} poderá chegar a óbito com a junção dos medicamentos ${drugsX.replace(
              '/',
              ' e '
            )}.`
          );
        }
        if (
          action.codeDrugs.indexOf('as') !== -1 ||
          action.codeDrugs.indexOf('p') !== -1
        ) {
          const newState = 'Healthy';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} será currado da febre com a aplicação do medicamento ${drugsX}.`
          );
        }
        if (action.codeDrugs.indexOf('i') !== -1) {
          const newState = 'Fever';
          toggleReport(state, newState);
          return messages.push(
            `Medicamento Insulina não é recomendado para o paciente ${patientCurrent}, porém não causa efeitos colaterais.`
          );
        }
        if (action.codeDrugs.indexOf('an') !== -1) {
          const newState = 'Fever';
          toggleReport(state, newState);
          return messages.push(
            `Medicamento Antibiótico não é recomendado para o paciente ${patientCurrent}, porém não causa efeitos colaterais.`
          );
        }

        return messages.push(
          `Nenhum medicamento prescrito para o parciente ${patientCurrent}.`
        );

      case 'd':
        if (action.codeDrugs.indexOf('i') === -1) {
          const newState = 'Dead';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} poderá chegar a óbito sem a aplicação de insulina.`
          );
        }
        if (
          action.codeDrugs.indexOf('as') !== -1 &&
          action.codeDrugs.indexOf('p') !== -1
        ) {
          const newState = 'Dead';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} poderá chegar a óbito com a junção dos medicamentos ${drugsX}.`
          );
        }
        if (action.codeDrugs.indexOf('i') !== -1) {
          const newState = 'Diabetes';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} será estabilizado com a aplicação de Insulina (Continiará vivo, porém com diabetes).`
          );
        }

        return messages.push(
          `Nenhum medicamento prescrito para o parciente ${patientCurrent}.`
        );

      case 't':
        if (
          action.codeDrugs.indexOf('as') !== -1 &&
          action.codeDrugs.indexOf('p') !== -1
        ) {
          const newState = 'Dead';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} poderá chegar a óbito com a junção dos medicamento ${drugsX.replace(
              '/',
              ' e '
            )}.`
          );
        }
        if (action.codeDrugs.indexOf('i') !== -1) {
          const newState = 'Tuberculosis';
          toggleReport(state, newState);
          return messages.push(
            `Medicamento Insulina não é recomendado para o paciente ${patientCurrent}, porém não causa efeitos colaterais.`
          );
        }
        if (
          action.codeDrugs.indexOf('as') !== -1 ||
          action.codeDrugs.indexOf('p') !== -1
        ) {
          const newState = 'Tuberculosis';
          toggleReport(state, newState);
          return messages.push(
            `Medicamento ${drugsX} não causa efeitos colaterais para o paciente ${patientCurrent}`
          );
        }
        if (action.codeDrugs.indexOf('an') !== -1) {
          const newState = 'Healthy';
          toggleReport(state, newState);
          return messages.push(
            `O paciente ${patientCurrent} será currado da tuberculose com a aplicação de ${drugsX}.`
          );
        }

        return messages.push(
          `Nenhum medicamento prescrito para o parciente ${patientCurrent}.`
        );

      case 'x':
        if (action.codeDrugs.some(element => element !== '')) {
          return messages.push(
            `Paciente ${patientCurrent} já está em estado de óbito. Só por um milagre :(`
          );
        }
        return messages.push(
          `Nenhum medicamento prescrito para o parciente ${patientCurrent}.`
        );

      default:
        return messages.push(
          `Estado do paciente ${patientCurrent} desconhecido.`
        );
    }
  });

  return messages;
};

export default function simulator(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOGGLE_SIMULATOR':
      return { ...state, messages: handleDrugs(state, action) };
    case 'TOGGLE_REPORT':
      return toggleReport(state, action);
    case 'TOGGLE_FLYING':
      handleList(state);
      break;
    default:
      return state;
  }
  return state;
}
