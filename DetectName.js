// The object is to get a sentence, and figure out a subject's name.
// We need to be able to differentiate between whether a user is talking about themselves
// or someone else.

/**
 * Example I/O's:
 * I: "Hey, my name is Carl" / O: {subject: "user", name: "Carl"}
 * I: "Her name is Janice" / O: {subject: "her", names: ["Janice"]}
 * I: "His name is Carl" / O: {subject: "him", names: ["Janice"]}
 * I: "Their names are Carl, Janice, and Loki" / O: {subject: "them", names: ["Carl", "Janice", "Loki"]}
 * I: "Carl is my name" / O: {subject: "user", names: ["Carl"]}
 * I: "My boyfriend's name is Carl"
 */

let exampleSentence = "I am going to name him Aidan";

const DetectName = (input) => {
  let context = {
    subjects: [], // { name: "", index: "" }
    names: [], // "Name"
  };

  //  1. Split the input into the individual words
  let words = input.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i]
      .split("")
      .filter((letter) => letter !== ",")
      .join("");
  }

  //  2. See if the sentence contains the word name or names
  let nameCount = 0;
  for (let i = 0; i < words.length; i++) {
    if (
      words[i].toLowerCase() === "name" ||
      words[i].toLowerCase() === "names"
    ) {
      nameCount++;
    }
  }
  if (!nameCount) {
    return false;
  }

  //  3. Figure out what the subject is
  words.forEach((word, index) => {
    word = word.toLowerCase();

    if (word === "my") context.subjects.push({ name: "user's", index: index });
    if (word === "their")
      context.subjects.push({ name: "group of friend's", index: index });
    if (word === "his") context.subjects.push({ name: "friend", index: index });
    if (word === "him") context.subjects.push({ name: "friend", index: index });
    if (word === "her") context.subjects.push({ name: "friend", index: index });
    if (word.split("'")[1] === "s" && word !== "it's")
      context.subjects.push({ name: word, index: index });
  });

  //  4. Detect the uppercase words
  let UppercaseWords = words.filter((word) => {
    //  If there are two uppercase words in a sentence, then the name can't have an index of 0
    //  If there is only one uppercase word in the sentence, then that has to be the
    //  Check if the word is uppercase and if it is then return the word and its index
    return word.split("")[0].match(/[A-Z]/);
  });

  //  5. Find the name in the uppercase words list
  if (UppercaseWords.length === 1) {
    context.names.push(UppercaseWords[0]);
  } else {
    let names = UppercaseWords.filter((word, index) => {
      return index > 0;
    });
    context.names.push(...names);
  }

  if (context.names) return context;
  else return false;
};

let context = DetectName(exampleSentence);
console.log(context ? context : "No name provided");

//  Get user input
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Make sure to user proper grammar. \nFor more info read more at https://github.com/AidanTilgner/SentenceDetection"
);
rl.question("Type in a sentence that describes someone's name:\n");
