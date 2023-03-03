console.clear();

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (current.value == value) return undefined;
        if (value < current.value) {
          if (current.left === null) {
            current.left = node;
            return this;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = node;
            return this;
          }
          current = current.right;
        }
      }
    }
  }

  search(value) {
    if (this.root === null) {
      return -1;
    } else {
      let current = this.root;
      while (true) {
        if (current.value === value) {
          return current;
        }
        if (current.value > value) {
          if (current.left === null) {
            return -1;
          } else {
            current = current.left;
          }
        }
        if (current.value < value) {
          if (current.right === null) {
            return -1;
          } else {
            current = current.right;
          }
        }
      }
    }
  }

  contains(value) {
    if (this.root === null) return false;
    let found = false;
    let current = this.root;

    while (current && !found) {
      if (current.value === value) found = true;
      if (current.value > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return found;
  }

  breadthFirstSearch() {
    if (this.root === null) return [];

    let node = null;
    let data = [];
    let queue = [];

    queue.push(this.root);

    while (queue.length) {
      node = queue.shift();
      data.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  DFSPreOder() {
    if (this.root === null) return;

    let data = [];
    let current = this.root;

    function preOrder(node) {
      data.push(node.value);
      if (node.left) preOrder(node.left);
      if (node.right) preOrder(node.right);
    }

    preOrder(current);
    return data;
  }

  depthFirstTraversalPreorderRecurvsive(node) {
    if (node === null) return [];

    let result = [];

    result = [
      node.value,
      ...this.depthFirstTraversalPreorder(node.left),
      ...this.depthFirstTraversalPreorder(node.right)
    ];
    return result;
  }

  DFSPostOrder() {
    if (this.root === null) return;

    let data = [];
    let current = this.root;

    function postOrder(node) {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      data.push(node.value);
    }

    postOrder(current);
    return data;
  }

  DFSInOrder() {
    if (this.root === null) return;

    let data = [];
    let current = this.root;

    function inOrder(node) {
      if (node.left) inOrder(node.left);
      data.push(node.value);
      if (node.right) inOrder(node.right);
    }
    inOrder(current);
    return data;
  }

  min(root) {
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    } else if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null; // Handle leaf node
      }
      if (!root.left) {
        return root.right; // handle delete with only right node
      } else if (!root.right) {
        return root.left; // handle delete with only left node
      }
      root.value = this.min(root.right); // Take the smallest element of the right sub tree and make it root and delete it - Inorder successor
      root.right = this.deleteNode(root.right, root.value); // delete the smallest node on right sub tree
    }
    return root; // do not forget to return root
  }

  maxDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));
  }

  maxDepth1(node) {
    if (node == null) return 0;
    else {
      /* compute the depth of each subtree */
      let lDepth = this.maxDepth1(node.left);
      let rDepth = this.maxDepth1(node.right);

      /* use the larger one */
      if (lDepth > rDepth) return lDepth + 1;
      else return rDepth + 1;
    }
  }
}

const bst = new BST();

bst.insert(10);
bst.insert(6);
bst.insert(3);
bst.insert(8);
bst.insert(15);
bst.insert(20);

console.log(bst.DFSInOrder().toString());
