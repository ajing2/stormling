//设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。 
//
// 示例： 
//
// 输入： arr = [1,3,5,7,2,4,6,8], k = 4
//输出： [1,2,3,4]
// 
//
// 提示： 
//
// 
// 0 <= len(arr) <= 100000 
// 0 <= k <= min(100000, len(arr)) 
// 
// Related Topics 堆 排序 分治算法 
// 👍 60 👎 0

 
class SmallestKLcci{
  public static void main(String[] args) {
       Solution solution = new SmallestKLcci().new Solution();
       int[] arr = {1,3,5,7,2,4,6,8};
       solution.smallestK(arr, 4);
  }
class Solution {
      public int[] smallestK(int[] arr, int k) {
          int[] res = new int[k];
          if (k== 0) return res;
          quik_sort(arr, 0, arr.length - 1, k);
          for (int i = 0; i < k; i++) {
              res[i] = arr[i];
          }
          return res;
      }


      private void quik_sort(int[] arr, int l, int r, int k) {
          if (l > r) return;
          int x = l, y = r, base = getMid(arr[l], arr[r], arr[(l + r) / 2]);
          System.out.println("l = " + l + " r = " + r + " base = " + base + " k=" + k);
          while (x <= y) {
              while (y >=x && arr[y] > base) y--;
              while (x <= y && arr[x] < base) x++;
              if (x <= y) {
                  swap(arr, x, y);
                  x++;
                  y--;
              }
          }
          if (x - l == k - 1) {
              return;
          } else if (x - l > k - 1) {
              quik_sort(arr, l, x, k);
          } else {
              quik_sort(arr, x, r, k - x + l);
          }

      }


      private int getMid(int a, int b, int c) {
          int max = Math.max(a, Math.max(b, c));
          int min = Math.min(a, Math.min(b, c));
          if (a != max && a != min) return a;
          if (b != max && b != min) return b;
          return c;
      }

      private void swap(int[] arr, int x, int y) {
          int tmp = arr[x];
          arr[x] = arr[y];
          arr[y] = tmp;
      }
}

}