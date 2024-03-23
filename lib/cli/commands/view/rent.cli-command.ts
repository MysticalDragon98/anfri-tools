import { ok } from "assert";
import getContract from "../../../modules/network/getContract";
import { ContractType } from "../../../enum/ContractType.enum";
import { log } from "termx";
import IOnChainRental from "../../../interfaces/OnChainRental.interface";
import { isZeroAddress } from "../../../modules/web3/isZeroAddress";
import { cyan, yellow, greenBright, magenta } from "chalk";
import fromWei from "../../../modules/web3-utils/fromWei";

interface IOptions {

}

export default async function rentREPLCommand ([ anfriId ]: string[], options: IOptions) {
    ok(anfriId, "Usage: anfri view rent <anfriId>");

    const contract = await getContract(ContractType.Rental);
    const rent: IOnChainRental = await contract.methods.rent(anfriId).call();

    log(`Rental info for Anfri #${anfriId}:`);
    log(`- Owner: ${yellow(rent.owner)}`);

    if (rent.publishedAt !== BigInt(0)) {
        const dateString = new Date(Number(rent.publishedAt) * 1000).toString();
        log(`- Published at: ${magenta(dateString)}`);
    } else {
        log(`- Published at: ${yellow("Not published yet")}`);
    }

    if (isZeroAddress(rent.borrower)) {
        log(`- Borrower: ${yellow("Not rented yet")}`);
    } else {
        log(`- Borrower: ${cyan(rent.borrower)}`);
    }

    if (rent.borrowedAt !== BigInt(0)) {
        const dateString = new Date(Number(rent.borrowedAt) * 1000).toLocaleString();
        log(`- Borrowed at: ${greenBright(dateString)}`);
    } else {
        log(`- Borrowed at: ${yellow("Not borrowed yet")}`);
    }

    log(`- Price: ${yellow(fromWei(rent.price, BigInt(18)))} orbs`);
    log(`- Interest: ${greenBright(rent.interest + "%")}`);
}