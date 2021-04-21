//给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。 
//
// 示例 1: 
//
// 输入: 1->2->3->4->5->NULL, k = 2
//输出: 4->5->1->2->3->NULL
//解释:
//向右旋转 1 步: 5->1->2->3->4->NULL
//向右旋转 2 步: 4->5->1->2->3->NULL
// 
//
// 示例 2: 
//
// 输入: 0->1->2->NULL, k = 4
//输出: 2->0->1->NULL
//解释:
//向右旋转 1 步: 2->0->1->NULL
//向右旋转 2 步: 1->2->0->NULL
//向右旋转 3 步: 0->1->2->NULL
//向右旋转 4 步: 2->0->1->NULL 
// Related Topics 链表 双指针 
// 👍 434 👎 0

 
class RotateList{
  public static void main(String[] args) {
       Solution solution = new RotateList().new Solution();
       ListNode l1 = new ListNode(1);
       l1.next = new ListNode(2);
       l1.next.next = new ListNode(3);
       solution.rotateRight(l1, 2);
  }
  //leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (null == head || head.next == null) {
            return head;
        }
        ListNode pre = head;
        ListNode start = new ListNode(0);
        int n = 1;
        int initk = k;
        start.next = head;
        while (k > 0 && head.next != null) {
            head = head.next;
            k--;
            n++;
        }
        if (null == head.next) {
            if (k != 0) {
                k = initk % n;
                head = start.next;
                while (k-- > 0 && head.next != null) {
                    head = head.next;
                }
            } else {
                head.next = start.next;
                ListNode res = pre.next;
                pre.next = null;
                return res;
            }
        }
        while (null != head.next) {
            pre = pre.next;
            head = head.next;
        }
        head.next = start.next;
        ListNode res = pre.next;
        pre.next  = null;
        return res;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}