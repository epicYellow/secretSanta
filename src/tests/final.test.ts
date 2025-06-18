import { ItIsFestive, MembersGiven, MembersReceived } from "../final";

const countOccurrences = (
  memberName: string,
  arrayToTest: { name: string }[]
) => {
  let count = 0;
  arrayToTest.forEach((member) => {
    if (member.name === memberName) {
      count++;
    }
  });

  return count;
};

const testGivenToAlignsWithReceived = (
  memberName: string,
  givenToMember: string,
  hasReceivedMemory: MembersReceived[]
) => {
  const member = hasReceivedMemory.find(
    (member) => member.name === givenToMember
  );

  if (member) {
    return member.receivedFrom === memberName;
  }
  return false;
};

const testReceivedAlignsWithGivenTo = (
  memberName: string,
  receivedFromMember: string,
  hasGivenMemory: MembersGiven[]
) => {
  const member = hasGivenMemory.find(
    (member) => member.name === receivedFromMember
  );

  if (member) {
    return member.givenTo === memberName;
  }

  return false;
};

describe("christmas test", () => {
  const { hasGivenMemory, hasReceivedMemory } = ItIsFestive();

  hasGivenMemory.forEach((member) => {
    test(`${member.name} has only given once`, () => {
      expect(countOccurrences(member.name, hasGivenMemory)).toBe(1);
    });
  });

  hasReceivedMemory.forEach((member) => {
    test(`${member.name} has only received once`, () => {
      expect(countOccurrences(member.name, hasReceivedMemory)).toBe(1);
    });
  });

  hasGivenMemory.forEach((member) => {
    test(`${member.name} has given to ${member.givenTo}`, () => {
      expect(
        testGivenToAlignsWithReceived(
          member.name,
          member.givenTo,
          hasReceivedMemory
        )
      ).toBe(true);
    });
  });

  hasReceivedMemory.forEach((member) => {
    test(`${member.name} received from ${member.receivedFrom}`, () => {
      expect(
        testReceivedAlignsWithGivenTo(
          member.name,
          member.receivedFrom,
          hasGivenMemory
        )
      ).toBe(true);
    });
  });
});
