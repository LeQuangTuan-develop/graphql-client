import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation, useQuery } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutations";

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMuitation] = useMutation(addSingleBook);

  console.log(dataMuitation);

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(newBook);

    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });

    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="my-2">
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          onChange={onInputChange}
          value={newBook.name}
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={onInputChange}
          value={newBook.genre}
        />
      </Form.Group>
      <Form.Group className="my-2">
        {loading ? (
          <p>Loading Authors ...</p>
        ) : (
          <Form.Select
            aria-label="Default select example"
            name="authorId"
            onChange={onInputChange}
            value={newBook.authorId}
          >
            <option value="" disabled>
              Select Author
            </option>
            {data.authors.map((author) => (
              <option value={author.id} key={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Select>
        )}
      </Form.Group>
      <Button className="ms-auto text-white" variant="info" type="submit">
        Add book
      </Button>
    </Form>
  );
};

export default BookForm;
