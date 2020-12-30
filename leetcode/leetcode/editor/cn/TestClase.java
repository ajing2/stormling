import java.util.*;
import java.util.stream.Collectors;

public class TestClase {
    public static void main(String[] args) {
        String s1 = "10.231.129.179";
        String s2 = "10.231.129.181";
        String s3 = "10.231.133.242";
        String s4 = "10.231.133.239";

        LinkedHashMap<String, Integer> hm = new LinkedHashMap<>();
        hm.put(s4, 4);
        hm.put(s1, 1);
        hm.put(s2, 2);
        hm.put(s3, 3);
        System.out.println(hm);
    }



}
