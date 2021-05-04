import React from "react";
import { 
  Card, CardText, CardBody, 
  CardTitle, CardSubtitle,
  Container, Row, Col
} from "reactstrap";
import Moment from 'react-moment';

const Ordertile = (props) => (
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.order.crustType} Pizza</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Ordered on {(<Moment format="M-D-YY h:mm A">{props.order.createdOn}</Moment>)} for {props.order.orderFor}</CardSubtitle>
          <Container>
            <Row xs="12">
              <Col xs="2">
                <CardText><b>Quantity:</b></CardText>
              </Col>
              <Col xs="10">
                <CardText>{props.order.quantity}</CardText>
              </Col>
            </Row>
            {props.order.toppings.length !== 0 && <Row xs="12">
              <Col xs="2">
                <CardText><b>Toppings:</b></CardText>
              </Col>
              <Col xs="10">
                {props.order.toppings.map((key) => {
                  return(
                  <Row key={`toppings${key}`}>
                    {key}
                  </Row>
                  );
                })}
              </Col>
            </Row>}
          </Container>
        </CardBody>
      </Card>
);

export default Ordertile;
