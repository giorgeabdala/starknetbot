

export default class TokenUtils {

    public static getAmount(amount: string, decimals: number): string {
        const amountDecimals = amount.split(".")[1];
        const amountLength = amountDecimals ? amountDecimals.length : 0;
        const amountToAdd = decimals - amountLength;
        const amountToReturn = amount.replace(".", "");
        return amountToReturn + "0".repeat(amountToAdd);

    }


}