

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return Math.round(ms2 / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms2 / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms2 / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return plural(ms2, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms2, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms2, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    function plural(ms2, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// src/app.ts
import express from "express";

// src/modules/issue/issue.route.ts
import { Router } from "express";

// src/utility/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error
  });
};
var sendResponse_default = sendResponse;

// src/db/index.ts
import { Pool } from "pg";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env")
});
var config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  access_secret: process.env.ACCESS_SECRET,
  access_expired_time: process.env.ACCESS_EXPIRES_IN
};
var config_default = config;

// src/db/index.ts
var pool = new Pool({
  connectionString: config_default.database_url
});
var initDB = async () => {
  try {
    await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
         id SERIAL PRIMARY KEY,
         name VARCHAR(50) NOT NULL,
         email VARCHAR(50) UNIQUE NOT NULL,
         password TEXT NOT NULL,
         role VARCHAR(20) NOT NULL DEFAULT 'contributor',

         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()

         
         )
        
        `);
    await pool.query(`
         CREATE TABLE IF NOT EXISTS issues(
         id SERIAL PRIMARY KEY,
         title VARCHAR(150) NOT NULL,
         description TEXT NOT NULL,
         type VARCHAR(20) NOT NULL,
         status VARCHAR(20) NOT NULL DEFAULT 'open',
         reporter_id INT NOT NULL, 
         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()

         
         )
        
        `);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log("error from db folder", error);
  }
};

// src/modules/issue/issue.service.ts
var createIssueIntoDB = async (payload, reporterId) => {
  const { title, description, type } = payload;
  const IssueDetails = await pool.query(`
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES($1,$2,$3, $4)
        RETURNING *
        
        `, [title, description, type, reporterId]);
  const result = { ...IssueDetails.rows[0], reporter_id: reporterId };
  return result;
};
var getAllIssuesFromDB = async (queryParams) => {
  const sort = queryParams.sort === "oldest" ? "ASC" : "DESC";
  const status = queryParams.status;
  const type = queryParams.type;
  let query = `SELECT * FROM issues`;
  const conditions = [];
  const values = [];
  if (status) {
    conditions.push(`status=$${values.length + 1}`);
    values.push(status);
  }
  if (type) {
    conditions.push(`type=$${values.length + 1}`);
    values.push(type);
  }
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }
  query += ` ORDER BY created_at ${sort}`;
  const issuesData = await pool.query(query, values);
  const issues = issuesData.rows;
  const reporterIds = issues.map((issue) => issue.reporter_id);
  const uniqueReporterIds = [...new Set(reporterIds)];
  const usersData = await pool.query(`
         SELECT * FROM users WHERE id = ANY($1) 
         `, [uniqueReporterIds]);
  const users = usersData.rows;
  const result = issues.map((issue) => {
    const issueReporter = users.find((user) => user.id === issue.reporter_id);
    const { reporter_id, created_at, updated_at, ...rest } = issue;
    return {
      ...rest,
      reporter: {
        id: issueReporter?.id,
        name: issueReporter?.name,
        role: issueReporter?.role
      },
      created_at,
      updated_at
    };
  });
  return result;
};
var getSingleIssueFromDB = async (id) => {
  const issueDetails = await pool.query(`
        SELECT * FROM issues WHERE id=$1
        `, [id]);
  const issue = issueDetails.rows[0];
  if (!issue) {
    throw new Error("This issue is not found. Please provide a proper issue id");
  }
  const { reporter_id, created_at, updated_at, ...issueRest } = issueDetails.rows[0];
  if (!reporter_id) {
    return null;
  }
  const reporterDetials = await pool.query(`
       SELECT * FROM users WHERE id=$1        
        `, [reporter_id]);
  const reporter = reporterDetials.rows[0];
  const result = {
    ...issueRest,
    reporter: {
      id: reporter?.id,
      name: reporter?.name,
      role: reporter?.role
    },
    created_at,
    updated_at
  };
  return result;
};
var updateIssueIntoDB = async (payload, id, user) => {
  const { title, description, type } = payload;
  const issuesData = await pool.query(`
         SELECT * FROM issues WHERE id=$1
        
         `, [id]);
  const issue = issuesData.rows[0];
  if (!issue) {
    throw new Error("This issue is not found. Please provide a proper issue id");
  }
  if (user.role === "maintainer") {
    const IssueDetails = await pool.query(`
        UPDATE issues 
        SET title = COALESCE($1, title),
        description =COALESCE($2, description) ,
        type =COALESCE($3, type),
        updated_at = NOW()
        WHERE id=$4
        RETURNING *

        `, [title, description, type, id]);
    const result = IssueDetails.rows[0];
    return result;
  } else if (user.role === "contributor") {
    if (user.id === issue.reporter_id && issue.status === "open") {
      const IssueDetails = await pool.query(`
        UPDATE issues 
        SET title = COALESCE($1, title),
        description =COALESCE($2, description) ,
        type =COALESCE($3, type),
        updated_at = NOW()
        WHERE id=$4
        RETURNING *

        `, [title, description, type, id]);
      const result = IssueDetails.rows[0];
      return result;
    }
  }
};
var updateIssueStatusIntoDB = async (payload, id) => {
  const { status } = payload;
  const issuesData = await pool.query(`
         SELECT * FROM issues WHERE id=$1
        
         `, [id]);
  const issue = issuesData.rows[0];
  if (!issue) {
    throw new Error("This issue is not found. Please provide a proper issue id");
  }
  const issueData = await pool.query(`
        UPDATE issues 
        SET status = COALESCE($1, status),
        updated_at = NOW()
        WHERE id=$2
        RETURNING *

        `, [status, id]);
  const result = issueData.rows[0];
  return result;
};
var deleteIssueFromDB = async (id) => {
  const result = await pool.query(`
       DELETE FROM issues WHERE id=$1
        `, [id]);
  return result;
};
var issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  updateIssueStatusIntoDB,
  deleteIssueFromDB
};

// src/types/index.ts
var UserRoles = {
  contributor: "contributor",
  maintainer: "maintainer"
};
var IssueStatus = {
  open: "open",
  in_progress: "in_progress",
  resolved: "resolved"
};

// src/modules/issue/issue.controller.ts
var createIssue = async (req, res, next) => {
  try {
    const reporterId = req?.user?.id;
    const validIssueTypes = ["bug", "feature_request"];
    if (!validIssueTypes.includes(req.body.type)) {
      return sendResponse_default(res, {
        statusCode: 400,
        success: false,
        message: "Please give a valid issue type like 'bug' or 'feature_request' "
      });
    }
    const result = await issueService.createIssueIntoDB(req.body, reporterId);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllIssues = async (req, res, next) => {
  try {
    const queryParams = req.query;
    const result = await issueService.getAllIssuesFromDB(queryParams);
    if (result.length > 0) {
      sendResponse_default(res, {
        statusCode: 200,
        success: true,
        message: "Issues retrived successfully",
        data: result
      });
    } else {
      sendResponse_default(res, {
        statusCode: 404,
        success: false,
        message: "Issues not found. Please create a new issue",
        data: {}
      });
    }
  } catch (error) {
    next(error);
  }
};
var getSingleIssue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await issueService.getSingleIssueFromDB(id);
    if (!result) {
      sendResponse_default(res, {
        statusCode: 404,
        success: false,
        message: "No issue found",
        data: {}
      });
    } else {
      sendResponse_default(res, {
        statusCode: 200,
        success: true,
        message: "Issue retrived successfully",
        data: result
      });
    }
  } catch (error) {
    next(error);
  }
};
var updateIssue = async (req, res, next) => {
  const user = req?.user;
  try {
    const { id } = req.params;
    if (user?.role !== "maintainer" && user?.role !== "contributor") {
      return sendResponse_default(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden. Only contributors and maintainers can update issues."
      });
    }
    const result = await issueService.updateIssueIntoDB(req.body, id, user);
    if (!result) {
      sendResponse_default(res, {
        statusCode: 403,
        success: false,
        message: "No issue updated because contributor can only update his own issue, only if the issue status is open"
      });
    } else {
      sendResponse_default(res, {
        statusCode: 200,
        success: true,
        message: "Issue updated successfully",
        data: result
      });
    }
  } catch (error) {
    next(error);
  }
};
var updateIssueStatus = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const user = req?.user;
    if (user?.role !== "maintainer") {
      return sendResponse_default(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden: only maintainer can update the issue status"
      });
    }
    if (!req.body.status) {
      return sendResponse_default(res, {
        statusCode: 400,
        success: false,
        message: "Please give status property and its value in request body",
        data: {}
      });
    }
    const validStatus = [IssueStatus.open, IssueStatus.in_progress, IssueStatus.resolved];
    if (!validStatus.includes(req.body.status)) {
      return sendResponse_default(res, {
        statusCode: 400,
        success: false,
        message: "Please give proper status value in request body",
        data: {}
      });
    }
    const result = await issueService.updateIssueStatusIntoDB(req.body, id);
    if (!result) {
      sendResponse_default(res, {
        statusCode: 404,
        success: false,
        message: "No issue found"
      });
    } else {
      sendResponse_default(res, {
        statusCode: 200,
        success: true,
        message: "Issue status updated successfully",
        data: result
      });
    }
  } catch (error) {
    next(error);
  }
};
var deleteIssue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await issueService.deleteIssueFromDB(id);
    if (result.rowCount === 0) {
      sendResponse_default(res, {
        statusCode: 404,
        success: false,
        message: "Issue already deleted!",
        data: {}
      });
    } else {
      sendResponse_default(res, {
        statusCode: 200,
        success: true,
        message: "Issue deleted successfully",
        data: {}
      });
    }
  } catch (error) {
    next(error);
  }
};
var issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  updateIssueStatus,
  deleteIssue
};

// src/middleware/auth.ts
import jwt from "jsonwebtoken";
var auth = (...rolesAllowed) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }
      const decoded = jwt.verify(token, config_default.access_secret);
      const result = await pool.query(`
        SELECT * FROM users WHERE id=$1
       
        `, [decoded.id]);
      if (result.rows.length === 0) {
        return sendResponse_default(res, {
          statusCode: 404,
          success: false,
          message: "User not found"
        });
      }
      const user = result.rows[0];
      req.user = user;
      if (req.method === "DELETE" && !rolesAllowed.includes(user.role)) {
        return sendResponse_default(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden. Only maintainers can delete issues."
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth;

// src/modules/issue/issue.route.ts
var router = Router();
router.post("/", auth_default(), issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.patch("/:id", auth_default(), issueController.updateIssue);
router.patch("/status/:id", auth_default(), issueController.updateIssueStatus);
router.delete("/:id", auth_default(UserRoles.maintainer), issueController.deleteIssue);
var issueRoute = router;

// src/middleware/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/modules/auth/auth.route.ts
import { Router as Router2 } from "express";

// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt2 from "jsonwebtoken";
var import_ms = __toESM(require_ms(), 1);
var createUserIntoDB = async (payload) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(`
            INSERT INTO users (name, email, password, role)
            VALUES($1,$2,$3, COALESCE($4, 'contributor'))
            RETURNING *
            
            `, [name, email, hashedPassword, role]);
  delete result.rows[0].password;
  return result;
};
var loginUserIntoDB = async (payload) => {
  const { email, password } = payload;
  const result = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
  if (result.rows.length === 0) {
    throw new Error("Invalid Creadentials");
  }
  const userData = result.rows[0];
  const isPasswordMatched = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatched) {
    throw new Error("Invalid Creadentials");
  }
  const jwtPayload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role
  };
  const token = jwt2.sign(jwtPayload, config_default.access_secret, { expiresIn: config_default.access_expired_time });
  const user = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    created_at: userData.created_at,
    updated_at: userData.updated_at
  };
  return { token, user };
};
var authService = {
  createUserIntoDB,
  loginUserIntoDB
};

// src/modules/auth/auth.controller.ts
var createUser = async (req, res, next) => {
  try {
    const requestedRole = req.body.role ? req.body.role : "contributor";
    const validRoles = [UserRoles.contributor, UserRoles.maintainer];
    const role = requestedRole;
    if (!validRoles.includes(role)) {
      return sendResponse_default(res, {
        statusCode: 400,
        success: false,
        message: "Failed to create user. Please try with a valid role",
        data: {}
      });
    }
    const result = await authService.createUserIntoDB(req.body);
    if (result.rows.length === 0) {
      sendResponse_default(res, {
        statusCode: 400,
        success: false,
        message: "Failed to create user. Please try again ",
        data: {}
      });
    }
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
var loginUser = async (req, res, next) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var authController = {
  createUser,
  loginUser
};

// src/modules/auth/auth.route.ts
var router2 = Router2();
router2.post("/signup", authController.createUser);
router2.post("/login", authController.loginUser);
var authRoute = router2;

// src/app.ts
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ "message": "Welcome to DevPulse!!", author: "Sumaiya Khondoker Nabila" });
});
app.use("/api/auth", authRoute);
app.use("/api/issues", issueRoute);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var port = config_default.port;
var main = () => {
  initDB();
  app_default.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
};
main();
//# sourceMappingURL=server.js.map