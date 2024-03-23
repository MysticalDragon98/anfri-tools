import { HTTPProxy } from "../plugins/http-proxies";
import { $BLOCKCHAIN_HOST } from "./env";

export const MSBlockchain = HTTPProxy($BLOCKCHAIN_HOST);