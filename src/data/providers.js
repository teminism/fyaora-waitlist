const firstNames = [
  "jonesadam",
  "Gler@pp",
  "Albertwatson",
  "johnsmith",
  "sarahjones",
  "michaelbrown",
  "emilydavis",
  "danielwilson",
  "oliverthomas",
  "sophiawhite",
];

const postcodes = [
  "SW1A 1AA",
  "M1 1AE",
  "OX1 2JD",
  "EC1A 1BB",
  "W1A 0AX",
];

const vendorTypes = ["Independent", "Company"];

const services = [
  "Housekeeping",
  "Window Cleaning",
  "Car Valet",
];

const statuses = [
  "Onboarded",
  "Rejected",
];

export const providers = Array.from({ length: 60 }, (_, index) => {
  const name = firstNames[index % firstNames.length];

  return {
    id: index + 1,

    email: `${name}${index + 1}@gmail.com`,

    phone: `+44 20 7946 ${String(9000 + index).slice(-4)}`,

    postcode: postcodes[index % postcodes.length],

    vendorType: vendorTypes[index % vendorTypes.length],

    serviceOffering: services[index % services.length],

    signupDate: `2025-${String((index % 12) + 1).padStart(2, "0")}-${String(
      (index % 28) + 1
    ).padStart(2, "0")}`,

    status: statuses[index % statuses.length],
  };
});