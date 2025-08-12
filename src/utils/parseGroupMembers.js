export const parseGroupMembers = (members) => {
  let subheading = "with "
  const membersSize = members.length;

  let i = 0;
  for (; i < membersSize - 1 && i <= 1; i++) {
    subheading = subheading.concat(`${members[i].username}, `);
  }

  subheading = subheading.concat(`${members[i].username} `);
  i++;

  const diff = membersSize - i;
  if (diff > 1) {
    subheading = subheading.concat(`and ${diff} others`)
  }
  else if (diff === 1) {
    subheading = subheading.concat(`and ${diff} other`)
  }

  return subheading;
}