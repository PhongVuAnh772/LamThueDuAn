const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const createMenu = (req, res) => {
  db.menu
    .max("id")
    .then((idMenuMax) => {
      const newidMenu = idMenuMax ? idMenuMax + 1 : 1;
      db.menu.create({
          id: newidMenu,
          menu_name: req.body.menu_name,
          Price: req.body.Price,
          Menu_type: req.body.Menu_type,
          Menu_description: req.body.Menu_description,
          Menu_rating_svg: req.body.Menu_rating_svg,
          Menu_image: req.body.Menu_image,
        })
        .then((menuCreated) => {
          return res.status(200).json({
            success: true,
            message:"Tạo menu thành công",
            menuCreated: menuCreated
          });
        })
        .catch((err) => {
          return res.status(200).json({
            err: err.message,
            success: false,
          });
        });
    })
    .catch((err) => {
      return res.status(200).json({
        err: err.message,
        success: false,
      });
    });
};
const getMenu = (req, res) => {
    db.menu
    .findAll()
    .then((menus) => {
      return res.status(200).json({
        success: true,
        message: "Menu retrieved successfully",
        menus: menus,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        err: err.message,
        success: false,
        message: "Error retrieving menu",
      });
    });
};

module.exports = {
  getMenu,
  createMenu
};
