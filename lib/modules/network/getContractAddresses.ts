import { $TEMPLATES_ADDRESS } from "../../env";
import { MSBlockchain } from "../../services";
import TemplatesContract from "../../web3/contracts/Templates.contract";

export default async function getContractAddresses () {
    if (!$TEMPLATES_ADDRESS) {
        return await MSBlockchain.network.contracts();
    }

    const types = ["nfts", "genetics", "orbs", "wings", "marketplace", "rental", "anf", "ico", "currency"];
    const obj = { templates: $TEMPLATES_ADDRESS };
    const Templates = await TemplatesContract($TEMPLATES_ADDRESS);

    for (const type of types) {
        obj[type] = await Templates.methods.resolve(type).call();
    }

    return obj;
}