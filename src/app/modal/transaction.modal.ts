export interface Transaction {
    id?: number;
    amount?: number;
    account?: string;
    description?: string;
    tags?: string[];
    type?: string;
    splits?: string[];
    splitsOwner?: string[];
    transactionMode?: string;
    audited?: string;
    category?: string;
    spendAt?: string;
}