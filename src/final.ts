import { members } from "./constants";

export type MembersReceived = {
  name: string;
  receivedFrom: string;
};

export type MembersGiven = {
  name: string;
  givenTo: string;
};

export function ItIsFestive() {
  const hasReceivedMemory: MembersReceived[] = [];
  const hasGivenMemory: MembersGiven[] = [];

  members.forEach((member) => {
    const currentSurname = member.split(" ")[1];
    console.log({ currentSurname });

    members
      .filter((mem) => mem !== member)
      .forEach((otherMem) => {
        const currentGivenListFlat = hasGivenMemory.map((given) => given.name);

        const hasNotGivenGift = !currentGivenListFlat.includes(member);
        const isNotSameFamily = !otherMem.includes(currentSurname);

        const currentOtherMemberInMemory = hasReceivedMemory.find(
          (thisMem) => thisMem.name === otherMem
        );
        if (
          hasNotGivenGift &&
          isNotSameFamily &&
          !currentOtherMemberInMemory?.receivedFrom
        ) {
          hasReceivedMemory.push({ name: otherMem, receivedFrom: member });
          hasGivenMemory.push({
            name: member,
            givenTo: otherMem,
          });
        }
      });
  });

  console.log({ hasReceivedMemory, hasGivenMemory });

  return { hasReceivedMemory, hasGivenMemory };
}

ItIsFestive();
