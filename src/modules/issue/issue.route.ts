import { Router} from "express";
import { issueController } from "./issue.controller";
import { UserRoles } from "../../types";
import auth from "../../middleware/auth";

const router = Router()


router.post('/', auth(UserRoles.contributor, UserRoles.maintainer), issueController.createIssue)
router.get('/', issueController.getAllIssues)
router.get('/:id', issueController.getSingleIssue)
router.patch('/:id',auth(UserRoles.contributor, UserRoles.maintainer), issueController.updateIssue)
router.patch('/issuedetails/:id',auth( UserRoles.maintainer), issueController.updateIssueStatus)
router.delete('/:id', auth(UserRoles.maintainer), issueController.deleteIssue)




export const issueRoute = router 