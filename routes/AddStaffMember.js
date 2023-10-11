var express = require("express");
var router = express.Router();
var AddStaffMember = require("../modals/AddStaffMember");
var {
  verifyToken,
  hashPassword,
  hashCompare,
  createToken,
} = require("../authentication");
var JWT = require("jsonwebtoken");
var JWTD = require("jwt-decode");
var Workorder = require("../modals/Workorder");


// Add staffmember
router.post("/addstaffmember", async (req, res) => {
    try {
  
      var data = await AddStaffMember.create(req.body);
      res.json({
        statusCode: 200,
        data: data,
        message: "Add staffmember Successfully",
      });
    } catch (error) {
      res.json({
        statusCode: 500,
        message: error.message,
      });
    }
  });


  // get staffmember

  router.get("/addstaffmember", async (req, res) => {
    try {
      var data = await AddStaffMember.find({});
      data.reverse();
      res.json({
        statusCode: 200,
        data: data,
        message: "Read All staffmember",
      });
    } catch (error) {
      res.json({
        statusCode: 500,
        message: error.message,
      });
    }
  });


// delete staffmember
// router.delete("/delete_staffmember/:id", async (req, res) => {
//   try {
//     const staffMemberId = req.params.id;

//     // Check if the staff member is referenced in any workorder document
//     const workOrderWithStaffMember = await Workorder.findOne({ staffmember_name: staffMemberId });

//     console.log("staffMemberId:", staffMemberId);
//     console.log("workOrderWithStaffMember:", workOrderWithStaffMember);

//     if (workOrderWithStaffMember) {
//       // If the staff member is referenced in a workorder, return an error
//       return res.status(400).json({
//         statusCode: 400,
//         message: `Cannot delete staff member. Referenced in work order(s): ${workOrderWithStaffMember.map(order => order._id).join(', ')}`,
//       });
//     }

//     // If the staff member is not referenced in work orders, proceed with deletion
//     const result = await AddStaffMember.findByIdAndDelete(staffMemberId);

//     if (!result) {
//       return res.status(404).json({
//         statusCode: 404,
//         message: "Staff member not found.",
//       });
//     }

//     res.json({
//       statusCode: 200,
//       data: result,
//       message: "Staff member deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: err.message,
//     });
//   }
// });



router.delete("/delete_staffmember", async (req, res) => {    
  try {
      let result = await AddStaffMember.deleteMany({
        _id: { $in: req.body },
      });
      res.json({
        statusCode: 200,
        data: result,
        message: "staffmember Deleted Successfully",
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        message: err.message,
      });
    }
  });
// router.delete("/delete_staffmember/:id", async (req, res) => {
//   try {
//     const staffMemberId = req.params.id;

//     // Check if the staff member's name is used in the work orders collection
//     const matchingWorkOrders = await Workorder.find({ staffmember_name: staffMemberId });

//     if (matchingWorkOrders.length > 0) {
//       // If matching work orders are found, prevent deletion
//       return res.status(400).json({
//         statusCode: 400,
//         message: "Staff member is already used in work orders. Cannot delete.",
//       });
//     }
//     // If no matching work orders found, proceed with deletion
//     const result = await AddStaffMember.findOneAndDelete({ _id: staffMemberId });

//     if (!result) {
//       // If the record with the specified ID doesn't exist
//       return res.status(404).json({
//         statusCode: 404,
//         message: "Staff member not found",
//       });
//     }

//     res.json({
//       statusCode: 200,
//       data: result,
//       message: "Staff member deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: err.message,
//     });
//   }
// });

// router.delete("/delete_staffmember", async (req, res) => {
//   try {
//     const staffMemberIds = req.body;

//     // Check if there are any work orders associated with the staff member IDs
//     const workOrdersWithStaffMembers = await Workorder.find({
//       _id: { $in: staffMemberIds },
//     });

//     // If work orders are found, do not delete the staff members
//     if (workOrdersWithStaffMembers.length > 0) {
//       return res.status(400).json({
//         statusCode: 400,
//         message: "Cannot delete staff members with associated work orders",
//         data: workOrdersWithStaffMembers,
//       });
//     }

//     // If no work orders are associated, proceed to delete the staff members
//     const result = await AddStaffMember.deleteMany({
//       _id: { $in: staffMemberIds },
//     });

//     res.json({
//       statusCode: 200,
//       data: result,
//       message: "Staff members deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: err.message,
//     });
//   }
// });


    //edit staffmember 
router.put("/staffmember/:id", async (req, res) => {
    try {
      let result = await AddStaffMember.findByIdAndUpdate(req.params.id, req.body);
      res.json({
        statusCode: 200,
        data: result,
        message: "staffmember Data Updated Successfully",
      });
    } catch (err) {
      res.json({
        statusCode: 500,
        message: err.message,
      });
    }
  });



  
//find staffmember 
router.get("/find_staffmember", async (req, res) => {
  try {
    var data = await AddStaffMember.find().select("staffmember_name")
    res.json({
      statusCode: 200,
      data: data,
      message: "read all staffmember",
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});


  //get staffmember  table  summary data id wise 

router.get("/staffmember_summary/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameter
    var data = await AddStaffMember.findById(userId);
    if (data) {
      res.json({
        data: data,
        statusCode: 200,
        message: "summaryGet Successfully",
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "summary not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});


// Login staffmember
router.post("/login", async (req, res) => {
  try {
    const user = await AddStaffMember.findOne({ staffmember_email: req.body.staffmember_email });
    if (!user) {
      return res.json({ statusCode: 403, message: "User doesn't exist" });
    }
    const isMatch = await AddStaffMember.findOne({ staffmember_password: req.body.staffmember_password });
    if (!isMatch) {
      return res.json({ statusCode: 402, message: "Enter Valid Password" });
    }

    // console.log("User found:", user);
    // console.log("Password match:", isMatch);

    const tokens = await createToken({
      _id: user._id,
      staffmember_email: user.staffmember_email,
    });

    if (isMatch) {
      res.json({
        statusCode: 200,
        message: "User Authenticated",
        token: tokens,
        data: user,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

module.exports = router;