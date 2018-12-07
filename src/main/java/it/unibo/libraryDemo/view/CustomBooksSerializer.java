package it.unibo.libraryDemo.view;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import it.unibo.libraryDemo.entities.Book;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CustomBooksSerializer extends StdSerializer<List<Book>> {

    public CustomBooksSerializer() {
        this(null);
    }

    public CustomBooksSerializer(Class<List<Book>> t) {
        super(t);
    }

    @Override
    public void serialize(List<Book> books, JsonGenerator generator, SerializerProvider provider) throws IOException, JsonProcessingException {
        List<String> ids = new ArrayList<>();
        for (Book book : books) {
            ids.add(book.getTitle());
        }
        generator.writeObject(ids);
    }
}