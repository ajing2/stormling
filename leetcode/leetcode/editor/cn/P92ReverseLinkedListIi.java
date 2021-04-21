//反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。 
//
// 说明: 
//1 ≤ m ≤ n ≤ 链表长度。 
//
// 示例: 
//
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
//输出: 1->4->3->2->5->NULL 
// Related Topics 链表 
// 👍 708 👎 0

 
class ReverseLinkedListIi{
  public static void main(String[] args) {
       Solution solution = new ReverseLinkedListIi().new Solution();
       ListNode l1 = new ListNode(1);
       l1.next = new ListNode(2);
       l1.next.next = new ListNode(3);
       l1.next.next.next = new ListNode(4);
       l1.next.next.next.next = new ListNode(5);
       solution.reverseBetween(l1, 2, 4);
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
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode pre = new ListNode(0, head), res = pre;

        int n = right - left + 1;
        while (left-- > 1) {
            pre = pre.next;
        }
        pre.next = reverse(pre.next, n);
        return res.next;

    }

    private ListNode reverse(ListNode head, int n) {
        ListNode pre = new ListNode(0, head);
        ListNode res = pre;
        ListNode cur = head;
        ListNode tmp;
        while (n-- > 0) {
            tmp = head.next;
            head.next = pre;
            pre = head;
            head = tmp;
        }
        cur.next = head;
        return pre;

    }
}
//leetcode submit region end(Prohibit modification and deletion)

}