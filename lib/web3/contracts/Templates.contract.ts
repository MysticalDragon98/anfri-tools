import createContract from "../../../plugins/web3/contracts";

const TemplatesContract = (addr: string) => createContract("Templates", addr);

export default TemplatesContract;