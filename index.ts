'use strict';
import axios from 'axios';

// PROBLEM 1
function checkIfBracketsWithinStringAreNested(string: string) {
  // TODO
  // check string for brackets or curly braces and parantheses
  // loop through string and check if opening has an ending

  // DIFFERENT APPROACH
  // loop through string and check if left brackets and right brackets are matching opening closing

  let opening = ['(', '[', '{']; // opening array brackets
  let closing = [')', ']', '}']; // closing array brackets
  let count = 0; // how many successful closed and opened brackets are there
  const left = []; // left side of opening
  const right = []; // right side of opening
  if (string.length === 0) return false; // if string = ''
  if (string.length % 2 !== 0) return false; // if string is impossible to have opened and closed brackets
  for (let i = 0; i < string.length; i++) {
    // loop to check if it includes any opening and closing brackets
    if (opening.includes(string[i])) {
      left.push(string[i]);
    } else if (closing.includes(string[i])) {
      right.push(string[i]);
    }
  }
  if (left.length !== right.length) return false; // if left is not equal to right then it breaks meaning false
  for (let i = 0; i < left.length; i++) {
    // loop to check if it has any closing brackets
    if (opening.indexOf(left[i]) === closing.indexOf(right[i])) {
      count += 1;
    } else if (
      opening.indexOf(left[i]) === closing.indexOf(right.reverse()[i])
    ) {
      count += 1;
    }
  }
  if (count === string.length / 2) {
    return true;
  } else {
    return false;
  }
}

console.log('PROBLEM 1');
console.log(checkIfBracketsWithinStringAreNested('(){}[]'));
console.log(checkIfBracketsWithinStringAreNested(''));

//PROBLEM 2
function sortAndCountFrequencyOfArray(array: number[]) {
  //TODO sort array
  // check for number occurences using counter
  // return  sorted array and counter array

  // i used sort and reduce which are javascript array methods
  // which is why i didnt loop through the counted array again to sort
  // i sorted with with array.sort()
  // not sure if it's not allowed to use them, because it's stated
  // in the question to loop again through the count array to get the updated Array
  // i can code it in another way if you want

  // FIRST SOLUTION

  //   const updatedArray = array.sort();
  //   const countArray = updatedArray.reduce(
  //     (count, item) => (((count as any)[item] = count[item] + 1 || 1), count),
  //     []
  //   );

  // SECOND SOLUTION

  // add counter value to count numbers reoccurence
  // sort the initial array
  // map through it and check for each number if it's equal to the number after it
  // if its not then add counter to an array of objects holding the count and the number
  // if it's equal increment counter
  // show counted array and sorted array

  let counter = 1;

  let countArray: number[] = [];
  let sortedArray: number[] = [];

  const updatedArray = array.sort();
  let countPlusNumber: { number: number; amountsOfTimeItsRepeated: number }[] =
    [];

  updatedArray.map((num, i) => {
    if (num === updatedArray[i + 1]) return counter++;
    countPlusNumber.push({
      number: num,
      amountsOfTimeItsRepeated: counter,
    });

    return (counter = 1);
  });

  countPlusNumber.forEach(({ number, amountsOfTimeItsRepeated }) => {
    countArray.push(amountsOfTimeItsRepeated);
    sortedArray = [
      ...sortedArray,
      ...Array(amountsOfTimeItsRepeated).fill(number),
    ];
  });

  console.log(countArray);
  console.log(sortedArray);

  // OPTIMAL SOLUTION I THOUGHT OF is using a hashset to count the re occurence
}
console.log('PROBLEM 2');
sortAndCountFrequencyOfArray([
  1, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 5, 5, 5,
]);

class ListNode<T> {
  value: number;
  next: ListNode<T> | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;
  count: number;

  constructor() {
    this.head = null;
    this.count = 0;
  }

  // add node to end of linked list by iterating through the linkedlist untill there is no next and adding it to when there is no next

  addNode(value: number) {
    let newNode = new ListNode(value);
    this.count++;
    if (!this.head) {
      this.head = newNode;
      return this;
    }
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
    return this;
  }
}

function removeNodes(
  headNode: ListNode<number> | null,
  numToCheckForGreater: number
) {
  // TODO assign headnode to temp
  // loop through nodes by checking for no more next values (node.next == null)
  // if node > num to check remove it and return the head node

  let temp = headNode;
  let prev: typeof temp;

  // checking if head is greater than the num
  if (temp != null && temp.value > numToCheckForGreater) {
    headNode = temp!.next; // changing the head node to be the next value in the singly linked list
    temp = headNode; // putting the temp as the head
  }
  // loop until there is no more values in the linked list and remove greater
  while (temp != null) {
    while (temp != null && temp.value <= numToCheckForGreater) {
      prev = temp;
      temp = temp.next;
    }
    if (temp == null) return headNode;

    prev!.next = temp.next!;

    temp = prev!.next;
  }

  return headNode;
}

function printList(head: ListNode<number>) {
  // i made this function to check if my impelementation of the add and remove nodes is correct
  while (head !== null) {
    console.log(head.value);
    head = head.next!;
  }
}

const newLinkedList = new LinkedList<number>();

newLinkedList.addNode(10);
newLinkedList.addNode(5);
newLinkedList.addNode(12);
newLinkedList.addNode(7);
newLinkedList.addNode(3);
newLinkedList.addNode(9);
newLinkedList.addNode(10);

console.log('PROBLEM 3');
removeNodes(newLinkedList.head, 7);

printList(newLinkedList.head?.next!);

// PROBLEM 4

// TODO
// research XOR
// research resources
// research ordinance
// test

// Get text content
// decrypt text content
// store text content in a string
// after decrypting log the decrypted message

// TRY TO REDUCE TIME COMPLEXITY ON THE ALGORITHM USED

let decryptedMessage = '';

const TEXT_URL = 'https://projecteuler.net/project/resources/p059_cipher.txt';

// TODO
// check if character is english between 97 and 123
// loop through keys
// xor keys
// store the result in the decryptedMessage

function decrypt(fetchedText: string[]) {
  for (let key1 = 97; key1 < 123; key1++) {
    for (let key2 = 97; key2 < 123; key2++) {
      for (let key3 = 97; key3 < 123; key3++) {
        let key = [key1, key2, key3];
        decryptedMessage = '';
        for (let i = 0; i < fetchedText.length; i++) {
          // found the xor algorithm on stackoverflow
          // apply xor algorithm and push to the string
          let xor = parseInt(fetchedText[i]) ^ key[i % 3];
          // fromCharCode returns a string from a UTF-16 code unit
          decryptedMessage += String.fromCharCode(xor);
        }
        if (decryptedMessage.indexOf(' the ') >= 0) {
          return;
        }
      }
    }
  }
}

// i tried with fetch, i failed to get the body
// thats why i installed axios
async function fetchText(url: string) {
  const response = await axios.get(url);

  if (response.status !== 200) {
    return;
  }

  decrypt(response.data.split(','));
  console.log(decryptedMessage);
}

console.log('PROBLEM 4');
fetchText(TEXT_URL);
