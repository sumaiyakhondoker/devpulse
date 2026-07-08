import { Router} from "express";
import { issueController } from "./issue.controller";
import { UserRoles } from "../../types";
import auth from "../../middleware/auth";

const router = Router()


router.post('/', auth(), issueController.createIssue)
router.get('/', issueController.getAllIssues)
router.get('/:id', issueController.getSingleIssue)
router.patch('/:id',auth(), issueController.updateIssue)
router.patch('/status/:id',auth(), issueController.updateIssueStatus)
router.delete('/:id', auth(UserRoles.maintainer), issueController.deleteIssue)
export const issueRoute = router