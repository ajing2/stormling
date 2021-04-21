#pragma once

#include <algorithm>
#include <cassert>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <deque>
#include <functional>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <list>
#include <map>
#include <numeric>
#include <queue>
#include <random>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

using namespace std;

// ----- ----- ----- ----- ----- ----- ----- -----
// ADTs provided by LeetCode
// ----- ----- ----- ----- ----- ----- ----- -----

struct ListNode
{
  int val;
  ListNode *next;

  explicit ListNode() : val(0), next(nullptr) {}
  explicit ListNode(int x) : val(x), next(nullptr) {}
  explicit ListNode(int x, ListNode *next) : val(x), next(next) {}
};

struct TreeNode
{
  int val;
  TreeNode *left;
  TreeNode *right;

  explicit TreeNode() : val(0), left(nullptr), right(nullptr) {}
  explicit TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  explicit TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
