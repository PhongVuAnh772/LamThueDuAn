const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const signIn = (req, res) => {
  db.account
    .findOne({
      where: {
        Email: req.body.email,
      },
    })
    .then((dataAccount) => {
      db.student
        .findOne({
          where: {
            Account_id: dataAccount.id,
          },
        })
        .then((studentData) => {
          bcryptjs.compare(
            req.body.password,
            dataAccount.Password,
            (err, compareRes) => {
              if (err) {
                return res.status(200).json({
                  success: false,
                  message:
                    "Có lỗi trong khi kiểm tra mật khẩu, vui lòng thử lại",
                  err: err.message,
                  
                  matching: req.body.password
                });
              } else if (compareRes) {
                const token = jwt.sign(
                  { email: req.body.email },
                  "secret",
                  { expiresIn: "1h" }
                );
                return res.status(200).json({
                  success: true,
                  message: "Đăng nhập thành công",
                  data: dataAccount,
                  student_info: studentData,
                  dataAccount:dataAccount,
                  token: token
                });
              } else {
                return res.status(200).json({
                  success: false,
                  message: "Xác thực không thành công",
                });
              }
            }
          );
        })
        .catch((err) => {
          return res.status(200).json({
            message: err.message,
            err: "Có lỗi khi get dữ liệu student",
            success: false,
          });
        });
    })
    .catch((err) => {
      return res.status(200).json({
        message: err.message,
        err: "Không tìm thấy tài khoản với gmail trên",
        success: false,
      });
    });
};

const isAuth = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Không xác thực thành công" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token: " + token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "could not decode the token",
    });
  }
  if (!decodedToken) {
    return res.status(500).json({ success: false, message: "unauthorized" });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "here is your resource" });
  }
};
const signUp = (req, res) => {
  bcryptjs.hash(req.body.password, 16, (err, passwordHash) => {
    if (err) {
      return res.status(200).json({
        message: "Không mã hóa được mật khẩu",
      });
    } else if (passwordHash) {
      db.account.max("id").then((maxAccountId) => {
        const newAccountId = maxAccountId ? maxAccountId + 1 : 1;
        db.student
          .max("id") // Lấy giá trị lớn nhất của CustomerId
          .then((maxStudentId) => {
            const newStudentId = maxStudentId ? maxStudentId + 1 : 1;
            db.account
              .create({
                id: newAccountId,
                Email: req.body.email,
                Password: passwordHash,
              })
              .then((accountCreated) => {
                db.student
                  .create({
                    id: newStudentId,
                    Account_id: accountCreated.id,
                    stu_Fname: req.body.stu_Fname,
                    stu_Class: req.body.stu_Class,
                    stu_address: req.body.stu_Address,
                  })
                  .then((studentCreated) => {
                    return res.status(200).json({
                      success: true,
                      message: "Đăng ký thành công",
                      accountCreated: accountCreated,
                      studentCreated: studentCreated,
                    });
                  })
                  .catch((err) => {
                    return res.status(200).json({
                      success: false,
                      message: err.message,
                    });
                  });
              })
              .catch((err) => {
                return res.status(200).json({
                  success: false,
                  message: err.message,
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Lỗi khi lấy giá trị lớn nhất của CustomerId",
              error: error.message,
            });
          });
      });
    }
  });
};

module.exports = {
  signUp,
  signIn,
  isAuth,
};
