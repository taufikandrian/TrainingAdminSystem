export interface User {
  id            : string;
  fullName      : string;
  accountName   : string;
  email         : string;
  division      : {
    divisionCode: String;
    divisionDescription: String;
    divisionName: String;
    id: String;
    jobFamily: {
      familyCode: String;
      familyDescription: String;
      familyName: String;
      id: String;
    };
  };
  grade         : {
    gradeCode: String;
    gradeDescription: String;
    gradeName: String;
    id: String;
  };
  roleList: [
    {
      id: String;
      roleCode: String;
      roleDescription: String;
      roleName: String;
    }
  ],
  status: String
}
