import printJSON from "../../../../plugins/cli/lib/modules/stdout/printJSON";
import printMessage from "../../../../plugins/cli/lib/modules/stdout/printMessage";
import {MSBlockchain} from "../../../services";

interface IOptions {
    from?: number;
    to?: number;
}

export default async function nftsREPLCommand ([ ]: string[], options: IOptions) {
    const from = options.from ?? 1;
    const to = options.to ?? 10;
    const anfris = await Promise.all(Array(to - from).fill(0).map(async (_, i) => {
        const anfri = await MSBlockchain.nfts.anfri({ id: i + 1 });
        
        return anfri;
    }));
    
    
    printJSON({
        from: from,
        to: to,
        anfris
    });
}