export const constructClassName = (mainClasses: string[], additionalClasses?: string[]) => {
    return additionalClasses && additionalClasses.length > 0
        ? [...mainClasses, ...additionalClasses].join(' ')
        : mainClasses.join(' ');
};

export const transformAmountToString = (amount: number | undefined) =>
    new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount || 0);
