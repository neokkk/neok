---
title: '자바스크립트 자료구조 (스택, 큐)'
date: '2019-11-19'
tags: ['js', 'data-structure', 'stack', 'queue']
---


가장 기본적인 자료구조인 스택과 큐를 자바스크립트 코드로 작성해보자.

<br />
<br />

## 스택 (Stack)

<br />

### 스택이란?

<br />

스택은 한 쪽 끝에서만 데이터를 넣고 뺄 수 있는 후입선출 (Last In First Out) 구조로, 데이터를 넣는 push와 빼는 pop 메서드로 이루어져 있다.


데이터를 넣을 때 브라우저나 사용자가 정한 스택의 사이즈를 초과하면 stack overflow 에러가 발생한다.


입력된 반대 순서로 출력되기 때문에 웹 브라우저의 방문 기록과 같은 경우에 사용된다.


자바스크립트에서 스택의 구현은 배열로 할 수 있는데, 기본 배열 메서드로 push, pop은 물론  앞에서 데이터를 삽입, 삭제하는 unshift, shift까지 존재하므로 최대한 이 메서드를 사용하지 않고 작성하려고 한다.

<br />

### 구현

<br />

```js
class Stack {
  constructor(size) {
    this.arr = [];
    this.top = -1;
    this.size = size ? size : 1000000;
  }

  push(data) {
    if (this.size === this.arr.length) {
      console.log('This is stack overflow!');
      return;
    }

    this.top++;
    this.arr[this.top] = data;

    console.log(this.arr);
  }

  pop() {
    if (this.top < 0) return;

    const popped = this.arr.splice(this.top);
    this.top--;

    console.log(this.arr);

    return popped;
  }
}
```

<br />
<br />

## 큐 (Queue)

<br />

### 큐란?

<br />

큐는 먼저 집어넣은 데이터가 먼저 출력되는 선입선출 (First Input First Out) 구조로, 스택과는 반대되는 개념이다.


데이터를 넣는 enqueue와 빼는 dequeue 메서드로 이루어져 있다.


스택과 마찬가지로 배열로 구현 가능하며, 사이즈를 초과할 수 없다.


입력된 순서대로 출력되기 때문에 프린터 출력이나 캐시, 대기 등에 사용된다.

<br />

### 구현

<br />

```js
class Queue {
  constructor(size) {
    this.arr = [];
    this.size = size ? size : 1000000;
  }

  enqueue(data) {
    if (this.arr.length === this.size) {
      console.log('This is Queue Overflow!');
      return;
    }

    this.arr.push(data);
  }

  dequeue() {
    if (this.arr.length < 0) {
      console.log('This is Queue Underflow!');
      return;
    }

    return this.arr.shift();
  }
}
```

<br />
<br />

## 심화

<br />

### 큐 2개로 스택 구현하기

<br />


```js
import Queue from './queue';

class QueueToStack {
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
  }

  push(data) {
    if (this.q1.arr.length || (!this.q1.arr.length && !this.q2.arr.length)) {
      this.q1.enqueue(data);
    } else {
      this.q2.enqueue(data);
    }
  }

  pop() {
    if (this.q1.arr.length) {
      if (this.q1.arr.length < 2) {
        return this.q1.dequeue();
      }

      while (this.q1.arr.length > 1) {
        this.q2.enqueue(this.q1.dequeue());
      }

      return this.q1.dequeue();
    } else {
      if (this.q2.arr.length < 2) {
        return this.q2.dequeue();
      }

      while (this.q2.arr.length > 1) {
        this.q1.enqueue(this.q2.dequeue());
      }

      return this.q2.dequeue();
    }
  }
}
```

<br />

### 스택 2개로 큐 구현하기

<br />


```js
import Stack from './stack';

class StackToQueue {
  constructor() {
    this.s1 = new Stack();
    this.s2 = new Stack();
  }

  enqueue(data) {
    this.s1.push(data);
  }

  dequeue() {
    if (this.s1.arr.length < 2) {
      return this.s1.pop();
    }

    while (this.s1.arr.length > 1) {
      this.s2.push(this.s1.pop());
    }

    const dq = this.s1.pop();

    while (this.s2.arr.length) {
      this.s1.push(this.s2.pop());
    }

    return dq;
  }
}
```

<br />
<br />

## ㅇ 참고 문서

<br />

* <https://gmlwjd9405.github.io/2018/08/02/data-structure-queue.html>
