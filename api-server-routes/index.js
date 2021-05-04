const routes = require('express').Router();
const orderId = require('order-id')('supersecret'); // https://www.npmjs.com/package/order-id
const attributeNamespace = 'https://pizza42.local';
const _ = require('lodash');

// normally I would prefer type checking here, but that is what typescript is for. 
const routesModule = function(checkJwt) {
  // fake database of orders. 
  // !!WARNING!!, if server restarts OR Heroku does not do persistence on load balancing multiple instances
  // you may not see these orders.
  const orders = {};

  // submits order for specific user
  routes.post("/orderpizza", checkJwt, (request, response) => {

    // Perform backend validation to some degree. In a prod setting, this would be more rigorous in real life
    // validating schema etc 
    if(request.body.orderFor.length < 1 ) {
      // end user should never see this because error handling is done in GUI
      // this is for users programatically accessing Pizza42 API
      return response.send(400, {error: "orderFor_invalid"});
    }

    // used Auth Pipeline rule to get email verified and added to access token
    if(!request.user[`${attributeNamespace}emailVerified`])  {
      // end user should never see this because error handling is done in GUI
      // this is for users programatically accessing Pizza42 API
      return response.send(401, {error: "email_not_verified"});
    }

    // Note - request.user.sub should be enough for a primary key, however, marketing wants emails
    // In Auth 0, I added "Add email to access token" rule in Auth Pipeline and created a namespace

    // if user doesn't exist by email, make first entry in our fake database
    if(!orders[request.user.sub]) {
      orders[request.user.sub] = [];
    }
     
    // add order entry
    const order = { ...request.body };
    order.id = orderId.generate();
    order.createdOn = orderId.getTime(order.id);
    order.email = request.user[`${attributeNamespace}email`]
    orders[request.user.sub].push(order);
    order.crustType = _.startCase(order.crustType);
    order.orderFor = _.startCase(order.orderFor);

    response.send({
      msg: "Order successfully completed",
      order: order
    });
  });

  // gets order history for single user
  routes.get("/myOrders", checkJwt, (request, response) => {

    response.send({
      order: orders[request.user.sub]
    });
  });
  
  return routes;
}

module.exports = routesModule;