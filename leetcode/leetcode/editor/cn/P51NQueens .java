////n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
////
////
////
//// 上图为 8 皇后问题的一种解法。
////
//// 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
////
//// 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
////
////
////
//// 示例：
////
//// 输入：4
////输出：[
//// [".Q..",  // 解法 1
////  "...Q",
////  "Q...",
////  "..Q."],
////
//// ["..Q.",  // 解法 2
////  "Q...",
////  "...Q",
////  ".Q.."]
////]
////解释: 4 皇后问题存在两个不同的解法。
////
////
////
////
//// 提示：
////
////
//// 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
////
//// Related Topics 回溯算法
//// 👍 702 👎 0
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
////Java：N 皇后
//class P51NQueens{
//    public static void main(String[] args) {
//        Solution solution = new P51NQueens().new Solution();
//        // TO TEST
//    }
//    //leetcode submit region begin(Prohibit modification and deletion)
//class Solution {
//
//        Set<Integer> clos;
//        Set<Integer> pie;
//        Set<Integer> na;
//        List<int[][]> res;
//        int[][] cur;
//
//        Solution() {
//            clos = new HashSet<>();
//            pie = new HashSet<>();
//            na = new HashSet<>();
//            res = new ArrayList<>();
//
//        }
//    public List<List<String>> solveNQueens(int n) {
//        List<List<String>> res = new ArrayList<>();
//        if (n < 1) {
//            return res;
//        }
//        int[][] cur = new int[n][n];
//        DFS(n, 0, cur);
//        return res;
//    }
//
//    private void DFS(Integer n, Integer row, int[][] cur) {
//        if (row >= n) {
//            res.add(cur);
//            cur = new int[n][n];
//            return;
//        }
//        for (int i = 0; i < n; i++) {
//            cur = new int[n][n];
//            if (clos.contains(i) || pie.contains(row + i) || na.contains(row - i)) {
//                continue;
//            }
//            clos.add(i);
//            pie.add(row + i);
//            na.add(row - i);
//            cur[row][i] = 1;
//            DFS(n, row + 1, );
//        }
//    }
//}
////leetcode submit region end(Prohibit modification and deletion)
//
//}
