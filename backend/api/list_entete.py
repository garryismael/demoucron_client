class Node:
    def __init__(self, data: int):
        self.data: int = data
        self.next: Node = None


class Stack:
    def __init__(self):
        self.top: Node = None
        self.size: int = 0

    def push(self, data: int):
        node = Node(data)
        if self.top:
            node.next = self.top
            self.top = node
        else:
            self.top = node
        self.size += 1

    def pop(self):
        if self.top:
            data: int = self.top.data
            if self.top.next:
                self.top = self.top.next
            else:
                self.top = None
            self.size -= 1
            return data
