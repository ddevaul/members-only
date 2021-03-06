const Message = require('../models/message');
const { body,validationResult } = require('express-validator');


exports.getMessages = (req, res) => {
  res.render('messages', {user: req.user})
}

exports.create = [
  body('text', 'Text required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const message = new Message({ 
      text: req.body.text,
      time: new Date(), 
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('messages', {errors: errors.array()});
      return;
    }
    else {

      // Data from form is valid.
      // Check if Genre with same name already exists.
             message.save(function (err) {
               if (err) { 
                 return next(err); 
                }
               // Genre saved. Redirect to genre detail page.
              res.redirect("/messages");
             });

           }
    }

]
