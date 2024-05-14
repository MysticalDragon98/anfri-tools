import createContract from "../../../plugins/web3/contracts";

const OwnableContract = (addr: string) => createContract("Ownable", addr);

export default OwnableContract;