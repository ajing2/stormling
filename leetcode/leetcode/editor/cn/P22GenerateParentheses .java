//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。 
//
// 
//
// 示例： 
//
// 输入：n = 3
//输出：[
//       "((()))",
//       "(()())",
//       "(())()",
//       "()(())",
//       "()()()"
//     ]
// 
// Related Topics 字符串 回溯算法 
// 👍 1486 👎 0

import java.util.ArrayList;
import java.util.List;

//Java：括号生成
class P22GenerateParentheses{
    public static void main(String[] args) {
        Solution solution = new P22GenerateParentheses().new Solution();
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public List<String> generateParenthesis(int n) {
        ArrayList<String> res = new ArrayList<>();
        int left = n;
        int right = n;
        gen(res, "", left, right);
        return res;
    }

    private void gen(List<String> res, String subList, int left, int right) {
        // 递归的终止条件
        if (0 == left && 0 == right) {
            res.add(subList);
            return;
        }
        if (left > 0) {
            gen(res, subList + "(", left - 1, right);
        }
        if (right > left) {
            gen(res, subList + ")", left, right - 1);
        }
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
