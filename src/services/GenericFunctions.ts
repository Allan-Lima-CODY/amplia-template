import CryptoJS from 'crypto-js';

const key = 'minha key';

export const GenericFunctions = {
    validateEmail(email: string): boolean {
        if (email !== null) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        return false;
    },

    formatDate(value: any) {
        return value.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },

    formatDateTime(value: any){
        return value.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    },

    encryptIdentifier(id: number): string {
        const idString = id.toString();
        const encryptedId = CryptoJS.AES.encrypt(idString, key).toString();

        return encryptedId;
    },

    decryptIdentifier(id: string): number {
        const decryptedId = CryptoJS.AES.decrypt(id, key).toString(CryptoJS.enc.Utf8);

        return parseInt(decryptedId);
    },

    formatMoney(amount: any) {
        const formattedAmount = 'R$' + amount.toFixed(2).replace('.', ',');
        return formattedAmount;
    },

    formatMoneyField(amount: any) {
        let cleanedValue = amount.value.replace(/[^\d.,]/g, '');
        cleanedValue = cleanedValue.replace('.', ',');

        return cleanedValue;
    }
}