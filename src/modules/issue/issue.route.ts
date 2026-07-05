import { Router} from "express";
import { issueController } from "./issue.controller";
import { UserRoles } from "../../types";
import auth from "../../middleware/auth";

const router = Router()

router.post('/', auth(UserRoles.maintainer,UserRoles.contributor), issueController.createIssue)
router.get('/', issueController.getAllIssues)
router.get('/:id', issueController.getSingleIssue)
router.patch('/:id',auth(), issueController.updateIssue)
router.delete('/:id', auth(), issueController.deleteIssue)
// router.delete('/:id', auth('maintainer') issueController.deleteIssue)



export const issueRoute = router 