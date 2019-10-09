export function toggleSimulator(obj) {
  return {
    type: 'TOGGLE_SIMULATOR',
    codeStates: obj.codeStates,
    codeDrugs: obj.codeDrugs,
  };
}
