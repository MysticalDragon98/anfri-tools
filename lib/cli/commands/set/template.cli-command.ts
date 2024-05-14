import { ok } from "assert";
import getContractAddresses from "../../../modules/network/getContractAddresses";
import { isZeroAddress } from "../../../modules/web3/isZeroAddress";
import CLIContext from "../../../../plugins/cli/lib/const/CLIContext";
import printMessage from "../../../../plugins/cli/lib/modules/stdout/printMessage";
import StyleEthAddress from "../../../styles/EthAddress.style";
import StyleKey from "../../../styles/Key.style";
import inquirer from "inquirer";
import getContract from "../../../modules/network/getContract";
import { ContractType } from "../../../enum/ContractType.enum";
import TemplatesContract from "../../../web3/contracts/Templates.contract";
import { $ETH_ADDRESS, $GAS_PRICE } from "../../../env";
import EthTxSendOptions from "../../../const/EthTxSendOptions.const";
import printJSON from "../../../../plugins/cli/lib/modules/stdout/printJSON";
import get0xArg from "../../../modules/web3-utils/get0xArg";

interface IOptions {
    
}

export default async function templateREPLCommand ([ templateName, address ]: string[], options: IOptions) {
    ok(templateName && address, 'Usage: anfri set template <template-name> <address>');

    const contracts = await getContractAddresses();
    const contractAddress = contracts[templateName];
    const Templates = TemplatesContract(contracts.templates);
    
    address = get0xArg(3);
    
    ok(contracts[templateName], `Template ${templateName} not found`);

    if (!isZeroAddress(contractAddress) && CLIContext.tty) {
        printMessage(`Template address is already set to ${StyleEthAddress(contractAddress)} for ${StyleKey(templateName)}`);
        
        const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Do you want to overwrite it?'
        }]);

        if (!confirm) {
            printMessage('Template address was not changed, exiting...');
            return;
        }
    }

    if (contractAddress.toLowerCase() === address.toLowerCase()) {
        printMessage(`Template address is already set to ${StyleEthAddress(address)} for ${StyleKey(templateName)}`);
        return;
    }

    printMessage(`Updating template address for ${StyleKey(templateName)}: ${StyleEthAddress(contractAddress)} => ${StyleEthAddress(address)}...`);

    await Templates.methods.register(templateName, address).send(EthTxSendOptions);
}