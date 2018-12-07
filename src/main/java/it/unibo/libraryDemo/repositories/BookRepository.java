package it.unibo.libraryDemo.repositories;

import it.unibo.libraryDemo.entities.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Integer> {

}
