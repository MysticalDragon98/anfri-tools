import { $TEMPLATES_ADDRESS } from "../../env";
import { MSBlockchain } from "../../services";
import TemplatesContract from "../../web3/contracts/Templates.contract";

export default async function getContractAddress (contractName: string) {
    if (!$TEMPLATES_ADDRESS) {
        const contracts = await MSBlockchain.network.contracts();

        return contracts;
    }

    const Templates = await TemplatesContract($TEMPLATES_ADDRESS);

    return await Templates.methods.resolve(contractName).call();
}