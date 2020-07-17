### 解题思路
此处撰写解题思路
我利用多层循环遍历达到从第一个数开始和后面每个数循环相加，然后对于y值的起始做了改动，只要是使用过的i值就不再使用达到每个数之加一次不会重复计算
### 代码

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] a = new int[2];
       for(int i = 0;i<nums.length;i++){
           for(int y = (i+1);y<nums.length;y++){
               if(target == (nums[i]+nums[y])){
                   a[0]=i;
                   a[1]=y;
               }
           }
       }
        
        return a;
    }
}
```