import { ok } from "assert";
import getContractAddresses from "../../../modules/network/getContractAddresses";
import { log } from "termx";

interface IOptions {

}

export default async function templateREPLCommand ([ templateName ]: string[], options: IOptions) {
    ok(templateName, 'Usage: anfri get template <template-name>');

    const addresses = await getContractAddresses();

    if (!addresses[templateName]) {
        log(`Template ${templateName} not found.`)
        return;
    }

    console.log(addresses[templateName])
}