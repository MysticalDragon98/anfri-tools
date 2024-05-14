import ContractConstructors from "../../const/ContractConstructors.const";
import { ContractType } from "../../enum/ContractType.enum";
import getContractAddresses from "./getContractAddresses";

export default async function getContract (name: ContractType, _constructor?: any) {
    const contracts = await getContractAddresses();
    const address = contracts[name];
    const constructor = _constructor ?? ContractConstructors[name];

    return constructor(address);
}