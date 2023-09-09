class Node {
    data: number;
    left: Node | null;
    right: Node | null;

    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    root: Node | null;

    constructor(arr?: number[]) {
        this.root = arr === undefined ? null : this.buildFromArray(arr);
    }

    private buildFromArray(
        arr: number[],
        start = 0,
        end?: number
    ): Node | null {
        if (arr.length === 0) {
            return null;
        }

        // sort the array and set end
        if (end === undefined) {
            arr = [...new Set(arr)];
            arr.sort((a, b) => a - b);
            end = arr.length - 1;
        }

        if (start > end) {
            return null;
        }

        const middle = Math.floor((start + end) / 2);
        const root = new Node(arr[middle]);

        root.left = this.buildFromArray(arr, start, middle - 1);
        root.right = this.buildFromArray(arr, middle + 1, end);

        return root;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true): void {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }

    insert(value: number): void {
        this.root = this.insertRec(value, this.root);
    }

    private insertRec(value: number, node: Node | null): Node {
        if (node === null) {
            node = new Node(value);
        }

        if (value < node.data) {
            node.left = this.insertRec(value, node.left);
        } else if (value > node.data) {
            node.right = this.insertRec(value, node.right);
        }

        return node;
    }
}
