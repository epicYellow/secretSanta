//weird weird weird thing I noticed
//we have an equal number of members and we have 4 pollards and 4 randos
//cant it just be a two way gift giving?
//its not secret santa I know because we define who is giving to who
const simpleGiftGiving = () => {
  const finalGifts: UpdatedUpdatedPersonWithGift[] = [];

  //reduce into two arrays
  const { Pollards, Randos } = peopleWhoNeedsToBeMoreGiving.reduce(
    (acc, person) => {
      if (person.toLowerCase().includes("pollard")) {
        acc["Pollards"].push(person);
        return acc;
      }

      acc["Randos"].push(person);
      return acc;
    },
    {
      Pollards: [],
      Randos: [],
    } as {
      Pollards: string[];
      Randos: string[];
    }
  );

  Pollards.forEach((pollard, index) => {
    //current pollard
    finalGifts.push({
      giftedTo: Randos[index],
      giftReceivedFrom: Randos[index],
      name: pollard,
    });

    //current rando
    finalGifts.push({
      giftedTo: pollard,
      giftReceivedFrom: pollard,
      name: Randos[index],
    });
  });

  console.log(finalGifts);
};

simpleGiftGiving();

//another random solution
//what if they all gave themselves gifts?
//Still not secret santa though
