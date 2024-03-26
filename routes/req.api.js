const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const requestController = require("../controllers/request.controller");

router.post("/", authController.authenticate, requestController.addRequest);
router.get(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  requestController.getReqAdmin
);
router.delete(
  "/:id",
  authController.authenticate,
  authController.checkAdminPermission,
  requestController.deleteReqItem
);

module.exports = router;
