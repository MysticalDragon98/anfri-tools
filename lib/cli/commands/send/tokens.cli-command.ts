import { ok } from "assert";
import getContract from "../../../modules/network/getContract";
import SendableERC20Contract from "../../../web3/contracts/SendableERC20.contract";
import { ContractType } from "../../../enum/ContractType.enum";
import toWei from "../../../modules/web3-utils/toWei";
import { $ETH_ADDRESS } from "../../../env";
import { log } from "console";

interface IOptions {

}

export default async function tokensREPLCommand (args: string[], options: IOptions) {
    const [ amount, tokenName, destination ] = args;

    ok(amount && tokenName && destination, "Usage: anfri send tokens <amount> <tokenName> <destination>");

    const token = await getContract(tokenName as ContractType, SendableERC20Contract);
    const decimals: bigint = await token.methods.decimals().call();
    const amountInWei = toWei(parseFloat(amount.toString()), decimals);

    await token.methods.transfer(destination, amountInWei).send({
        from: $ETH_ADDRESS,
        type: "0x1"
    });

    log(`Sent ${amount} ${tokenName} to ${destination}`);
}