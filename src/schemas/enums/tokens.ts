export enum TokenExpiration {
    Access = 5 * 60, // 5 hrs
    Refresh = 7 * 24 * 60 * 60, // 7 days
    RefreshIfLessThan = 4 * 24 * 60 * 60,
}