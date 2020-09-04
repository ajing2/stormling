//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。 
//
// 有效字符串需满足： 
//
// 
// 左括号必须用相同类型的右括号闭合。 
// 左括号必须以正确的顺序闭合。 
// 
//
// 注意空字符串可被认为是有效字符串。 
//
// 示例 1: 
//
// 输入: "()"
//输出: true
// 
//
// 示例 2: 
//
// 输入: "()[]{}"
//输出: true
// 
//
// 示例 3: 
//
// 输入: "(]"
//输出: false
// 
//
// 示例 4: 
//
// 输入: "([)]"
//输出: false
// 
//
// 示例 5: 
//
// 输入: "{[]}"
//输出: true 
// Related Topics 栈 字符串 
// 👍 1740 👎 0

import java.util.HashMap;
import java.util.Stack;

////Java：有效的括号
class P20ValidParentheses{
    public static void main(String[] args) {
        Solution solution = new P20ValidParentheses().new Solution();
        // TO TEST
        String s = "{}";
        System.out.println(solution.isValid(s));
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isValid(String s) {
        Stack<Character> statck = new Stack<>();
        HashMap<Character, Character> mappings = new HashMap<>();
        mappings.put(']', '[');
        mappings.put('}', '{');
        mappings.put(')', '(');

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (mappings.containsKey(c)) {
                if (statck.isEmpty()) {
                    return false;
                }
                Character out = statck.pop();
                if (mappings.get(c).charValue() != out.charValue()) {
                    return false;
                }
            } else {
                statck.push(c);
            }
        }
        return statck.isEmpty();
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
