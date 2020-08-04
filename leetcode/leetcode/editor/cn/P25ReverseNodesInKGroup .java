//给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。 
//
// k 是一个正整数，它的值小于或等于链表的长度。 
//
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。 
//
// 
//
// 示例： 
//
// 给你这个链表：1->2->3->4->5 
//
// 当 k = 2 时，应当返回: 2->1->4->3->5 
//
// 当 k = 3 时，应当返回: 3->2->1->4->5 
//
// 
//
// 说明： 
//
// 
// 你的算法只能使用常数的额外空间。 
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。 
// 
// Related Topics 链表 
// 👍 658 👎 0

import java.util.ArrayList;

//Java：K 个一组翻转链表
class P25ReverseNodesInKGroup{
    public static void main(String[] args) {
        Solution solution = new P25ReverseNodesInKGroup().new Solution();
        // TO TEST
        ListNode n1 = new ListNode(1);
        ListNode n2 = new ListNode(2);
        n1.next = n2;
        ListNode n3 = new ListNode(3);
        n2.next = n3;
        ListNode n4 = new ListNode(4);
        n3.next = n4;
        ListNode n5 = new ListNode(5);
        n4.next = n5;


        ListNode res = solution.reverseKGroup(n1, 2);
        System.out.println(res.val);

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
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode cur = head;
        ListNode pre = new ListNode(0);
        pre.next = head;
        ListNode node = pre;


        while(cur != null) {
            for (int i = 0; i < k - 1; i++) {
                cur = cur.next;
                if (cur == null) {
                    return node.next;
                }
            }
            // 进行反转
            ArrayList<ListNode> res = reverse(node.next, cur);
            // 连接到原来的链表上
            node.next = res.get(0);
            node = res.get(1);
        }
        return pre.next;
    }

    // 反转一个子链表
    public ArrayList<ListNode> reverse(ListNode start, ListNode end) {
        ListNode append = end.next;
        ListNode pre = end.next;
        ListNode cur = start;

        ListNode s1 = start;
        ArrayList<ListNode> res = new ArrayList<>();

        while (cur != append) {
            ListNode nextTemp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = nextTemp;
        }

        s1.next = append;
        // 反转后的开始， 反转后的结束
        res.add(pre);
        res.add(s1);
        return res;

    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
