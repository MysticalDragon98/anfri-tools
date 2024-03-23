import createContract from "../../../plugins/web3/contracts";

const RentalContract = (addr: string) => createContract("Rental", addr);

export default RentalContract;