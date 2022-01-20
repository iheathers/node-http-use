const getErrorPage = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Error 404",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
  });
};

module.exports = { getErrorPage };
