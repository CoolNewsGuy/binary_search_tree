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
            arr.sort();
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
}
