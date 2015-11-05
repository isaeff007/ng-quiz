/**
 * Created by ak on 05.11.2015.
 */
//import the  models to store the data from database collections.
var Book =  new require("./../models/book");
var Questions = new require("./../models/questions");

module.exports = function(app) {

//get all avail. books , place them in the respond (books).
    app.get('/books', function (req, res) {
        Book.find(function (err, books) {
            if (err) {
                return res.status(400).send({message: err.message});
            } else {
                res.send(books);
            }
        });
    });

//get all avail. questions for selected book id (don' use the $eq operator with strings)
    app.get('/books/:id', function (req, res) {
        Questions.find({bookid: req.params.id}, function (err, books) {
            if (err) throw err;
            res.send(books);
        })
    });

//insert the new book to the list
    app.post('/books', function (req, res) {
        //convert received body to a valid book object
        var book = Book.getValidatedBook(req.body);

        //save the instance (save() is embedded) and check the errors.
        book.save(function (err) {
            if (err) throw err;
            res.json({message: 'new book added to list', data: book})
        })


    });

};