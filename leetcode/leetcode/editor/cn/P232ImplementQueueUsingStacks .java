//使用栈实现队列的下列操作： 
//
// 
// push(x) -- 将一个元素放入队列的尾部。 
// pop() -- 从队列首部移除元素。 
// peek() -- 返回队列首部的元素。 
// empty() -- 返回队列是否为空。 
// 
//
// 
//
// 示例: 
//
// MyQueue queue = new MyQueue();
//
//queue.push(1);
//queue.push(2);  
//queue.peek();  // 返回 1
//queue.pop();   // 返回 1
//queue.empty(); // 返回 false 
//
// 
//
// 说明: 
//
// 
// 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。 
// 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。 
// 
// Related Topics 栈 设计 
// 👍 207 👎 0

import java.util.Stack;

//Java：用栈实现队列
//class P232ImplementQueueUsingStacks{
//    public static void main(String[] args) {
////        MyQueue solution = new P232ImplementQueueUsingStacks().new MyQueue();
//        // TO TEST
//
//        MyQueue queue = new MyQueue();
//
//        queue.push(1);
//        queue.push(2);
//        System.out.println(queue.peek());
////        queue.peek();  // 返回 1
//        System.out.println(queue.pop());
////        queue.pop();   // 返回 1
//        System.out.println(queue.empty());
////        queue.empty(); // 返回 false
//
//    }
    //leetcode submit region begin(Prohibit modification and deletion)
class MyQueue {

    private Stack<Integer> s1;
    private Stack<Integer> s2;
    /** Initialize your data structure here. */
    public MyQueue() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }
    
    /** Push element x to the back of queue. */
    public void push(int x) {
        s1.push(x);
    }


    private void shift() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
    }
    
    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        shift();
        if (!s2.isEmpty()) {
            return s2.pop();
        }
        throw new RuntimeException("队列里没有元素");
    }
    
    /** Get the front element. */
    public int peek() {
        shift();
        if (!s2.isEmpty()) {
            return s2.peek();
        }
        throw new RuntimeException("队列里没有元素");
    }
    
    /** Returns whether the queue is empty. */
    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
//leetcode submit region end(Prohibit modification and deletion)

//}
