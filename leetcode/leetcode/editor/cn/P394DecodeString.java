//给定一个经过编码的字符串，返回它解码后的字符串。 
//
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。 
//
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。 
//
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。 
//
// 
//
// 示例 1： 
//
// 输入：s = "3[a]2[bc]"
//输出："aaabcbc"
// 
//
// 示例 2： 
//
// 输入：s = "3[a2[c]]"
//输出："accaccacc"
// 
//
// 示例 3： 
//
// 输入：s = "2[abc]3[cd]ef"
//输出："abcabccdcdcdef"
// 
//
// 示例 4： 
//
// 输入：s = "abc3[cd]xyz"
//输出："abccdcdcdxyz"
// 
// Related Topics 栈 深度优先搜索 
// 👍 757 👎 0


import java.util.Deque;
import java.util.LinkedList;

class DecodeString{
  public static void main(String[] args) {

      Solution solution = new DecodeString().new Solution();
//      System.out.println(solution.decodeString("3[a]2[bc]"));
      System.out.println(solution.decodeString("3[a2[c]]"));
  }

class Solution {
    public String decodeString(String s) {
        String res = "";
        Deque<Character> stack = new LinkedList<>();
        for (int i = 0; i< s.length(); i++) {
            if (s.charAt(i) == ']') {
                String item = "";
                // 先取出来括号内的内容
                System.out.println(stack.peek());
                while (stack.peek() != '[') {
                    item = stack.pop() + item;
                }
                // 这个时候正好是【
                if (stack.peek() == '[') {
                    stack.pop();
                }
                System.out.println("res = " + res);
                // 计算数字， 数字可能会是多位数
                int nums = 0;
                System.out.println("stack.peek nums = " + stack.peek());
                int xy = 0;
                while (stack.peek() != null && stack.peek() >= '0' && stack.peek() <= '9') {
                    nums = (int) ((stack.pop() - '0') * Math.pow(10, xy) + nums);
                    xy++;
                }
                System.out.println("nums = " + nums);
                // 根据数字进行次数拼接
                for (int a = 0; a < nums; a++) {
                    res = res + item;
                }
                for (int b = 0; b < res.length(); b++) {
                    stack.push(res.charAt(b));
                }
            } else {
                stack.push(s.charAt(i));
            }

        }
        return res;
    }
}

}