import { ok } from "assert";
import get0xArg from "../../../modules/web3-utils/get0xArg";
import SendableERC20Contract from "../../../web3/contracts/SendableERC20.contract";
import getContractAddress from "../../../modules/network/getContractAddress";
import { isZeroAddress } from "../../../modules/web3/isZeroAddress";
import fromWei from "../../../modules/web3-utils/fromWei";

interface IOptions {
    
}

export default async function balanceREPLCommand ([ tokenName, address ]: string[], options: IOptions) {
    address = get0xArg(3);

    ok(tokenName && address, "Usage: anfri token balance <token-name> <address>");

    const tokenAddress = await getContractAddress(tokenName);
    const token = SendableERC20Contract(tokenAddress);
    
    ok(!isZeroAddress(tokenAddress), `Token ${tokenName} not found`);

    const balance: bigint = await token.methods.balanceOf(address).call();
    const decimals: bigint = await token.methods.decimals().call();

    console.log(fromWei(balance, decimals).toString())
}