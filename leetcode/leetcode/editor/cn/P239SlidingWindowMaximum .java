//给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。 
//
//
// 返回滑动窗口中的最大值。 
//
// 
//
// 进阶： 
//
// 你能在线性时间复杂度内解决此题吗？ 
//
// 
//
// 示例: 
//
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
//输出: [3,3,5,5,6,7] 
//解释: 
//
//  滑动窗口的位置                最大值
//---------------               -----
//[1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 10^5 
// -10^4 <= nums[i] <= 10^4 
// 1 <= k <= nums.length 
// 
// Related Topics 堆 Sliding Window 
// 👍 537 👎 0

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;

//Java：滑动窗口最大值
class P239SlidingWindowMaximum{
    public static void main(String[] args) {
        Solution solution = new P239SlidingWindowMaximum().new Solution();
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> queue = new ArrayDeque<>();
        int n = nums.length;
        if (n == 0) {
            return nums;
        }
        int[] result = new int[n - k + 1];
        for (int i = 0; i < n; i++) {
            // 先把左边过界的元素删除掉
            if (i >= k) {
                if (queue.peekFirst() == nums[i - k]) {
                    queue.pollFirst();
                }
            }
            // 然后把比新加元素小的头元素全部删除, 一定要从队尾开始， 因为队首一定是最大元素
            while (!queue.isEmpty() && nums[i] > queue.getLast()) {
                queue.pollLast();
            }

            // 最后把右边的元素加入进来
            queue.add(nums[i]);

            // 每次边界操作， 都需要输出一个结果
            if (i - k + 1 >= 0) {
                result[i - k + 1] = queue.getFirst();
            }
        }
        return result;

    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
