//package com.ajing;
//
///**
// * @ClassName Test
// * @Description TODO
// * @Author lingxiangxiang
// * @Date 10:42 下午
// * @Version 1.0
// **/
//
//import java.util.ArrayList;
//import java.util.Deque;
//import java.util.LinkedList;
//import java.util.List;
//
///**
// * Definition for a binary tree node.
// * public class TreeNode {
// *     int val;
// *     TreeNode left;
// *     TreeNode right;
// *     TreeNode() {}
// *     TreeNode(int val) { this.val = val; }
// *     TreeNode(int val, TreeNode left, TreeNode right) {
// *         this.val = val;
// *         this.left = left;
// *         this.right = right;
// *     }
// * }
// */
//public class Test {
//    public List<Integer> postorderTraversal(TreeNode root) {
//        List<Integer> res = new ArrayList<>();
//        if (root == null) {return res;}
//        Deque<Integer> status = new LinkedList<>();
//        Deque<TreeNode> stack = new LinkedList<>();
//        stack.push(root);
//        status.push(0);
//
//        while(!stack.isEmpty()) {
//            switch (status.pop()){
//                case 0: {
//                    // 左子树
//                    status.push(1);
//                    if (stack.peek().left != null) {
//                        status.push(1);
//                        stack.push(stack.peek().left);
//                    }
//                    break;
//                }
//                case 1: {
//                    // 右子树
//                    status.push(2);
//                    if (stack.peek().right != null) {
//                        status.push(0);
//                        stack.push(stack.peek().right);
//                    }
//                    break;
//                }
//                case 2: {
//                    // 输出跟节点
//                    res.add(stack.peek().val);
//                    break;
//                }
//            }
//        }
//        return res;
//
//    }
//}