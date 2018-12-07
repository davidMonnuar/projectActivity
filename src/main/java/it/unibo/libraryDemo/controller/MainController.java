package it.unibo.libraryDemo.controller;

import it.unibo.libraryDemo.entities.Author;
import it.unibo.libraryDemo.entities.Book;
import it.unibo.libraryDemo.repositories.AuthorRepository;
import it.unibo.libraryDemo.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;

@RestController
@RequestMapping(path="/library")
public class MainController {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping(path="/getHostname")
    public String getHostname () {
        String hostname = "unknown";
        try {
            hostname = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return hostname;
    }

    @GetMapping(path="/resetApplication")
    public String resetApplication () {
        bookRepository.deleteAll();
        authorRepository.deleteAll();
        return "Done";
    }

    @PutMapping(path="/addBook")
    public String addNewBook (@RequestParam String title, @RequestParam String isbn, @RequestParam String author) {
        Book b = new Book();
        b.setTitle(title);
        b.setIsbn(isbn);
        Author a = authorRepository.findById(Integer.parseInt(author)).orElse(null);

        if(a == null) {
            return "Not saved. The author is not in the database";
        }

        a.addBook(b);

        bookRepository.save(b);
        authorRepository.save(a);

        return "Book saved";
    }

    @GetMapping(path="/getAllBooks")
    public Iterable<Book> getAllBooks () {
        return bookRepository.findAll();
    }

    @DeleteMapping(path="/deleteBook")
    public String deleteBook (@RequestParam Integer id){
        bookRepository.deleteById(id);
        return "Book deleted";
    }

    @PutMapping(path="/addAuthor")
    public String addNewAuthor (@RequestParam String name) {
        Author a = new Author();
        a.setName(name);
        authorRepository.save(a);

        return "Author saved";
    }

    @GetMapping(path="/getAllAuthors")
    public Iterable<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @DeleteMapping(path="/deleteAuthor")
    public String deleteAuthor (@RequestParam Integer id){
        authorRepository.deleteById(id);
        return "Author deleted";
    }
}
