const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const boardController = require("../controllers/board.controller");

router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  boardController.createBoard
);
router.get(
  "/",

  boardController.allBoard
),
  router.put(
    "/:id",
    authController.authenticate,
    authController.checkAdminPermission,
    boardController.makeInvisible
  );
router.delete(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  boardController.deleteBoard
);

module.exports = router;
