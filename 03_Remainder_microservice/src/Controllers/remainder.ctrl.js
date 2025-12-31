const {
  createService,
  deleteService,
  filterByDateService,
  getByIdService,
  updateService,
  getPendingMailService,
  updateNotificationService,
} = require("../Services/remainder.service");

const createCtrl = async (req, res) => {
  try {
    const datares = req.body;

    const response = await createService(datares);
    return res.status(201).json({
      message: "Successfully to Create a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Ctrl level (creating)");
    return res.status(501).json({
      message: "Failed to Create a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const updateNotificationCtrl = async (req, res) => {
  try {
    const datares = req.body.status;
    const id = req.query.id;

    const response = await updateNotificationService(id, datares);
    return res.status(201).json({
      message: "Successfully to Update a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Ctrl level (creating)");
    return res.status(501).json({
      message: "Failed to update a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};
const updateCtrl = async (req, res) => {
  try {
    const datares = req.body;
    const id = req.query.id;

    const response = await updateService(id, datares);
    return res.status(201).json({
      message: "Successfully to Update a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Ctrl level (creating)");
    return res.status(501).json({
      message: "Failed to update a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getByIdCtrl = async (req, res) => {
  try {
    const datares = req.query.id;
    // console.log(datares);

    const response = await getByIdService(datares);
    return res.status(201).json({
      message: "Successfully to get  a Ticket by id ",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(
      "Something went wrong in Ctrl level (getingByIdCtrl)"
    );
    return res.status(501).json({
      message: "Failed to get  a Ticket By Id",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getPendingMailCtrl = async (req, res) => {
  try {
    const response = await getPendingMailService();
    return res.status(201).json({
      message: "Successfully to get Pending Ticket  ",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Ctrl level (getingPendingMail)");
    return res.status(501).json({
      message: "Failed to get  Pending Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};
const deleteCtrl = async (req, res) => {
  try {
    const id = req.body.id;

    const response = await deleteService(id);
    return res.status(201).json({
      message: "Successfully to delete a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Ctrl level (deleting)");
    return res.status(501).json({
      message: "Failed to delete a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

const getByDateRangeCtrl = async (req, res) => {
  try {
    const datares = req.body;
    const response = await filterByDateService(datares);
    return res.status(201).json({
      message: "Successfully to delete a Ticket",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Ctrl level (deleting)");
    return res.status(501).json({
      message: "Failed to delete a Ticket",
      success: false,
      data: {},
      err: error.message || error,
    });
  }
};

module.exports = {
  createCtrl,
  updateCtrl,
  deleteCtrl,
  getByIdCtrl,
  getByDateRangeCtrl,
  getPendingMailCtrl,
  updateNotificationCtrl
};
