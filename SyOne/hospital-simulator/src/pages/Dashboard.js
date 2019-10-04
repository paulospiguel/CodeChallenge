import React, { Component } from "react";
import * as moment from "moment";
import "moment/locale/pt";

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

/*######### Rules ################
 * Aspirina cura Febre
 * Antibiótico cura a tuberculose
 * A insulina impede paciente diabédico de morre, não cura do diabetes
 * Se insulina é misturada com antibiótico = Pessoa saudaveis fica com febre
 * Paracetanol cura febre
 * Paracetamol misturado com aspirina pode matar
 * Um vez em 1 milão, o mostro voador mostra sua força e ressuscita um paciente morto (fica Saldável)
 */

const handleStatePatienties = () => {
  let inputStates = document.getElementById("addState");
  let inputDrugs = document.getElementById("addDrugs");

  const [codeStates, codeDrugs] = [
    inputStates.value.split(",").map(code => code.trim().toLowerCase()),
    inputDrugs.value.split(",").map(code => code.trim().toLowerCase())
  ];

  if (inputStates.value === "") {
    alert("Preencha código de paciente");
    inputStates.focus();
    return false;
  }
  //Verify code insert in the field
  if (verifyField(codeStates, patientiesState)) {
    codeDrugs.length === codeStates.length
      ? compare(codeStates, codeDrugs)
      : compare2(codeStates, codeDrugs);
  }
};

const verifyField = (codes, arrayTable) => {
  let verify = true;
  codes.map(code => {
    if (arrayTable.findIndex(obj => obj.key === code.toUpperCase()) === -1) {
      console.log(
        "Estado de paciente inserido inexistente/inválido. Introduza um código válido para continuar."
      );
      verify = false;
    }
  });
  return verify;
};

const compare = (patienties, addDrugs) => {
  //console.clear();
  patienties.map((patient, index) => {
    // console.log(patienties[index]);
    //console.log(addDrugs[index]);
    switch (patient) {
      case "f":
        if (addDrugs[index] === "as" || addDrugs[index] === "p") {
          console.log(`Paciente ${++index} com febre currado.`);
        }
        if (addDrugs[index] === "") {
          console.log(
            `Nenhum medicamento inserido. O paciente continuará doente.`
          );
        }
        break;
      case "t":
        if (addDrugs[index] === "an") {
          console.log(`Paciente ${++index} com febre currado.`);
        }
        break;
      case "d":
        if (addDrugs[index] === "i")
          console.log(
            `Paciente ${++index} com diabetes, estabilizado com insulina.`
          );
        if (addDrugs[index] !== "i")
          console.log(`Paciente ${++index} com diabetes, morre sem insulina.`);
        break;
      default:
        console.log(
          `Este medicamento não é adequado para o estado deste paciente.`
        );
        break;
    }
  });
};

const compare2 = (patienties, addDrugs) => {
  // console.clear();
  //console.log(patienties);
  //console.log(addDrugs);

  patienties.map((patient, index) => {
    switch (patient) {
      case "f":
      case "d":
      case "t":
        if (addDrugs.indexOf("as") !== -1 && addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente poderá chegar a óbito com a junção destes dois medicamento`
          );
        } else {
          switch (true) {
            case addDrugs.indexOf("as") !== -1:
            case addDrugs.indexOf("p") !== -1:
              console.log("Currado");
              break;
            default:
              console.log(`Sem efeitos colaterais conhecidos.`);
              break;
          }
        }
        break;
      case "h":
        if (addDrugs.indexOf("i") !== -1 && addDrugs.indexOf("an") !== -1) {
          console.log(
            `O paciente poderá obter febre com a junção destes dois medicamento`
          );
        }
        if (addDrugs.indexOf("as") !== -1 && addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente poderá chegar a óbito com a junção destes dois medicamento`
          );
        }
        break;
      case "x":
        console.log(
          `Paciente em estado de óbito. Só um milagre resuscitar-lo com este medicamento`
        );
        break;
      default:
        console.log(`Sem efeitos colaterais conhecidos.`);
        break;
    }
  });
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
          <label htmlFor="">Inserir código do estado do paciente(s)</label>
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
        <button onClick={handleStatePatienties}>Simular</button>
        <div>
          <p>Relatório:</p>
          <p>F:0, H:0, D:0, T:0, X:0</p>
          <p>
            {moment()
              .locale("pt")
              .format("LLLL")}
          </p>
        </div>
      </div>
    );
  }
}
