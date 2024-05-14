import { ok } from "assert";
import get0xArg from "../../../modules/web3-utils/get0xArg";
import ANFContract from "../../../web3/contracts/ANF.contract";
import getContractAddresses from "../../../modules/network/getContractAddresses";
import toWei from "../../../modules/web3-utils/toWei";
import EthTxSendOptions from "../../../const/EthTxSendOptions.const";
import printMessage from "../../../../plugins/cli/lib/modules/stdout/printMessage";
import StyleNumber from "../../../styles/Number.style";
import StyleEthAddress from "../../../styles/EthAddress.style";
import StyleKey from "../../../styles/Key.style";

interface IOptions {
    
}

export default async function anfREPLCommand ([ amount, destination ]: string[], options: IOptions) {
    destination = get0xArg(3);
    ok(amount && destination, "Usage: anfri send anf <amount> <destination>");

    const contracts = await getContractAddresses();
    const token = await ANFContract(contracts.anf);
    const decimals: bigint = await token.methods.decimals().call();
    const amountInWei = toWei(parseFloat(amount.toString()), decimals);

    printMessage(`Sending ${StyleNumber(amount)} ANF to ${StyleEthAddress(destination)}...`);

    await token.methods.sendTokens(destination, amountInWei).send(EthTxSendOptions);

    printMessage(`Sent ${StyleNumber(amount)} ${StyleKey("ANF")} to ${StyleEthAddress(destination)}`);
}