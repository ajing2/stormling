//给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，找出所有同时在二维网格和字典中出现的单词。 
//
// 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使
//用。 
//
// 
//
// 示例 1： 
//
// 
//输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l"
//,"v"]], words = ["oath","pea","eat","rain"]
//输出：["eat","oath"]
//
//
// 示例 2：
//
//
//输入：board = [["a","b"],["c","d"]], words = ["abcb"]
//输出：[]
//
//
//
//
// 提示：
//
//
// m == board.length
// n == board[i].length
// 1 <= m, n <= 12
// board[i][j] 是一个小写英文字母
// 1 <= words.length <= 3 * 104
// 1 <= words[i].length <= 10
// words[i] 由小写英文字母组成
// words 中的所有字符串互不相同
//
// Related Topics 字典树 回溯算法
// 👍 299 👎 0

import sun.text.normalizer.Trie;

import java.util.*;


//Java：单词搜索 II
class P212WordSearchIi{

    Set<String> res = new HashSet<>();

    public static void main(String[] args) {
        Solution solution = new P212WordSearchIi().new Solution();
        char[][] board = new char[][]{{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};
        String[] words = new String[]{"oath","pea","eat","rain"};
        System.out.println(solution.findWords(board, words));
        // TO TEST
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    class TrieNode {
        HashMap<Character, TrieNode> children = new HashMap<>();
        String word = null;
        public TrieNode() {}
    }

class Solution {

    char[][] _board = null;
    ArrayList<String> res = new ArrayList<>();

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        // 初始化我们的字符串
        for (String word : words) {
            TrieNode node = root;
            for (Character letter : word.toCharArray()) {
                // 对于有一样开头的分支， 直接取该分支， 不必创建
                if (node.children.containsKey(letter)) {
                    node = node.children.get(letter);
                } else {
                    // 第一个单词的所有分支， 都需要去新建
                    TrieNode newNode = new TrieNode();
                    node.children.put(letter, newNode);
                    node = newNode;
                }
            }
            // 最后结尾的单词， 记录这个单词
            node.word = word;
        }
        this._board = board;
        // 递归去遍历所有的可能情况
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col <board[row].length; col++) {
                if (root.children.containsKey(board[row][col])) {
                    dfs(row, col, root);
                }
            }
        }


        return this.res;
    }

    private void dfs(int row, int col, TrieNode parent) {
        Character letter = this._board[row][col];
        TrieNode currNode = parent.children.get(letter);
        // 递归结束条件
        if (currNode.word != null) {
            this.res.add(currNode.word);
            currNode.word = null;
        }
        // 预处理数据, 不能走回路
        this._board[row][col] = '#';
        int[] rowOffset = {-1, 0, 1, 0};
        int[] colOffset = {0, 1, 0, -1};
        for (int i = 0; i<4; i++) {
            int newRow = row + rowOffset[i];
            int newCol = col + colOffset[i];
            if (newRow < 0 || newRow >= this._board.length || newCol < 0 || newCol >= this._board[0].length) {
                continue;
            }
            if (currNode.children.containsKey(this._board[newRow][newCol])) {
                dfs(newRow, newCol, currNode);
            }
        }
        // 进行下一次递归
        this._board[row][col] = letter;

        // 删除叶子节点
        if (currNode.children.isEmpty()) {
            parent.children.remove(letter);
        }

    }
}



//leetcode submit region end(Prohibit modification and deletion)

}



