// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {


    book.find( (err, books) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/add', {
          title: 'Books',
          
        });
      }
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newbook = book({
      "Title" : req.body.title,
      "Description": req.body.description,
      "Price" : req.body.price,
      "Author" : req.body.author,
      "Gener" : req.body.gener
    });

    book.create(newbook,(err,book)=>{

      if(err){
        console.log(err);
        res.end(errr);
      }
      else{
        res.redirect('/books');
      }
    });

});
 
// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.findById(id, (err, bookObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('books/details', {
                title: "Edit book",
                books: bookObject
            });
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    let updatedBook = book({
        "_id": id,
        "Title" : req.body.title,
        "Description": req.body.description,
        "Price" : req.body.price,
        "Author" : req.body.author,
        "Genre" : req.body.genre
    });

    book.update({_id: id}, updatedBook, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book 
            res.redirect('/books');
        }
    })



});

// GET - process the delete by user id
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
              
            res.redirect('/books');
        }
    });

});


module.exports = router;
