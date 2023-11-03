const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const orderFood = (req, res) => {
  db.account
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((account) => {
      db.student
        .findOne({
          where: {
            Account_id: account.id,
          },
        })
        .then((dataStudent) => {
          // const newOrdersId = db.orders.max("id") ? db.orders.max("id") + 1 : 1;
          // const newOrderDetailsId = db.orders_details.max("id")
          //   ? db.orders_details.max("id") + 1
          //   : 1;
          db.orders
            .max("id")
            .then((maxOrderId) => {
              // return res.status(200).json({
              //   id :newStudentId
              // })
              db.order_details.max("id").then((maxOrderDetailId) => {
                const newOrderId = maxOrderId ? maxOrderId + 1 : 1;

                // Create a new order
                db.orders
                  .create({
                    id: newOrderId,
                    stu_id: dataStudent.id,
                    order_date: Date.now(),
                    Note: req.body.note,
                    Order_status: true,
                  })
                  .then((newOrder) => {

                    const newOrderDetailId = maxOrderDetailId
                      ? maxOrderDetailId + 1
                      : 1;

                    db.order_details
                      .create({
                        order_id: newOrder.id, 
                        menu_id: req.body.productIds, 
                        Number: req.body.Number,
                        Price: req.body.Price,
                        Total_money: req.body.Total_money,
                      })

                      // Wait for all order details to be createda

                      .then((orderDetails) => {
                        return res.status(200).json({
                          success: true,
                          message: "Order created successfully",
                          order: newOrder,
                          orderDetails: orderDetails,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        return res.status(500).json({
                          success: false,
                          message: "Error creating order details",
                          err: err.errors,
                          orderDetailsPromises: orderDetailsPromises,
                        });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                      success: false,
                      message: "Lỗi khi tạo bảng",
                    });
                  });
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(200).json({
                success: false,
                message: "Lỗi khi lấy id bảng order",
              });
            });
        })

        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Lỗi khi lấy dl bảng student",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        success: false,
        message: "Không tìm thấy tài khoản",
      });
    });
};

const buyingTicket = (req, res) => {
  db.account
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((account) => {
      db.student
        .findOne({
          where: {
            Account_id: account.id,
          },
        })
        .then((dataStudent) => {
          db.orders
            .findOne({
              where: {
                stu_id: dataStudent.id,
              },
            })
            .then((dataOrders) => {
              db.order_details
                .findOne({
                  where: {
                    order_id: dataOrders.id,
                  },
                })
                .then((dataOrdersDetails) => {
                  db.menu
                    .findOne({
                      where: {
                        stu_id: dataOrders.id,
                      },
                    })
                    .then((dataMenu) => {
                      db.payment
                        .findOne({
                          where: {
                            Order_id: dataOrders.id,
                          },
                        })
                        .then((dataPayment) => {
                          db.payment_method
                            .findOne({
                              where: {
                                id: dataOrders.id,
                              },
                            })
                            .then((dataPaymentMethod) => {
                              db.stu_id
                                .findOne({
                                  where: {
                                    id: dataOrders.id,
                                  },
                                })
                                .then((dataPaymentMethod) => {})

                                .catch((err) => {
                                  console.log(err);
                                  return res.status(200).json({
                                    success: false,
                                    message: "Lỗi khi lấy dl bảng menu",
                                  });
                                });
                            })

                            .catch((err) => {
                              console.log(err);
                              return res.status(200).json({
                                success: false,
                                message: "Lỗi khi lấy dl bảng menu",
                              });
                            });
                        })
                        .catch((err) => {
                          console.log(err);
                          return res.status(200).json({
                            success: false,
                            message: "Lỗi khi lấy dl bảng payment",
                          });
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res.status(200).json({
                        success: false,
                        message: "Lỗi khi lấy dl bảng menu",
                      });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(200).json({
                    success: false,
                    message: "Lỗi khi lấy dl bảng orders_detail",
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              return res.status(200).json({
                success: false,
                message: "Lỗi khi lấy dl bảng orders",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Lỗi khi lấy dl bảng student",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        success: false,
        message: "Không tìm thấy tài khoản",
      });
    });
};

module.exports = {
  orderFood,
  buyingTicket,
};
