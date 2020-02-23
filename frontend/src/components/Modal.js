import React, { Component, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MyToast from "./MyToast";

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }
  genericModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
    };
    const handleBuy = async () => {
      const { price, symbol, shares } = this.props.info;
      await this.props.buy(price, shares, symbol);
      await this.props.refresh();
      setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
      <>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ backgroundColor: "#1e1e6e" }}
        >
          {this.props.label}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body> {this.props.form}</Modal.Body>
          <Modal.Footer>
            <MyToast handleBuy={handleBuy} />
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  render() {
    return <this.genericModal />;
  }
}

export default MyModal;
