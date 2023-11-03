const express = require("express");
const router = express.Router();
const index = require("../controllers/auth");
const personalController = require("../controllers/personalController")
const orderController = require("../controllers/orderController")
const menuController = require("../controllers/listMenuController")
const ticketController = require("../controllers/ticketController")

router.post("/signup", index.signUp);
router.post("/login", index.signIn);
router.post("/user-informations",personalController.userInformation)
router.post("/history-buying",personalController.historyBuying)
router.post("/order",orderController.orderFood)
router.post("/ticket-buying",orderController.buyingTicket)
router.post("/create-menu",menuController.createMenu)
router.post("/add-ticket-type",ticketController.addTicketType)
router.post("/ticket-user",ticketController.getTicketUser)
router.get("/get-menu",menuController.getMenu)
router.post("/ticket-user-buy",ticketController.buyTicket)
router.get("/get-all-ticket",ticketController.getAllTicket)
router.post("/change-status-ticket",ticketController.changeStatusTicket)

router.use("/", (req, res, next) => {
  res.status(404).json({ error: "router không tồn tại" });
});

module.exports = router;

