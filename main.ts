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

    delete(value: number): void {
        this.root = this.deleteRec(value, this.root);
    }

    private deleteRec(value: number, root: Node | null): Node | null {
        if (root === null) {
            return null;
        }

        if (value === root.data) {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            // both children exist
            let successorParent = root;
            let successor = root.right;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            if (successorParent === root) {
                successorParent.right = successor.right;
            } else {
                successorParent.left = successor.right;
            }

            root.data = successor.data;

            return root;
        }

        if (value < root.data) {
            root.left = this.deleteRec(value, root.left);
        } else {
            root.right = this.deleteRec(value, root.right);
        }

        return root;
    }

    find(value: number): Node | null {
        return this.findRec(value, this.root);
    }

    private findRec(value: number, root: Node | null): Node | null {
        if (root === null || value === root.data) {
            return root;
        }

        if (value < root.data) {
            return this.findRec(value, root.left);
        }

        return this.findRec(value, root.right);
    }

    levelOrder(func: (node: Node) => unknown): void {
        if (this.root === null) {
            return;
        }

        const queue = [this.root];

        while (queue.length !== 0) {
            const firstElement = queue.pop() as Node;
            func(firstElement);

            if (firstElement.left !== null) {
                queue.push(firstElement.left);
            }
            if (firstElement.right !== null) {
                queue.push(firstElement.right);
            }
        }
    }
}
