const getErrorPage = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Error 404",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
  });
};

const get500ErrorPage = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error 500",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
  });
};

module.exports = { getErrorPage, get500ErrorPage };
