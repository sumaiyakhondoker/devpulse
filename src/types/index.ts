export type TRoles = 'contributor'|'maintainer'


export const UserRoles= {
    contributor: "contributor",
    maintainer : "maintainer"
} as const

export const IssueStatus= {
    open: "open",
    in_progress : "in_progress",
    resolved : "resolved"

} as const

