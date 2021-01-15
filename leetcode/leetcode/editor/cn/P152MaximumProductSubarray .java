//给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。 
//
// 
//
// 示例 1: 
//
// 输入: [2,3,-2,4]
//输出: 6
//解释: 子数组 [2,3] 有最大乘积 6。
// 
//
// 示例 2: 
//
// 输入: [-2,0,-1]
//输出: 0
//解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。 
// Related Topics 数组 动态规划 
// 👍 884 👎 0

//Java：乘积最大子数组
class P152MaximumProductSubarray{
    public static void main(String[] args) {
        Solution solution = new P152MaximumProductSubarray().new Solution();
        solution.maxProduct(new int[]{2, 3, -2, 4});
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int maxProduct(int[] nums) {
        if (nums.length <= 0) {
            return 0;
        }
        int max, min;
        int res = nums[0];
        int curMax = nums[0];
        int curMin = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curMax = curMax * nums[i];
            curMin = curMin * nums[i];
            max = curMax;
            min = curMin;
            // 中间在变量转换的时候， 需要一个中间变量， 否则是错误的
            curMax = Math.max(Math.max(max, min), nums[i]);
            curMin = Math.min(Math.min(min, nums[i]), max);
            res = Math.max(curMax, res);
        }
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
