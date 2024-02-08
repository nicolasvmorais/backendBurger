const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

const checkUrl = (req, res, next) => { 

  console.log(`Metódo:${req.method},URL:${req.url}`)
  next();
}


const orders = [];

app.post("/order",checkUrl,(req, res) => {
  const { orderName, clientName } = req.body;

  const newOrder = { id:uuidv4(),orderName,clientName, };
  orders.push(newOrder)
  return res.json(newOrder)
});

app.get("/orders",checkUrl,(req,res) =>{
    
    return res.json(orders)
})

app.delete("/orders/:id",checkUrl,(req,res) =>{
  const orderId = req.params.id;
  const searchOrderIndex = orders.findIndex((order) => order.id === orderId);

  if (searchOrderIndex !== -1) {
    orders.splice(searchOrderIndex, 1);
    return res.status(200).json({message:"Pedido excluido com sucesso! 🗑️"})
  }

  else {
    return res.status(400).json({message:"Houve um erro na sua requisição! 🚫"})
  }});






app.listen(port, () => {
  console.log(`Server started on ${port}🚀`);
});
