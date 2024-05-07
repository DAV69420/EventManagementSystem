export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "Tickets",
    route: "/tickets",
  },
  {
    label: "Profile",
    route: "/profile",
  },
  {
    label: "Live",
    route: "/live",
  },
  {
    label: "Event Stars",
    route: "/stars",
  },
  {
    label: "Community",
    route: "/comm",
  },
  {
    label: "Patreon",
    route: "https://www.patreon.com/",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};
