////反转一个单链表。
////
//// 示例:
////
//// 输入: 1->2->3->4->5->NULL
////输出: 5->4->3->2->1->NULL
////
//// 进阶:
////你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
//// Related Topics 链表
//// 👍 1126 👎 0
//
////Java：反转链表
class P206ReverseLinkedList{
    public static void main(String[] args) {
        Solution solution = new P206ReverseLinkedList().new Solution();
        // TO TEST
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
    public ListNode reverseList(ListNode head) {
        ListNode cur = head;
        ListNode out = null;

        while(cur != null) {
          // 需要先保存一下next的临时节点， 要不然用的时候找不到了。
          ListNode nextTemp = cur.next;
          cur.next = out;
          out = cur;
          cur = nextTemp;
        }
        return out;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}
