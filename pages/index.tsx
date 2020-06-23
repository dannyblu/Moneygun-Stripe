import { loadStripe } from "@stripe/stripe-js";
import "@stripe/stripe-js";
import { Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function Checkout() {
  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    }).then((res) => res.json());

    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
  };

  return (
    <Container className="p-5">
      <Row className="justify-content-md-center">
        <Card body>
          <h3>Stripe Checkout</h3>
          <Button variant="dark" onClick={handleClick}>
            Checkout
          </Button>
        </Card>
      </Row>
    </Container>
  );
}
