import React, { Component } from "react";
import * as moment from "moment";
import "moment/locale/pt";

const patientiesState = [
  { key: "f", title: "Fever" },
  { key: "h", title: "Healthy" },
  { key: "d", title: "Diabetes" },
  { key: "t", title: "Tuberculosis" },
  { key: "x", title: "Dead" }
];

const drugs = [
  { key: "as", title: "Aspirin" },
  { key: "an", title: "Antibiotic" },
  { key: "i", title: "Insulin" },
  { key: "p", title: "Paracetamol" }
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
    handleDrugs(codeStates, codeDrugs);
  }
};

const verifyField = (codes, arrayTable) => {
  let verify = true;
  codes.map(code => {
    if (arrayTable.findIndex(obj => obj.key === code) === -1) {
      console.log(
        "Estado de paciente inserido inexistente/inválido. Introduza um código válido para continuar."
      );
      verify = false;
    }
  });
  return verify;
};

const handleDrugs = (patienties, addDrugs) => {
  patienties.map((patient, index) => {
    //console.log(addDrugs);
    let verifyDrugs,
      tableDrugs = "";
    let drugsX = [];
    // Search by name the table codes.
    addDrugs.map(code => {
      tableDrugs = drugs.findIndex(obj => obj.key === code);
      verifyDrugs = tableDrugs !== -1 ? drugs[tableDrugs].title : null;
      drugsX.push(verifyDrugs);
    });

    drugsX = drugsX.join("/");
    console.log(drugsX);

    switch (patient) {
      case "h":
        console.log(drugs[tableDrugs].key);
        console.log(addDrugs);
        if (!verifyDrugs) {
          console.log(`Medicamento inexistente ou inválido.`);
        }
        if (addDrugs.indexOf("as") !== -1 && addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente ${++index} poderá levar a óbito com a junção destes medicamento.`
          );
        }
        if (addDrugs.indexOf("an") !== -1 && addDrugs.indexOf("i") !== -1) {
          if (addDrugs.indexOf("p") !== -1 || addDrugs.indexOf("as") !== -1) {
            console.log(
              `O paciente ${++index} poderá ficar saudável devido o (P/As) tirar a febre causada pela junção destes dois medicamento(An/I).`
            );
          } else {
            console.log(
              `O paciente ${++index} poderá ficar com febre com a junção destes dois medicamento(An/I).`
            );
          }
        }

        break;
      case "f":
        if (addDrugs.indexOf("as") !== -1 && addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente ${++index} poderá chegar a óbito com a junção destes dois medicamento.`
          );
        }
        if (addDrugs.indexOf("as") !== -1 || addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente ${++index} será currado da Febre com a aplicação medicamento ${drugsX}.`
          );
        }
        break;
      case "d":
        console.log(addDrugs.indexOf("i"));
        if (addDrugs.indexOf("i") === -1) {
          console.log(
            `O paciente ${++index} poderá chegar a óbito sem a aplicação de insulina.`
          );
        }
        if (addDrugs.indexOf("as") !== -1 && addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente ${++index} poderá chegar a óbito com a junção destes dois medicamento.`
          );
        }
        if (addDrugs.indexOf("i") !== -1) {
          console.log(
            `O paciente ${++index} será estabilizado com a aplicação dos medicamentos.`
          );
        }
        break;
      case "t":
        if (addDrugs.indexOf("as") !== -1 && addDrugs.indexOf("p") !== -1) {
          console.log(
            `O paciente ${++index} poderá chegar a óbito com a junção destes dois medicamento.`
          );
        }
        if (addDrugs.indexOf("an") !== -1 && addDrugs.indexOf("i") !== -1) {
          console.log(
            `O paciente ${++index} poderá chegar a óbito com a junção destes dois medicamento.`
          );
        } else if (addDrugs.indexOf("an") !== -1) {
          console.log(
            `O paciente ${++index} será currado da tuberculose com a aplicação dos medicamentos.`
          );
        }
        break;
      default:
        console.log(
          `Tratamento desconhecido ou sem efeitos colaterais para o paciente ${++index}.`
        );
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
