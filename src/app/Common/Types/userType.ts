export const UserTypeAdmin = 'admin';
export const UserTypeCompany = 'company';
export const UserTypeFarmer = 'farmer';

const UserTypeListList = [UserTypeAdmin, UserTypeCompany, UserTypeFarmer];

/**
 * Value Object representing an bot status
 */
export type UserType = typeof UserTypeListList[number];