const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const userInformation = (req, res) => {
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
              if (dataOrders) {
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
                                return res.status(200).json({
                                  success: true,
                                  message: "Lấy dữ liệu cá nhân thành công",
                                  account: account,
                                  dataStudent: dataStudent,
                                  orderCreated: orderCreated,
                                  dataOrders: dataOrders,
                                  dataOrdersDetails: dataOrdersDetails,
                                  dataMenu: dataMenu,
                                  dataPayment: dataPayment,
                                  dataPaymentMethod: dataPaymentMethod,
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
              } else {
                return res.status(200).json({
                  success: true,
                  message:
                    "Lấy dữ liệu khách hàng thành công và lịch sử mua hàng trống",
                  account: account,
                  dataStudent: dataStudent,
                });
              }
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

const historyBuying = (req, res) => {
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
            .findAll({ // Sử dụng findAll thay vì findOne
              where: {
                stu_id: dataStudent.id,
              },
            })
            .then((dataOrders) => {
              if (dataOrders.length > 0) { // Kiểm tra có dữ liệu orders hay không
                const orderIds = dataOrders.map((order) => order.id);
                db.order_details
                  .findAll({
                    where: {
                      order_id: orderIds,
                    },
                  })
                  .then((dataOrdersDetails) => {
                    if (dataOrdersDetails.length > 0) { // Kiểm tra có dữ liệu order_details hay không
                      const menuIds = dataOrdersDetails.map((orderDetail) => orderDetail.menu_id);
                      db.menu
                        .findAll({
                          where: {
                            id: menuIds,
                          },
                        })
                        .then((dataMenu) => {
                          return res.status(200).json({
                            success: true,
                            message: "Lấy dữ liệu cá nhân thành công",
                            account: account,
                            dataStudent: dataStudent,
                            dataOrders: dataOrders,
                            dataOrdersDetails: dataOrdersDetails,
                            dataMenu: dataMenu,
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                          return res.status(200).json({
                            success: false,
                            message: "Lỗi khi lấy dữ liệu bảng menu",
                          });
                        });
                    } else {
                      return res.status(200).json({
                        success: true,
                        message: "Dữ liệu lịch sử mua hàng trống",
                        account: account,
                        dataStudent: dataStudent,
                        dataOrders: dataOrders,
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                      success: false,
                      message: "Lỗi khi lấy dữ liệu bảng order_details",
                    });
                  });
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Dữ liệu lịch sử mua hàng trống",
                  account: account,
                  dataStudent: dataStudent,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(200).json({
                success: false,
                message: "Lỗi khi lấy dữ liệu bảng orders",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Lỗi khi lấy dữ liệu bảng student",
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
  userInformation,
  historyBuying,
};
