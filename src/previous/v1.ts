import { members } from "../constants";

type PersonWithGift = {
  name: string;
  giftedTo: String;
  giftReceivedFrom: string;
};

//Define end result

// Gift giving
function aroundTheClock() {
  //outside does not have to be inside the loop. do not have to calculate every loop
  const memberTotal = members.length;

  const finalGiftHasGiven: PersonWithGift[] = [];
  //keep track of who gave gifts
  const gaveAGift: string[] = [];

  //keep track of who received
  const receivedAGift: string[] = [];

  members.forEach((member) => {
    const indexToSelect = Math.round(Math.random() * memberTotal);
    console.log(indexToSelect);

    const selection = members[indexToSelect];

    //not current member
    //giving
    if (selection !== member) {
      finalGiftHasGiven.push({
        name: selection,
        giftedTo: "",
        giftReceivedFrom: member,
      });
    }
  });

  console.log(finalGiftHasGiven);
}

// aroundTheClock();

//new test
const newRound = () => {
  const peopleWhoNeedsToBeMoreGiving: PersonWithGift[] = [];

  //create empty list (no one has gifts)
  members.forEach((member) => {
    peopleWhoNeedsToBeMoreGiving.push({
      giftedTo: "",
      giftReceivedFrom: "",
      name: member,
    });
  });

  const updatedGifts: PersonWithGift[] = [];

  const memberTotal = peopleWhoNeedsToBeMoreGiving.length;
  console.log(memberTotal);

  //go through see who hasnt gotten a gift and give and receive
  peopleWhoNeedsToBeMoreGiving.forEach((currentMember) => {
    //member needs to give a gift
    const selectionIndex = Math.round(Math.random() * memberTotal);

    const selection = peopleWhoNeedsToBeMoreGiving[selectionIndex];

    //person who received gift, update
    const receivingPerson = updatedGifts.find(
      (updatedMembers) => updatedMembers.name === currentMember.name
    );

    //if person who is givign to not there yet create
    if (!receivingPerson) {
      updatedGifts.push({
        giftedTo: "",
        giftReceivedFrom: currentMember.name,
        name: selection?.name,
      });
    } else {
      //update receiving person
      updatedGifts.map((person) => {
        if (person.name === selection.name) {
          return {
            ...receivingPerson,
            giftReceivedFrom: currentMember.name,
          };
        }
        return person;
      });
    }

    const givingPerson = updatedGifts.find(
      (updatedMembers) => updatedMembers.name === currentMember.name
    );

    if (!givingPerson) {
      updatedGifts.push({
        giftedTo: receivingPerson?.name || "",
        giftReceivedFrom: "",
        name: currentMember.name,
      });
    } else {
      //update receiving person
      updatedGifts.map((person) => {
        if (person.name === selection.name) {
          return {
            ...receivingPerson,
            giftedTo: receivingPerson?.name || "",
          };
        }
        return person;
      });
    }
  });

  console.log(updatedGifts);
};

newRound();

//new file new head space...
// function test() {
//   //give to all
//   const hasReceived: PersonWithGift[] = [];

//   members.forEach((member) => {
//     while() {

//     }
//   });
// }
