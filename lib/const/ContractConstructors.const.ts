import { ContractType } from "../enum/ContractType.enum";
import RentalContract from "../web3/contracts/Rental.contract";
import TemplatesContract from "../web3/contracts/Templates.contract";

const ContractConstructors = {
    [ContractType.Rental]: RentalContract,
    [ContractType.Templates]: TemplatesContract
}

export default ContractConstructors;