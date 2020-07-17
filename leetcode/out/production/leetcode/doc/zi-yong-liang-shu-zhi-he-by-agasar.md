这道题最容易想到的是暴力，O(n^2)的时间复杂度去遍历每个元素的加的组合来找到所需元素
但是可以这样思考我们所需要查找元素为两个和为9的元素。
**假设我们进行线性遍历，遍历一次元素a同时将其9-a和a的下标保存起来为记录表，这样我们在后续查找元素的时候和
我们所构造的记录表进行比较，如果存在则查找完毕。**
*（如果相应时间复杂度进一步降低，则记录表使用Map存储是最划算的，其可以将查找的这个操作复杂度近似为O(1)，极端情况会需要解决哈希矛盾时会退化为O(n)，这样算法时间复杂度呦退化为O(n^2)，不过概率非常小，毕竟时间换空间）*
代码如下：
```
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] res=new int[2];
        Map<Integer,Integer> map=new HashMap<>();//记录所需差值元素和用来相减元素的下标
        for(int i=0;i<nums.length;i++){
            if(map.containsKey(nums[i])){//找到一组
                res[0]=map.get(nums[i]);
                res[1]=i;
                break;
            }else
                map.put(target-nums[i],i);//添加所需查找记录
        }
        return res;
    }
}
```


