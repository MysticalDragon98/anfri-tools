import { MSBlockchain } from "../../services";

export default async function getContractAddresses () {
    return await MSBlockchain.network.contracts();
}