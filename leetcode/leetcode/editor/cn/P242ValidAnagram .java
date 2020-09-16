//给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。 
//
// 示例 1: 
//
// 输入: s = "anagram", t = "nagaram"
//输出: true
// 
//
// 示例 2: 
//
// 输入: s = "rat", t = "car"
//输出: false 
//
// 说明: 
//你可以假设字符串只包含小写字母。 
//
// 进阶: 
//如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？ 
// Related Topics 排序 哈希表 
// 👍 249 👎 0

import java.util.HashMap;
import java.util.Map;

//Java：有效的字母异位词
class P242ValidAnagram{
    public static void main(String[] args) {
        Solution solution = new P242ValidAnagram().new Solution();
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.equals(t)) {
            return true;
        }
        if (s == null || t == null || s.length() != t.length()) {
            return false;
        }
        HashMap<Character, Integer> map1 = new HashMap();
//        HashMap<Character, Integer> map2 = new HashMap();
        for (int i = 0; i < s.length(); i++) {
            map1.put(s.charAt(i), map1.getOrDefault(s.charAt(i), 0) + 1);
            map1.put(t.charAt(i), map1.getOrDefault(t.charAt(i), 0) - 1);
        }

        for (Integer item: map1.values()) {
            if (0 != item) {
                return false;
            }
        }
        return true;

    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
