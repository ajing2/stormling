//给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。 
//
// 示例 1: 
//
// 输入: "abcabcbb"
//输出: 3 
//解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 
//
// 示例 2: 
//
// 输入: "bbbbb"
//输出: 1
//解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 
//
// 示例 3: 
//
// 输入: "pwwkew"
//输出: 3
//解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 
// Related Topics 哈希表 双指针 字符串 Sliding Window 
// 👍 3983 👎 0

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

//Java：无重复字符的最长子串
class P3LongestSubstringWithoutRepeatingCharacters{
    public static void main(String[] args) {
        Solution solution = new P3LongestSubstringWithoutRepeatingCharacters().new Solution();
        // TO TEST
        String s1 = "pwwkew";
        String s2 = "bbbbbb";
        String s3 = "abcabcbb";
        System.out.println(solution.lengthOfLongestSubstring(s1));
        System.out.println(solution.lengthOfLongestSubstring(s2));
        System.out.println(solution.lengthOfLongestSubstring(s3));
        System.out.println(solution.lengthOfLongestSubstring(" "));
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
        /**
         * 思路分析
         * 两个循环， 一个是开始位置， 一个是结束位置
         * 如果结束位置出现重复的字符， 就停止扫描
         * 开始位置， 进入第二次
         *
         * 优化， 其实当出现重复字符串的额时候， 开始位置并不需要从开始位置+1的位置开始， 直接从重复字母的下标+1的位置开始就可以了，因为前面的都是一定有重复的
         * 所有就要用hashMap来记录， key为字母，value为下标
         *
         * @param s
         * @return
         */
    public int lengthOfLongestSubstring(String s) {
        // 参数判断
        if (s.length() == 0) {
            return 0;
        }
        Integer res = 0;
        HashMap<Object, Integer> map = new HashMap<>();
        for (int start = 0, end = 0; end<s.length(); end++){
            if (map.get(s.charAt(end)) == null) {
                map.put(s.charAt(end), end);
            } else {
                //  直接把start移动到重复字母出现的第一个字符串
                int newStart = map.get(s.charAt(end));
                while (start <= newStart) {
                    map.remove(s.charAt(start));
                    start ++;
                }
                map.put(s.charAt(end), end);
            }
            res = Math.max(res, map.keySet().size());
        }
        return res;
    }

    public int lengthOfLongestSubstring2(String s) {
        // 哈希集合，记录每个字符是否出现过
        Set<Character> occ = new HashSet<Character>();

        int n = s.length();
        // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
        int rk = -1, ans = 0;
        for (int i = 0; i < n; ++i) {
            if (i != 0) {
                // 左指针向右移动一格，移除一个字符
                occ.remove(s.charAt(i - 1));
            }
            while (rk + 1 < n && !occ.contains(s.charAt(rk + 1))) {
                // 不断地移动右指针
                occ.add(s.charAt(rk + 1));
                ++rk;
            }
            // 第 i 到 rk 个字符是一个极长的无重复字符子串
            ans = Math.max(ans, rk - i + 1);
        }
        return ans;
    }

}
//leetcode submit region end(Prohibit modification and deletion)

}
