import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { adminFilterableFields } from "./admin.contant";
import pick from "../../../shared/pick";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    // console.log(req.query)
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdminService.getAllFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

export const AdminController = {
  getAllFromDB,
};
