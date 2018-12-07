package it.unibo.libraryDemo.repositories;

import it.unibo.libraryDemo.entities.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author, Integer> {

}
