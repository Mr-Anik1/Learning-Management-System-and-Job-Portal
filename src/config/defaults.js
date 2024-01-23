const config = {
  // Pagination for findAll controllers
  page: 1,
  limit: 10,
  sortType: "dsc",
  sortBy: "updatedAt",
  search: "",
  status: "",
  category: "",
  paid: "",
  author: "",
  totalItems: 0,
  // JWT
  secret: process.env.ACCESS_TOKEN_SECRET,
  algorithm: "HS256",
  expiresIn: "20h",
  // Hashing Password
  saltRound: 10,
};

module.exports = Object.freeze(config);
