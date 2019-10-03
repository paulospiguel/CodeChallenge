import React, { Component } from "react";

const patientiesState = [
  { key: "F", title: "Fever" },
  { key: "H", title: "Healthy" },
  { key: "D", title: "Diabetes" },
  { key: "T", title: "Tuberculosis" },
  { key: "X", title: "Dead" }
];

const drugs = [
  { key: "As", title: "Aspirin" },
  { key: "An", title: "Antibiotic" },
  { key: "I", title: "Insulin" },
  { key: "P", title: "Paracetamol" }
];

const changeStatePatienties = () => {
  const inputState = document.getElementById("addState").value;
  let codeState = [];
  codeState = inputState.split(",").map(code => code.trim().toLowerCase());

  const inputDrug = document.getElementById("addDrugs").value;
  let codeDrug = [];
  codeDrug = inputDrug.split(",").map(code => code.trim().toLowerCase());

  codeDrug.length === codeState.length
    ? compare(codeState, codeDrug)
    : console.log(codeDrug);
};

const compare = (array, array2) => {
  //console.clear();
  for (let i = 0; i < array.length; i++) {
    //console.log(array[i], array2[i]);
    switch (array[i]) {
      case "f":
        if (array2[i] === "as" || array2[i] === "p") {
          console.log("Curou à Febre");
        }
        break;
      default:
        console.log(false);
        break;
    }
  }
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: {}
    };
  }

  render() {
    return (
      <div>
        <p>Medicamentos</p>
        <ul>
          {drugs.map(drug => (
            <li key={drug.key}>{`${drug.key} = ${drug.title}`}</li>
          ))}
        </ul>
        <p>Estado dos Pacientes</p>
        <ul>
          {patientiesState.map(state => (
            <li key={state.key}>{`${state.key} = ${state.title}`}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="">Inserir Código do estado do paciente(s)</label>
          <input
            id="addState"
            type="text"
            style={{ textTransform: "uppercase" }}
          />
        </div>
        <div>
          <label htmlFor="">Inserir código do medicamento(s)</label>
          <input
            id="addDrugs"
            type="text"
            style={{ textTransform: "capitalize" }}
          />
        </div>
        <button onClick={changeStatePatienties}>Simular</button>
        <div>
          <p>Relatório:</p>
          <p>F:0, H:0, D:0, T:0, X:0</p>
        </div>
      </div>
    );
  }
}
