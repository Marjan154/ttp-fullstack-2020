import React, { Component, useState } from "react";
import { Button, Modal, Toast, Row, Col } from "react-bootstrap";

const MyToast = props => {
  const [show, setShow] = useState(false);
  const onBuy = async () => {
    setShow(true);
    if (props.canBuy) {
      setTimeout(async () => {
        await props.handleBuy();
      }, 650);
    }
  };
  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>
            {props.canBuy
              ? "Thank You for Buying!"
              : "Sorry, you don't have enough to buy!"}
          </Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
        <Button style={{ backgroundColor: "#1e1e6e" }} onClick={() => onBuy()}>
          Buy
        </Button>
      </Col>
    </Row>
  );
};

export default MyToast;
