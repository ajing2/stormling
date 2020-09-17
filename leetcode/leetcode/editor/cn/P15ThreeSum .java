//给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复
//的三元组。 
//
// 注意：答案中不可以包含重复的三元组。 
//
// 
//
// 示例： 
//
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
//满足要求的三元组集合为：
//[
//  [-1, 0, 1],
//  [-1, -1, 2]
//]
// 
// Related Topics 数组 双指针 
// 👍 2584 👎 0

import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;

import java.util.*;

//Java：三数之和
//class P15ThreeSum{
//    public static void main(String[] args) {
//        Solution solution = new P15ThreeSum().new Solution();
//        // TO TEST
//        List<Integer> a = new ArrayList<>();
//        a.add(1);
//        a.add(2);
//        a.add(3);
//
//        List<Integer> b = new ArrayList<>();
//        b.add(3);
//        b.add(2);
//        b.add(1);
//
//        System.out.println(a.equals(b));
//    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {

    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        if (nums == null && nums.length < 3) {
            return res;
        }
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int L = i + 1;
            int R = nums.length - 1;
            while (L < R) {
                int sum = nums[i] + nums[L] + nums[R];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[L], nums[R]));
                    // 去重
                    while (L < R && nums[L] == nums[L + 1]) {
                        L++;
                    }
                    // 去重
                    while (L < R && nums[R] == nums[R - 1]) {
                        R--;
                    }
                    L++;
                    R--;
                } else if (sum > 0) {
                    R--;
                } else {
                    L++;
                }

            }
        }

        return res;

    }

//    public List<List<Integer>> threeSum1(int[] nums) {
//        Arrays.sort(nums);
//        Set<List<Integer>> res = new HashSet<>();
//        for (int i = 0; i < nums.length; i++) {
//            if (nums[i] > 0) {
//                break;
//            }
//            HashMap<Integer, Integer>map = new HashMap<>();
//            for (int j = i + 1; j < nums.length; j++) {
//                // a + b + c = 0, 则 b + c = -a, -nums[i]就是-a
//                if (map.containsKey(-nums[i] - nums[j])) {
//                    List<Integer> tmp = new ArrayList<>();
//                    tmp.add(nums[i]);
//                    tmp.add(nums[j]);
//                    tmp.add(-nums[i] - nums[j]);
//                    res.add(tmp);
//                } else {
//                    map.put(nums[j], j);
//                }
//            }
//        }
//        return new ArrayList<>(res);
//    }
}
//leetcode submit region end(Prohibit modification and deletion)

//}
