---
outline: deep
---

<script setup>
import Examples from './Examples.vue';

const site = { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none"/></svg>' }

const members = [
  {
    avatar: "https://github.com/joshpoll.png",
    name: "Insertion Sort",
    desc: "An insertion sort algorithm visualization",
    creator: "Elliot Evans",
    inspiration: "Penrose's gallery and Vennobennu",
    link: "https://playground.solidjs.com/anonymous/ebc7c9d9-b8fc-4ec2-9111-f7275996ceb4"
  },
  {
    avatar: "https://github.com/catherinemei.png",
    name: "DFSCQ File System",
    desc: "A diagram of a transaction in the DFSCQ file system",
    inspiration: "DFSCQ",
  },
  {
    avatar: "https://github.com/gracefh.png",
    name: "Python Tutor",
    desc: "A visualization of Python code runtime state",
  },
  {
    avatar: "https://github.com/vezwork.png",
    name: "Baking Recipe",
    desc: "A tabular baking recipe diagram",
  },
  {
    avatar: "https://hci.csail.mit.edu/images/profile-pictures/faculty/daniel-jackson.jpg",
    name: "Pulleys",
    desc: "A pulley diagram inspired by Larkin & Simon",
  },
  {
    avatar: "https://arvindsatya.com/imgs/arvindsatya-2023.jpg",
    name: "Quantum Circuit Equivalence",
    desc: "A diagram of quantum circuit equivalence",
  },
  {
    avatar: "https://people.csail.mit.edu/dnj/",
    name: "Three-Point Set Topologies",
    desc: "Point-Set Topologies",
  },
  {
    avatar: "https://people.csail.mit.edu/dnj/",
    name: "Ohm Parse Tree",
    desc: "A visualization of the Ohm parser's central data structure",
  },
];
</script>

Take a look at our examples! They're all based on real diagrams.

- [Baking Recipe](https://playground.solidjs.com/anonymous/8f733a7c-2ed8-4f5f-b98e-f17eb2cf2b13)
- [Pulleys](https://playground.solidjs.com/anonymous/9bdf7c8f-260c-4e6d-bc96-67383a5c6647)
- [Quantum Circuit Equivalence](https://playground.solidjs.com/anonymous/57f3baf1-6af4-4126-9159-d050b88523c3)

<!-- <Examples size="medium" :members="members" /> -->

<!-- - [Insertion Sort](TODO)
- [DFSCQ File System](TODO)
- [Python Tutor](TODO)
- [Baking Recipe](TODO)
- [Pulleys](TODO)
- [Quantum Circuit Equivalence](TODO)
- [Three-Point Set Topologies](TODO)
- [Ohm Parse Tree](TODO) -->
