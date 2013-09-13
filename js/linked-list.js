/**
 * LinkedList, implementation of an abstract list as a double linked list.
 *
 * @license data-structures
 * (c) Robert Ödling https://github.com/robertodling/data-structures
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// 'LinkedList' will be added to global scope.
var LinkedList = (function () {

	'use strict';


	/**
	 * ----------
	 * Node
	 * ----------
	 *
	 * Node represents a node in a linked list.
	 * It contain pointers to previous and next node in list and stores an element.
	 *
	 */


	/**
	 * Initialize with element.
	 * @param {object} element
	 * @constructor
	 */
	var Node = function (element) {
		this.element = element;
	};

	var nodeProto = Node.prototype;	// shorthand

	/**
	 * Returns node at specified number of steps after this node.
	 * @param {number} steps
	 * @return {object} node
	 */
	nodeProto.nodeAfter = function (steps) {

		var i = 0;
		var node = this;

		while (node.next && i < steps) {
			node = node.next;
			i++;
		}

		return node;
	};

	/**
	 * Inserts specified node after this node.
	 * @param {object} list
	 * @param {object} node
	 */
	nodeProto.insertAfter = function (list, node) {

		node.prev = this;
		node.next = this.next;

		if (!this.next) {
			list.tail = node;
		} else {
			this.next.prev = node;
		}
		this.next = node;
	};

	/**
	 * Inserts specified node before this node.
	 * @param {object} list
	 * @param {object} node
	 */
	nodeProto.insertBefore = function (list, node) {

		node.prev = this.prev;
		node.next = this;

		if (!this.prev) {
			list.head = node;
		} else {
			this.prev.next = node;
		}

		this.prev = node;
	};

	/**
	 * Removes this node from list.
	 * @param {object} list
	 */
	nodeProto.remove = function (list) {

		if (!this.prev) {
			list.head = this.next;
		} else {
			this.prev.next = this.next;
		}

		if (!this.next) {
			list.tail = this.prev;
		} else {
			this.next.prev = this.prev;
		}
	};


	/**
	 * ----------
	 * LinkedList
	 * ----------
	 */


	/**
	 * Initialize list.
	 * @constructor
	 */
	var LinkedList = function () {
		this.clear();	// set head and tail to null;
	};

	var proto = LinkedList.prototype;	// shorthand

	/**
	 * Clears list
	 */
	proto.clear = function () {
		this.head = this.tail = null;
	};

	/**
	 * Returns number of elements in list.
	 * @param {number}
	 */
	proto.size = function () {

		if (!this.head) {
			return 0;
		}

		var size = 1;
		var node = this.head;
		while (node.next) {
			node = node.next;
			size++;
		}

		return size;
	};

	/**
	 * Insert specified element first in list, will increment index of all other elements.
	 * @param {object} element
	 */
	proto.insertFirst = function (element) {

		var newNode = new Node(element);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.head.insertBefore(this, newNode);
		}
	};

	/**
	 * Insert specified element last in list, will _NOT_ increment index of any elements.
	 * @param {object} element
	 */
	proto.insertLast = function (element) {

		var node = new Node(element);

		if (!this.tail) {
			this.insertFirst(element)
		} else {
			this.tail.insertAfter(this, node);
		}

	};

	/**
	 * Insert specified element at specified index, will increment index of all following elements.
	 * @param {number} index
	 * @param {object} element
	 */
	proto.insertAt = function (index, element) {

		var newNode = new Node(element);
		var node = this.head.nodeAfter(index);

		if (!node) {
			this.insertLast(element)
		} else {
			node.insertBefore(this, newNode);
		}

	};

	/**
	 * Returns element at specified index.
	 * @param {number} index
	 * @return {object}
	 */
	proto.elementAt = function (index) {
		var node = this.head.nodeAfter(index);
		return node.element;
	};


	/**
	 * Remove first element.
	 */
	proto.removeFirst = function () {
		this.head.remove(this);
	};


	/**
	 * Remove last element.
	 */
	proto.removeLast = function () {
		this.tail.remove(this);
	};

	/**
	 * Remove element at specified index.
	 * @param {number} index
	 */
	proto.removeAt = function (index) {
		var node = this.head.nodeAfter(index);
		node.remove(this);
	};

	// export LinkedList constructor
	return LinkedList;
})();