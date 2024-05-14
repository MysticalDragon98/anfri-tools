import getContractAddresses from "../../modules/network/getContractAddresses";
import printJSON from "../../../plugins/cli/lib/modules/stdout/printJSON";
import printData from "../../../plugins/cli/lib/modules/stdout/printData";
import printMessage from "../../../plugins/cli/lib/modules/stdout/printMessage";
import StyleHighlight from "../../../plugins/cli/lib/styles/Highlight.style";
import StyleEthAddress from "../../styles/EthAddress.style";
import StyleCommand from "../../../plugins/cli/lib/styles/Command.style";
import StyleInfoMark from "../../../plugins/cli/lib/styles/InfoMark.style";

interface IOptions {
    json?: boolean;
}

export default async function templatesREPLCommand ([]: string[], options: IOptions) {
    const addresses = await getContractAddresses();

    printMessage('This is a list of all deployed templates for the current network:')
    
    Object.keys(addresses).forEach(templateName => {
        printData(templateName, addresses[templateName]);
        if (templateName === "templates") {
            printMessage(' ', StyleHighlight(`• ${templateName}:`), StyleHighlight(StyleEthAddress(addresses[templateName])));
        } else {
            printMessage(' ', StyleHighlight(`• ${templateName}:`), StyleEthAddress(addresses[templateName]));
        }
    });
    
    printJSON(addresses);
    printMessage('\n', StyleInfoMark("?"), 'For more information about a specific template, run:', StyleCommand('anfri get template <template-name>'));
}