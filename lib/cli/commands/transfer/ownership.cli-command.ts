import { ok } from "assert";
import getContractAddresses from "../../../modules/network/getContractAddresses";
import getContract from "../../../modules/network/getContract";
import OwnableContract from "../../../web3/contracts/Ownable.contract";
import printMessage from "../../../../plugins/cli/lib/modules/stdout/printMessage";
import StyleKey from "../../../styles/Key.style";
import StyleEthAddress from "../../../styles/EthAddress.style";
import get0xArg from "../../../modules/web3-utils/get0xArg";
import EthTxSendOptions from "../../../const/EthTxSendOptions.const";
import { $ETH_ADDRESS } from "../../../env";

interface IOptions {
    
}

export default async function ownershipREPLCommand ([ templateName, newAddress ]: string[], options: IOptions) {
    const contracts = await getContractAddresses();
    const contractAddress = contracts[templateName];

    newAddress = get0xArg(3);

    ok(contracts[templateName], `Template ${templateName} not found`);

    const ownableContract = await OwnableContract(contractAddress);
    const owner: string = await ownableContract.methods.owner().call();

    if (owner.toLowerCase() !== $ETH_ADDRESS.toLowerCase()) {
        printMessage(`You are not the owner of the ${StyleKey(templateName)} contract. Only the owner can transfer ownership.`);
        return;
    }

    if (owner.toLowerCase() === newAddress.toLowerCase()) {
        printMessage(`Template ${StyleKey(templateName)} is already owned by ${StyleEthAddress(newAddress)}`);
        return;
    }

    printMessage(`Transferring ownership of ${StyleKey(templateName)} from ${StyleEthAddress(owner)} to ${StyleEthAddress(newAddress)}...`);

    await ownableContract.methods.transferOwnership(newAddress).send(EthTxSendOptions);

    printMessage(`Ownership of ${StyleKey(templateName)} has been transferred from ${StyleEthAddress(owner)} to ${StyleEthAddress(newAddress)}`);
}