function only(role) {
  console.log('only')

    return function(req, res, next) {

      function isAccess(element){
        return element == req.user.category;
      }
      console.log(role.some(isAccess))
        if (req.user && role.some(isAccess)) {
          console.log('is manager')
          console.log('acces granted, hello ',role)
            next();
        } else {
            res.render("error404.pug");
        }
    }
}

module.exports = only;
