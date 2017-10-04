export interface Period {
  id: String;
  trainingName  : string;
  status  : string;
  trainingDescription: String;
  trainingStartDate: Date;
  trainingEndDate: Date;
  isOpen: Boolean;
  eligibleList: [{}];
  trainingCourses: [{}];
  createdBy: String;
  lastModifiedBy: String;
  deletedBy: String;
}
