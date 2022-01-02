import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetail from "./BookDetail";

import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";
import { useState } from "react";

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books... </p>;
  if (error) return <p>Error loading books!</p>;

  return (
    <Row>
      <Col>
        <Row xs={1} md={4}>
          {data.books.map((book) => (
            <Col key={book.id}>
              <Card
                border="info"
                text="info"
                className="text-center shadow my-2"
                onClick={() => setBookSelected(book.id)}
              >
                <Card.Body>{book.name}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col>
        <BookDetail bookId={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
