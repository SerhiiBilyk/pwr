function only(role) {
    return function(req, res, next) {
      function isAccess(element){
        return element == req.user.category;
      }
        if (req.user && role.some(isAccess)) {
          console.log('acces granted, hello ',role)
            next();
        } else {
            res.render("error404.pug");
        }
    }
}

module.exports = only;
