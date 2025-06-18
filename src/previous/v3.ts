import { members } from "../constants";

type FamilyMember = {
  name: string;
  receivedFrom: string;
  givenTo: string;
};

//added for readability, its really not needed. Helping myself think. If we wanted to make it more strict we can define the surnames here. But that is not scalable.
//slash surname
type Heritage = string;

type FamilyMembers = Record<Heritage, FamilyMember[]>;

function checkWhoIsCheatingGifts(
  memory: FamilyMember[],
  name: string,
  type: "receivedFrom" | "givenTo"
) {
  return memory.some((member) => member[type] === name);
}

function breakUpIntoFamilies() {
  return members.reduce((acc, member) => {
    const surname = member.split(" ")[1];

    const currentFamily = acc[surname];

    if (currentFamily) {
      acc[surname] = [
        ...currentFamily,
        {
          givenTo: "",
          receivedFrom: "",
          name: member,
        },
      ];
    }

    if (!currentFamily) {
      acc[surname] = [{ givenTo: "", receivedFrom: "", name: member }];
    }

    return acc;
  }, {} as FamilyMembers);
}

function familyFestiveness() {
  let whoHasGiftsMemory: FamilyMember[] = [];
  //map into families
  const families = breakUpIntoFamilies();

  //go through every family and give to another family if memeber has not gotten one yet
  Object.entries(families).forEach(([heritage, currentFamily]) => {
    const otherFamilies = Object.fromEntries(
      Object.entries(families).filter(([her, _]) => her !== heritage)
    );

    //test
    // console.log({
    //   current: heritage,
    //   other: otherFamilies,
    // });

    console.log("current fam", heritage);

    //current family - each member needs to give
    currentFamily.forEach((currentMember) => {
      //check memory
      //if current member has givem skip to next.
      //
      //give to person

      //select a member and give if they have not received a gift yet
      Object.entries(otherFamilies).forEach(([_, otherFamilyMembers]) => {
        otherFamilyMembers.forEach((otherMember) => {
          const otherMemberInMemory = whoHasGiftsMemory.find(
            (mem) => mem.name === otherMember.name
          );
          const currentMemberInMemory = whoHasGiftsMemory.find(
            (mem) => mem.name === currentMember.name
          );

          //if current fam member has not already given but does not exists
          if (!currentMemberInMemory) {
            whoHasGiftsMemory.push({
              ...currentMember,
              givenTo: otherMember.name,
            });

            if (
              otherMemberInMemory &&
              otherMemberInMemory.receivedFrom !== ""
            ) {
              whoHasGiftsMemory = whoHasGiftsMemory.map((member) => {
                if (member.name === otherMemberInMemory.name) {
                  return {
                    ...otherMember,
                    receivedFrom: currentMember.name,
                  };
                }
                return member;
              });
            }

            //update receiving end
            //if not in memory update
            if (!otherMemberInMemory) {
              whoHasGiftsMemory.push({
                ...otherMember,
                receivedFrom: currentMember.name,
              });
            }

            return;
          }

          //if current fam member has not already given but exists
          if (currentMemberInMemory && currentMemberInMemory.givenTo !== "") {
            whoHasGiftsMemory = whoHasGiftsMemory.map((member) => {
              if (member.name === currentMemberInMemory.name) {
                return {
                  ...currentMember,
                  givenTo: otherMember.name,
                };
              }
              return member;
            });

            //if exists in memory and has no gift
            if (
              otherMemberInMemory &&
              otherMemberInMemory.receivedFrom !== ""
            ) {
              whoHasGiftsMemory = whoHasGiftsMemory.map((member) => {
                if (member.name === otherMemberInMemory.name) {
                  return {
                    ...otherMember,
                    receivedFrom: currentMember.name,
                  };
                }
                return member;
              });
            }

            //update receiving end
            //if not in memory update
            if (!otherMemberInMemory) {
              whoHasGiftsMemory.push({
                ...otherMember,
                receivedFrom: currentMember.name,
              });
            }

            return;
          }
        });
      });
    });
  });

  console.log(whoHasGiftsMemory);
}

// familyFestiveness();
