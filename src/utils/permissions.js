import groupBy from 'ramda/src/groupBy';
import pluck from 'ramda/src/pluck';

const perms = [
  {
    name: 'Dashboard',
    permissions: 'USR',
    description:
      'Το Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες ',
    viewOnMenu: true,
    path: ['/'],
    group: 'Dashboard',
  },
];

const filteredPerms = perms.filter(({group}) => group);

const groupedPerms = groupBy(({group}) => group, filteredPerms);
// const allPerms = pluck('permissions', perms);
// console.log(allPerms)
const menuItems = groupBy(
  ({section}) => section,
  perms.filter(({viewOnMenu}) => viewOnMenu)
);

export {groupedPerms, menuItems};
