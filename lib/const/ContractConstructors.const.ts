import { ContractType } from "../enum/ContractType.enum";
import RentalContract from "../web3/contracts/Rental.contract";

const ContractConstructors = {
    [ContractType.Rental]: RentalContract
}

export default ContractConstructors;