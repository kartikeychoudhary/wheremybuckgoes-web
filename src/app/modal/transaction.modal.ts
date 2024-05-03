export class Transaction {
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
    deleted?:boolean;

    getType(type:string){
        switch(type){
            case 'debit': return 'DEBIT';
            case 'spent': return 'DEBIT';
            case 'credit': return 'CREDIT';
            default: return '';
        }
    }

    getMode(type:string){
        switch(type){
            case 'upi': return 'UPI';
            case 'nift': return 'NIFT';
            case 'imps': return 'IMPS';
            default: return '';
        }
    }

    getCategory(type:string){

    }

    constructor(params:any){
        this.id = params?.id; 
        this.amount = params?.price ? params?.price : params?.amount; 
        this.account = params?.account; 
        this.description = params?.description; 
        this.tags = params?.tags; 
        this.type = params?.type ? this.getType(params.type.toLowerCase()) : '' 
        this.splits = params?.splits; 
        this.splitsOwner = params?.splitsOwner; 
        this.transactionMode = params?.mode ? this.getMode(params.mode.toLowerCase()) :params?.transactionMode; 
        this.audited = params?.audited; 
        this.category = params?.category; 
        this.spendAt = params?.spendAt; 
        if(params?.accountName && params?.accountType){
            this.description = params?.accountType + ' ' + params.accountName;
        }
    }
}