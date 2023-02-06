export interface IworkType {
  hourlyWage: string;
  startTime: string;
  endTime: string;
  workDay: [workDay: {}];
}

export interface WorkType {
  placeName: string;
  placeColor: string;
  placeId: number;
  salaryDay?: number;
}
