export interface IHeaderProps {
  currentMonth: Date;
  prevMonth: () => Date;
  nextMonth: () => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
}

export interface ITodosProps {
  day: Date;
  Month: string;
  todos: ITodos[];
}

type ITodos = {
  todoId: number;
  year: string;
  month: string;
  date: string;
  placeName: string;
  workingTime: string;
  startTime: string;
  endTime: string;
  hourlyWage: string;
  dayWage: string;
  dayTotalWage: string;
  color: string;
};
