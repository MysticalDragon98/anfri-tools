import createContract from "../../../plugins/web3/contracts";

const ANFContract = (addr: string) => createContract("ANF", addr);

export default ANFContract;