function requireUser(req, res, next) {
  if (!req.user) {
   res.status(401);
   next({
     name: "MissingUserError",
     message: "You must be logged in to perform this action."
   });
  }
  next()
 }
 const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(403)
  }
 }
 
 module.exports = {
   requireUser,
   isAdmin
 }
