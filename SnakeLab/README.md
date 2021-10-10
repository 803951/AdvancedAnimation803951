# README

## Snake Lab

Snake attributes: Snakes are built of segments that each follow a leading segment. A segment functions by following another segment if it has the Next Segment property assigned, though otherwise will move autonomously. Thus only the head of the snake moves autonomously while the other segments follow the segment in front of them.
Snakes can be split into pieces that form smaller snakes by re-assigning the Next Segment property of a particular segment to undefined, thus making it a leading segment and move autonomously.

Linked list explanation: Linked lists are lists made through objects pointing to the next item of the list without using any arrays keeping track of the index of each object. Each segment forming the linked list of a snake points to the next segment in the snake though the head points to "undefined" because it does not follow any segments but rather moves autonomously.

Construction of snake explanation: The snake is constructed from the head to the tail with each new segment pointing to the segment in front of it and thus the most recently created segment. The head points to no segment, the second segment points to the head, etc...
