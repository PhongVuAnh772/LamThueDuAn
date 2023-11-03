const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const changeStatusTicket = (req, res) => {
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
        .then((student) => {
          db.ticket_details
            .findOne({
              where: {
                stu_id: student.id,
              },
            })
            .then((getTicketUser) => {
              if (getTicketUser !== null) {
                getTicketUser.update(
                  {
                    ticket_status: true,
                  },
                  
                ).then((ticketUpdated) => {
                  return res.status(200).json({
                  success: true,
                  message: "Đổi trạng thái vé thành công",
                  ticketUpdated:ticketUpdated,
                  ticketUser: getTicketUser,
                  student: student,
                  account: account,
                });
                })
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Người dùng chưa đăng ký vé",
                  ticketUser: getTicketUser,
                  student: student,
                  account: account,
                });
              }
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Không tìm thấy người dùng",
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
const getTicketUser = (req, res) => {
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
        .then((student) => {
          db.ticket_details
            .findOne({
              where: {
                stu_id: student.id,
              },
            })
            .then((getTicketUser) => {
              if (getTicketUser !== null) {
                db.ticket
                  .findOne({
                    where: {
                      id: getTicketUser.ticket_id,
                    },
                  })
                  .then((ticketType) => {
                    return res.status(200).json({
                      success: true,
                      message: "Lấy thông tin vé thành công",
                      ticketType: ticketType,
                      ticketUser: getTicketUser,
                      student: student,
                      account: account,
                    });
                  });
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Người dùng chưa đăng ký vé",
                  ticketUser: getTicketUser,
                  student: student,
                  account: account,
                });
              }
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Không tìm thấy người dùng",
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

const getAllTicket = (req, res) => {
  db.ticket_details
    .findAll()
    .then((ticketDetails) => {
      res.json({ success: true, data: ticketDetails });
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu từ bảng ticket_details:", error);
      res.status(500).json({ success: false, message: "Lỗi khi lấy dữ liệu" });
    });
};
const addTicketType = (req, res) => {
  try {
    db.ticket
      .max("id")
      .then((idTicketMax) => {
        const newCreditCardId = idTicketMax ? idTicketMax + 1 : 1;
        db.ticket
          .create({
            id: newCreditCardId,
            ticket_description: req.body.ticket_description,
            ticket_price: req.body.ticket_price,
          })
          .then((ticketTypeNew) => {
            return res.status(200).json({
              success: true,
              table: ticketTypeNew,
              message: "Tạo bảng thành công",
            });
          })
          .catch((err) => {
            return res.status(200).json({
              success: false,
              err: err.message,
              message: "Có lỗi khi tạo bảng",
            });
          });
      })
      .catch((err) => {
        return res.status(200).json({
          success: false,
          err: err.message,
          message: "Có lỗi khi tìm id của ticket",
        });
      });
  } catch (err) {
    return res.status(200).json({
      success: false,
      err: err.message,
      message: "Có lỗi phía server",
    });
  }
};

const buyTicket = (req, res) => {
  db.ticket_details
    .create({
      id: 1,
      stu_id: 1,
      ticket_id: 1,
      ticket_expDate: Date.now(),
      ticket_status: 0,
    })
    .then((ticketTypeNew) => {
      return res.status(200).json({
        success: true,
        table: ticketTypeNew,
        message: "Tạo bảng thành công",
      });
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        err: err.message,
        message: "Có lỗi khi tạo bảng",
      });
    });
};
module.exports = {
  getTicketUser,
  addTicketType,
  buyTicket,
  getAllTicket,
  changeStatusTicket
};
