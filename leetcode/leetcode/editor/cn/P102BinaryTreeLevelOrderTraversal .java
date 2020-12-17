//给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。 
//
// 
//
// 示例： 
//二叉树：[3,9,20,null,null,15,7], 
//
//     3
//   / \
//  9  20
//    /  \
//   15   7
// 
//
// 返回其层次遍历结果： 
//
// [
//  [3],
//  [9,20],
//  [15,7]
//]
// 
// Related Topics 树 广度优先搜索 
// 👍 721 👎 0


import java.util.*;

//Java：二叉树的层序遍历
class P102BinaryTreeLevelOrderTraversal{
    public static void main(String[] args) {
        Solution solution = new P102BinaryTreeLevelOrderTraversal().new Solution();

        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */


class Solution {


    List<List<Integer>> resDFS;

    Solution() {
        resDFS = new ArrayList<>();
    }

    // 广度搜索
    public List<List<Integer>> levelOrderBFS(TreeNode root) {


        List<List<Integer>> res = new ArrayList<>();
        if (null == root) {
            return res;
        }
        // 在图的角度上， 是为了避免循环
        HashSet visited = new HashSet();

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            int currentLevelSize = queue.size();
            for (int i = 0; i < currentLevelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (null != node.left) {
                    queue.offer(node.left);
                }
                if (null != node.right) {
                    queue.offer(node.right);
                }
            }
            res.add(level);

        }
        return res;

    }


    // 深度搜索
    public List<List<Integer>> levelOrderDFS(TreeNode root) {

        if (null == root) {
            return this.resDFS;
        }
        dfs(root, 0);
        return this.resDFS;
    }

    private void dfs(TreeNode node, Integer level) {
        // 退出的条件
        if (null == node) {
            return;
        }
        if (this.resDFS.size() < level + 1) {
            List<Integer> newLevel = new ArrayList<>();
            this.resDFS.add(newLevel);
        }
        this.resDFS.get(level).add(node.val);
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);


    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
