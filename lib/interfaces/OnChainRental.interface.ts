export default interface IOnChainRental {
    owner: string;
    borrower: string;
    borrowedAt: bigint;
    publishedAt: bigint;
    price: bigint;
    duration: bigint;
    interest: bigint;
}