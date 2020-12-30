//给定一个二叉树，找出其最大深度。 
//
// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。 
//
// 说明: 叶子节点是指没有子节点的节点。 
//
// 示例： 
//给定二叉树 [3,9,20,null,null,15,7]， 
//
//     3
//   / \
//  9  20
//    /  \
//   15   7 
//
// 返回它的最大深度 3 。 
// Related Topics 树 深度优先搜索 递归 
// 👍 758 👎 0

import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;
import com.sun.org.apache.bcel.internal.generic.NOP;

//Java：二叉树的最大深度
class P104MaximumDepthOfBinaryTree{
    public static void main(String[] args) {
        Solution solution = new P104MaximumDepthOfBinaryTree().new Solution();
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    int resDFS = 0;

    public int maxDepth(TreeNode root) {
        if (null == root) {
            return 0;
        }
        resDFS++;
        DFS(root, 1);
        return resDFS;
    }
    private void DFS(TreeNode node, Integer level) {
        if (null == node) {
            return;
        }

        if (null != node.left) {
            DFS(node.left, level + 1);
        }
        if (null != node.right) {
            DFS(node.right, level + 1);
        }
        resDFS = Math.max(resDFS, level);
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
