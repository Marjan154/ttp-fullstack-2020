import React, { Component, useState } from "react";
import { Button, Modal, Toast, Row, Col } from "react-bootstrap";

const MyToast = props => {
  const [show, setShow] = useState(false);
  const onBuy = async () => {
    setShow(true);
    setTimeout(async () => {
      await props.handleBuy();
    }, 500);
  };
  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Thank You for Buying!</Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
        <Button onClick={() => onBuy()}>Buy</Button>
      </Col>
    </Row>
  );
};

export default MyToast;
