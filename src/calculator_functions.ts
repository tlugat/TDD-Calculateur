export const operands = new Set(['+', '-', 'x', '/']);

export const calculateRPNResult = (query: string) => {
    const values = query.trim().split(' ');
    const stack: Array<string | number> = [];
    values.map((value: string) => {
        if(operands.has(value)) {
            let nb2 = parseInt(stack.pop() as string);
            let nb1 = parseInt(stack.pop() as string);
            stack.push(calculateRPN(nb1, nb2, value));
        } else {
            if(value === 'NEGATE') {
                    stack[stack.length - 1] = '-' + stack[stack.length - 1]
            } else {
                stack.push(value);
            }
        }
    })
   
    return parseInt(stack.pop() as string);
}

export const calculateRPN = (nb1: number, nb2: number, operator: string) => {
        
    let result;

    switch(operator) {
        case '+':
            result = nb1 + nb2;
            break;
        case '-':
            result = nb1 - nb2;
            break;
        case 'x':
            result = nb1 * nb2;
            break;
        case '/':
            result = nb1 / nb2;
            break;
        default:
            result = 'Error';
        break;
    }

    return result;
}
