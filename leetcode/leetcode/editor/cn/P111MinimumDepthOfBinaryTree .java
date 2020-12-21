//给定一个二叉树，找出其最小深度。 
//
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。 
//
// 说明：叶子节点是指没有子节点的节点。 
//
// 
//
// 示例 1： 
//
// 
//输入：root = [3,9,20,null,null,15,7]
//输出：2
// 
//
// 示例 2： 
//
// 
//输入：root = [2,null,3,null,4,null,5,null,6]
//输出：5
// 
//
// 
//
// 提示： 
//
// 
// 树中节点数的范围在 [0, 105] 内 
// -1000 <= Node.val <= 1000 
// 
// Related Topics 树 深度优先搜索 广度优先搜索 
// 👍 422 👎 0

import java.util.Map;

//Java：二叉树的最小深度
class P111MinimumDepthOfBinaryTree{
    public static void main(String[] args) {
        Solution solution = new P111MinimumDepthOfBinaryTree().new Solution();
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
    public int minDepth(TreeNode root) {
        if (null == root) {
            return 0;
        }
        resDFS = Integer.MAX_VALUE;
        DFS(root, 1);
        return resDFS;
    }
    private void DFS(TreeNode node, Integer level) {
        if (null == node) {
            return ;
        }

        if (null != node.left) {
            DFS(node.left, level + 1);
        }
        if (null != node.right) {
            DFS(node.right, level + 1);
        }
        if (null == node.left && null == node.right) {
            resDFS = Math.min(level, resDFS);
        }
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
