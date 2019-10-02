module.exports = {
  user: (req, res, next) => {
    if (req.user) next();
    else {
      res.redirect("/login");
    }
  }
};
