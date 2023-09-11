import { BinarySearchTree } from "./main.ts";

function generateRandomNumberUnder100(howMany: number): number[] {
    const numbers = [];

    for (let counter = 1; counter <= howMany; counter++) {
        const randomNumber = Math.floor(Math.random() * 101);

        numbers.push(randomNumber);
    }

    return numbers;
}

const numbers = generateRandomNumberUnder100(20);
const tree = new BinarySearchTree(numbers);

