import java.util.HashMap;

public class TargetBlock {
    public static void main(String[] args) {
         String target = "ab";
         String block = "dabab";
        int res = 0;
        int i = 0;
        int j = 0;
        while (j < block.length()) {
            if (target.charAt(i) == block.charAt(j)) {
                i++;
                j++;
            } else {
                j++;
            }
            if (i == target.length()) {
                res += 1;
                i = 0;
            }
        }
        System.out.println(res);
    }

//    private static int numTargets(String target, String block) {
//        int res = 0;
//        int i = 0;
//        int j = 0;
//        while (j <= block.length()) {
//            if (target.charAt(i) == block.charAt(j)) {
//                i++;
//                j++;
//            } else {
//                j++;
//            }
//            if (i == target.length()) {
//                res += 1;
//                i = 0;
//            }
//        }
//        return res;
//
//    }​​



}
