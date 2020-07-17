//给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。 
//
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。 
//
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。 
//
// 示例： 
//
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
//输出：7 -> 0 -> 8
//原因：342 + 465 = 807
// 
// Related Topics 链表 数学 
// 👍 4608 👎 0

package leetcode.editor.cn;
//Java：两数相加
class P2AddTwoNumbers{
    public static void main(String[] args) {
        Solution solution = new P2AddTwoNumbers().new Solution();
        // TO TEST
        // 构造l1
        ListNode l1Start = new ListNode(0);
        ListNode l2Start = new ListNode(0);
        ListNode l11 = new ListNode(2);
        l1Start.next = l11;
        ListNode l12 = new ListNode(4);
        l11.next = l12;
        ListNode l13 = new ListNode(3);
        l12.next = l13;

        // 构造l2
        ListNode l21 = new ListNode(5);
        l2Start.next = l21;
        ListNode l22 = new ListNode(6);
        l21.next = l22;
        ListNode l23 = new ListNode(4);
        l22.next = l23;

        ListNode res = solution.addTwoNumbers(l1Start.next, l2Start.next);

        System.out.println(res.val);
        System.out.println(res.next.val);
        System.out.println(res.next.next.val);

        //
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */

public static class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
 }


class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode pre = new ListNode(0);
        ListNode cur = new ListNode(0);
        pre.next = cur;
        while (l1 != null && l2 != null) {
            ListNode next = new ListNode(0);
            if (cur.val + l1.val + l2.val < 10) {
                cur.val = cur.val + l1.val + l2.val;
                cur.next = next;
            } else {
                next.val = 1;
                cur.val = cur.val + l1.val + l2.val - 10;
                cur.next = next;
            }
            l1 = l1.next;
            l2 = l2.next;
            cur = next;
        }
        while(l1 != null) {
            cur.val = l1.val;
            cur = cur.next;
            l1 = l1.next;
        }
        while(l2 != null) {
            cur.val = l2.val;
            cur = cur.next;
            l2 = l2.next;
        }
        return pre.next;

    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
