//给定一个二叉树，返回它的 后序 遍历。 
//
// 示例: 
//
// 输入: [1,null,2,3]  
//   1
//    \
//     2
//    /
//   3 
//
//输出: [3,2,1] 
//
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？ 
// Related Topics 栈 树 
// 👍 559 👎 0


import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

//Java：二叉树的后序遍历
class P145BinaryTreePostorderTraversal {
    public static void main(String[] args) {
        Solution solution = new P145BinaryTreePostorderTraversal().new Solution();
        TreeNode root = new TreeNode(1, null, null);
        solution.postorderTraversal(root);
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     * int val;
     * TreeNode left;
     * TreeNode right;
     * TreeNode() {}
     * TreeNode(int val) { this.val = val; }
     * TreeNode(int val, TreeNode left, TreeNode right) {
     * this.val = val;
     * this.left = left;
     * this.right = right;
     * }
     * }
     */
    class Solution {
        public List<Integer> postorderTraversal(TreeNode root) {

            List<Integer> res = new ArrayList<>();
            if (root == null) return res;
            Deque<TreeNode> stack = new LinkedList<>();
            Deque<Integer> status = new LinkedList<>();
            stack.push(root);
            status.push(0);

            while(!stack.isEmpty()) {
                switch (status.pop()){
                    case 0: {
                        // 左子树
                        status.push(1);
                        if (stack.peek().left != null) {
                            status.push(0);
                            stack.push(stack.peek().left);
                        }
                        break;
                    }
                    case 1: {
                        // 右子树
                        status.push(2);
                        if (stack.peek().right != null) {
                            status.push(0);
                            stack.push(stack.peek().right);
                        }
                        break;
                    }
                    case 2: {
                        // 输出跟节点
                        res.add(stack.peek().val);
                        break;
                    }
                }
            }
            return res;

        }

        public List<Integer> postorderTraversal1(TreeNode root) {
            List<Integer> result = new ArrayList<>();
            if (root == null) return result;
            Deque<TreeNode> stack = new LinkedList<>();
            Deque<Integer> status = new LinkedList<>();
            stack.push(root);
            status.push(0);
            while (!stack.isEmpty()) {
                switch (status.pop()) {
                    case 0: {
                        status.push(1);
                        if (stack.peek().left != null) {
                            stack.push(stack.peek().left);
                            status.push(0);
                        }
                        break;
                    }
                    case 1: {
                        status.push(2);
                        if (stack.peek().right != null) {
                            stack.push(stack.peek().right);
                            status.push(0);
                        }
                        break;
                    }
                    case 2: {
                        result.add(stack.pop().val);
                        break;
                    }

                }
            }
            return result;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
