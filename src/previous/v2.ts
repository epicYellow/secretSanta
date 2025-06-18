const peopleWhoNeedsToBeMoreGiving = [
  "Vicky Pollard",
  "Keith Pollard",
  "Ian Smith",
  "Dave Pollard",
  "Maria Osawa",
  "Mark Kelly",
  "John Pollard",
  "Sarah Kelly",
];

type UpdatedUpdatedPersonWithGift = {
  name: string;
  giftedTo: String;
  giftReceivedFrom: string;
};

//lets break it down
function festiveSeason() {
  //initial set up
  const peopleWithGifts: UpdatedUpdatedPersonWithGift[] = [];

  //create empty list (no one has gifts)
  peopleWhoNeedsToBeMoreGiving.forEach((member) => {
    peopleWithGifts.push({
      giftedTo: "",
      giftReceivedFrom: "",
      name: member,
    });
  });

  //Go through every member
  peopleWhoNeedsToBeMoreGiving.forEach((currentMember) => {
    //what is our condition
    //each memeber need to give a gift
    //we need to make sure that person does not have a gift. Do we create an array to store this data?
    //while person has given no gifts give
    //while member is not a family member (lets focus on core first)

    //people who can receive gifts (current user excluded)
    peopleWhoNeedsToBeMoreGiving
      .filter((member) => {
        member !== currentMember;
      })
      .forEach((receivingEnd) => {
        //Does this person already have a gift?
        const doesHaveGift = peopleWithGifts.find(
          (wanter) =>
            receivingEnd === wanter.name && wanter.giftReceivedFrom === ""
        );

        if (!doesHaveGift) {
          //give gift
          peopleWithGifts.push({
            giftedTo: "",
            giftReceivedFrom: currentMember,
            name: receivingEnd,
          });
        }
      });

    // const
    // while(){}
  });
}

const notAllPeopleHaveGifts = (
  giftsTracking: UpdatedUpdatedPersonWithGift[]
) => {
  return giftsTracking.some(
    (person) => person.giftReceivedFrom === "" || person.giftedTo === ""
  );
};

//Refer to my picture in the project
//almost more structured approach, then I realised this wont work if more users were added
//very structured approach, but not scalable
const anotherApproach = () => {
  const giftsTracking: UpdatedUpdatedPersonWithGift[] = [];

  //create empty list (no one has gifts)
  peopleWhoNeedsToBeMoreGiving.forEach((member) => {
    giftsTracking.push({
      giftedTo: "",
      giftReceivedFrom: "",
      name: member,
    });
  });
  // our source of truth
  //   const { Pollards, Randos } = peopleWhoNeedsToBeMoreGiving.reduce(
  //     (acc, person) => {
  //       if (person.toLowerCase().includes("pollard")) {
  //         acc["Pollards"].push(person);
  //         return acc;
  //       }

  //       acc["Randos"].push(person);
  //       return acc;
  //     },
  //     {
  //       Pollards: [],
  //       Randos: [],
  //     } as {
  //       Pollards: string[];
  //       Randos: string[];
  //     }
  //   );

  const pollardsCopy = [
    ...peopleWhoNeedsToBeMoreGiving.filter((person) =>
      person.toLowerCase().includes("pollard")
    ),
  ];

  const randosCopy = [
    ...peopleWhoNeedsToBeMoreGiving.filter(
      (person) => !person.toLowerCase().includes("pollard")
    ),
  ];

  console.log({ pollardsCopy, randosCopy });

  //   while (notAllPeopleHaveGifts(giftsTracking)) {
  //     let randomPollard: string | undefined;
  //     let randomRando: string | undefined;

  //     if (pollardsCopy.length > 1) {
  //       const index = Math.round(Math.random() * pollardsCopy.length);
  //       randomPollard = pollardsCopy[index];
  //     }

  //     if (randosCopy.length > 1) {
  //       const index = Math.round(Math.random() * randosCopy.length);
  //       randomRando = randosCopy[index];
  //     }
  //   }
};

// anotherApproach();
