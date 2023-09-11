import { BinarySearchTree } from "./main.ts";

function generateRandomNumbers(
    minValue: number,
    maxValue: number,
    howMany: number
): number[] {
    const numbers = [];

    for (let counter = 1; counter <= howMany; counter++) {
        let randomNumber =
            minValue + Math.floor(Math.random() * (maxValue + 1));

        while (randomNumber > maxValue) {
            randomNumber =
                minValue + Math.floor(Math.random() * (maxValue + 1));
        }

        numbers.push(randomNumber);
    }

    return numbers;
}

let numbers = generateRandomNumbers(0, 100, 20);
const tree = new BinarySearchTree(numbers);

tree.prettyPrint();

console.log("Balanced tree?", tree.isBalanced());
console.log("The elements in level-order: ", tree.levelOrder());
console.log("The elements in pre-order: ", tree.preoder());
console.log("The elements in post-order: ", tree.postorder());
console.log("The elements in in-order: ", tree.inorder());

numbers = generateRandomNumbers(100, 500, 20);
numbers.forEach((num) => tree.insert(num));

tree.prettyPrint();
console.log("Balanced tree after adding elements?", tree.isBalanced());
tree.rebalance();
