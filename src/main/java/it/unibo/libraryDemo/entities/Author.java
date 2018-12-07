package it.unibo.libraryDemo.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import it.unibo.libraryDemo.view.CustomBooksSerializer;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="authors")
public class Author implements Serializable {
    @Id
    @Column(name="author_id")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    @OneToMany(
            mappedBy = "author",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonSerialize(using = CustomBooksSerializer.class)
    private List<Book> books = new ArrayList<>();

    @PreRemove
    public void preRemove() {
        setBooks(null);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public void addBook(Book book) {
        books.add(book);
        book.setAuthor(this);
    }

    public void removeBook(Book book) {
        books.remove(book);
        book.setAuthor(null);
    }
}
