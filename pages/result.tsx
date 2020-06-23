import { useRouter } from "next/router";
import useSWR from "swr";

import { Container, Row, Spinner } from "react-bootstrap";

export default function Result() {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  return (
    <Container className="p-3">
      <Row>
        <h1>Playing Cool!</h1>
      </Row>

      {data ? (
        <Row>
          <h3>Session ID:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Row>
      ) : (
        <Spinner animation="border" />
      )}
    </Container>
  );
}
