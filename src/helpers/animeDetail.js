export const getName = (person) => person?.name?.full || "";
export const getRole = (role) => (role ? String(role).toUpperCase() : "");
