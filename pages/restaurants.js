/* /pages/restaurants.js */
import { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Cart from "../components/Cart/";
import AppContext from "../context/AppContext";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function Restaurants() {
  const [query, updateQuery] = useState("");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <h1>Loading ...</h1>;
  if (data.restaurant) {
    const { restaurant } = data;
    const { dishes } = restaurant;
    const filteredDishes = dishes.filter((dish) => {
      if (dish.name.toLocaleLowerCase().includes(query)) {
        return true;
      }
      return false;
    });

    return (
      <>
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="search">
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    Search Dish
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      updateQuery(e.target.value.toLocaleLowerCase())
                    }
                    value={query}
                  />
                </InputGroup>
              </div>
            </Col>
          </Row>

          <style jsx>
            {`
              .search {
                margin: 20px;
                width: 500px;
              }
            `}
          </style>
        </div>

        <h1>{restaurant.name}</h1>
        <Row>
          {filteredDishes.map((res) => (
            <Col xs="6" sm="3" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={res.image.url}
                />

                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>

                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(res)}
                  >
                    {" "}
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}

          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }

  return <h1>Add Dishes</h1>;
}
export default Restaurants;
