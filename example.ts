function generateRandomNumberUnder100(howMany: number): number[] {
    const numbers = [];

    for (let counter = 1; counter <= howMany; counter++) {
        const randomNumber = Math.floor(Math.random() * 101);

        numbers.push(randomNumber);
    }

    return numbers;
}
