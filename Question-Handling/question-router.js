// Basically when we get an input, we need to see if it is a question
// and if so, we want to generate a relevant response for said question
// this will take in an input, and figure out what kind of question we have,
// and therefore what kind of response we should produce

/**
 * Example I/O's:
 * I: "How are you today?" / O: "I am good"
 * I: "What is your favorite color?" / O: "My favorite color is blue"
 * I: "Who are you?" / O: "I am Onyx"
 * I: "When were you made?" / O: "I was made in 2021"
 * I: "Where is my pizza?" / O: "Your pizza is on the table."
 * I: "Why is the sky blue?" / O: "Because someone made it blue."
 * I: "Do you like bread?" / O: "No I do not like bread."
 * I: "Are you hungry?" / O: "No I am not."
 */

// First thing's first, lets figure out what kind of question we are being asked

/**
 * There are 4 main types of question:
 * 1. Yes/No questions
 * - Do {subject 1PS 2PS 3PP}
 * - Does {subject 3PS}
 * - Can {subject 1PS 2PS 3PP}
 * - Is {subject 3PS}
 * - Are {subject 3PP 2PS}
 *
 * 2. Special questions
 * - Where is/are {subject 1PS 2PS 3PP 3PS}?
 * - When did {subject 1PS 2PS 3PP 3PS} come from?
 * - How did {subject 1PS 2PS 3PP 3PS} meet her?
 * - How many/much {noun/PLnoun} do/does {subject 1PS 2PS 3PP 3PS} need for this/that {noun}?
 * - Whose {noun/PLnoun} is/are {verb}?
 *
 * 3. Choice questions
 * - Does she like cream or sweets?
 * - Where would you go, to the cinema or theatre?
 * - Is he a teacher or student?
 * - Does she make it or did you?
 *
 * 4. Disjunctive or tag questions
 * - She sent him an invitation, didn't she?
 * - You aren't getting married, are you?
 * - Jane isn't in France, is she?
 * - Our dad will come soon, won't he?
 */

// We can start by making a question object
class Question {
  constructor(input) {
    this.input = input.toLowerCase();
    this.isQuestion = !!this.input.match(/\?$/g);
    this.type = this.identifyType();
    this.subject = null;
    this.verb = null;
    this.object = null;
    this.preposition = null;
  }
  // Let's see if it is a yes or no question
  identifyType = () => {
    if (!this.isQuestion) {
      return -1;
    }

    //  Identifying a general question
    if (
      !!this.input.match(
        /^(do |does |did |can |will |has |am |is |are |have |has )/gm
      )
    ) {
      return "general";
    }

    //  Identifying a special/Wh- question
    if (!!this.input.match(/^(who |what |when |where |why |how )/gm)) {
      return "special";
    }
  };
}

// Running checks to make sure the function is working
let generalChecks = [
  "Do you like this country?",
  "Does Jane know about your new job?",
  "Can I call my sister?",
  "Is it cold outside?",
  "Are they ready for the trip?",
  "Are you hungry?",
  "Will you watch the baby?",
  "Have we gotten a lot of snow?",
  "Am I ok doc?",
  "Did you see that?",
  "Are my eyes blue?",
  "Is the sky orange?",
];

generalChecks.forEach((check) => {
  check = new Question(check);
  console.log(check.input, " \nis " + check.type);
});

let specialChecks = [
  "Where is he from?",
  "When did you get here?",
  "How did you meet her?",
  "Who is that woman?",
  "What color are my eyes?",
  "Why are you like this?",
  "Why do I always have to do everything?",
];

specialChecks.forEach((check) => {
  check = new Question(check);
  console.log(check.input, " \nis " + check.type);
});
