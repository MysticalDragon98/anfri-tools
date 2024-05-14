import { $ETH_ADDRESS, $GAS_PRICE } from "../env";

const EthTxSendOptions = {
    from: $ETH_ADDRESS,
    gasPrice: $GAS_PRICE
}

export default EthTxSendOptions;