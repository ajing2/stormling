# 数组(Array)和链表(Linked List)

# 1. 什么是数组

把具有相同类型的若干元素按有序的形式组织起来的一种形式。 [1] 这些有序排列的同类数据元素的集合称为数组。

数组是用于储存多个相同类型数据的集合。

我们在申明数组的时候， 是需要定义起长度的， 所以数组在我们的内存找给你， 元素之间的内存是连续存放的

![1](1.png)

# 2. 数组增删改查的时间复杂度

数组每次删除和增加一个元素， 其后面的元素都需要跟着变动。

访问一个元素， 只要知道下标， 直接进行访问就可以了



![1](2.png)

Access: O(1)

Insert: 平均O(n)

Delete: 平均O(n)



# 3. 什么是链表？

链表是在java中， 是我们自己定义的一种数据结构， 有一个属性value， 一个next， 类似于c语言中的指针， 指向下一个链表

单链表， 就只有指向下一个指针

![1](3.png)

双向链表， 就是有头指针和尾指针

![1](4.png)

# 4. 链表相关的时间复杂度

Space: O(n)

prepend: O(1)

append: O(1)

lookup: O(n)

insert: O(1)

![1](5.png)

delete: O(1)

![1](6.png)

# 5. 练习题

## 1. 反转一个单链表。

leetcode 206题

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```



链表的核心， 就是需要有两个元素， 进行相互赋值转换，所以只有有链表的题， 你就申明好两个元素就好了。

在改变链表使用的时候， 记得在中间替换的环节， 用一个中间变量进行转换一下， 不然找不到位置了



```java
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
```



python的代码就超级简洁， 替换的时候就非常有优势（python支持多类型返回）

```python
def reverseList(self, head):
    cur, prev = head, None
    while cur:
        cur.next, prev, cur = prev, cur, cur.next
    return prev
```



## 2. 两两交换链表中节点

leetcode24题

```
示例: 
//
// 给定 1->2->3->4, 你应该返回 2->1->4->3.
```

