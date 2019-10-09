const INITIAL_STATE = {
  messages: [],
  flyings: [],
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

// Function para zerar o contatdor do musquito mostro
/* const resetCount = () => {
  localStorage.removeItem('@hospiral-simulator/random');
  const JSONReadyRandom = JSON.stringify([]);
  localStorage.setItem('@hospiral-simulator/random', JSONReadyRandom);
  const randomCount = JSON.parse(localStorage['@hospiral-simulator/random']);
  // console.log(randomCount, `${randomCount.length} itens`);
  return randomCount;
};
 */

const random = [];
let listAll = [];
let listRepet = [];
const toggleReport = (state, patient) => {
  const newState = { ...state };
  let indexPatient = null;
  let indexDead = null;
  state.patientsState.map((element, index) => {
    if (element.title === patient) {
      indexPatient = index;
    }
  });
  // busca index morto na tabela
  state.patientsState.map((element, index) => {
    if (element.title === 'Dead') {
      indexDead = index;
    }
  });

  // decrementa de morto
  if (newState.reports[indexDead].value > 0) {
    newState.reports = [
      newState.reports[indexDead],
      {
        value: --state.reports[indexDead].value,
      },
    ];
  }

  // add em saudável
  newState.reports = [
    newState.reports[indexPatient],
    {
      value: ++state.reports[indexPatient].value,
    },
  ];
  return newState;
};

const handleList = state => {
  const message = [];
  // Obtem valor array de numeros já sorteados do localStorage
  // random = JSON.parse(localStorage['@hospiral-simulator/random']);
  const min = Math.ceil(1);
  const max = Math.floor(1000000);
  const num = localStorage.getItem('@hospiral-simulator/count'); // Math.floor(Math.random() * (max - min + 1)) + min;

  // Recriar lista
  const createNewList = () => {
    listAll = [];
    for (let i = 1; i <= max; i++) {
      listAll.push(i);
      // listAll.sort((a, b) => a - b);
    }
  };

  // Cria novo array para min a max
  if (listAll.length === 0) createNewList();

  // Obtem um número aleatório entre max e min
  let temp = Math.floor(Math.random() * (max - min + 1)) + min;

  // add na lista de repetidos
  const addListRepet = index => {
    listAll.splice(index, 1);
    listRepet.push(temp);
    listRepet.sort((a, b) => a - b);
    const tryRest = max - listAll.length;
    return tryRest;
  };

  // Verifica a picada do mosquito min/max, adiciona em um array de numeros repetidos.
  // Loop até encontrar um número não repetido, quando encontra add no array e o loop.
  // Enquanto não sortear um número não repetido não para
  while (listAll.indexOf(temp) === -1) {
    temp = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log('Novo sorteio', temp);
  }

  // console.log('Número que saiu Temp', temp);
  // console.log('Index Temp', listAll.indexOf(temp));
  // console.log('Número saiu Num', num);
  // console.log('Index Num', listAll.indexOf(num));

  // Caso seja o número da sorte verifica morto se tiver ressucita
  if (temp === num) {
    // Caso tenha algum em estado de óbito - Ressucita
    // Busca index de Dead na tabela
    let indexDead = null;
    state.patientsState.map((element, index) => {
      if (element.title === 'Dead') {
        indexDead = index;
      }
    });

    if (state.reports[indexDead].value > 0) {
      message.push(
        `O mosquito voador mostrou a sua força. Ressucitou uma pessoa em estado de óbito`
      );
      createNewList();
      const newState = 'Healthy';
      toggleReport(state, newState);
    } else {
      createNewList();
      message.push(
        'O mosquito com poder de ressucitar apareceu, porém não tem ninguém em óbito'
      );
    }
  }

  // Caso não for da sorte add a lista de repetidos
  if (listAll.indexOf(temp) > -1) {
    addListRepet(listAll.indexOf(temp));

    // console.log('Lista geral', listAll);
    // console.log('Lista já sairam', listRepet);
  }

  if (localStorage.getItem("@hospiral-simulator/count'") >= max) {
    localStorage.removeItem('@hospiral-simulator/count');
  }

  // [Segurança] Caso não encontre número da sorte entre o min e max zera tudo
  if (listRepet.length === max) {
    createNewList();
    // const newState = 'Healthy';
    // toggleReport(state, newState);
    listRepet = [];
  }

  return message;
};

const handleDrugs = (state, action) => {
  const messages = [];
  action.codeStates.map((patient, index) => {
    const patientCurrent = index + 1;

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
      return { ...state, flyings: handleList(state) };
    default:
      return state;
  }
  return state;
}
