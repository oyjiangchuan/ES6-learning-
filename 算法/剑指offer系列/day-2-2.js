// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *   this.val = val
 *   this.next = null
 * }
 */

//  1. 保存当前节点的 next 链
//  next 值变化
//  2->3->4->5->null
//  3->4->5->null
//  4->5->null
//  5->null
//  null

//  2. 当前节点 next 置为 pre
//  1->null
//  2->1->null
//  3->2->1->null
//  4->3->2->1->null
//  5->4->3->2->1->null

//  3. pre 赋值顺序同2

//  4. cur 赋值顺序同1

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
	let pre = null
	let cur = head
	while (cur) {
		const next = cur.next
		cur.next = pre
		pre = cur
		cur = next
	}
	return pre
}
