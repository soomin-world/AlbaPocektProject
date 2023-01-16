import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { workDays } from "../../atoms";

type Value = [DateObject];

const MultiCalendar = () => {
  const workDays: string[] = [];
  const onChangeHandler = (d: Value) => {
    d?.map((e: DateObject) => {
      workDays.push(e.year + "-" + e.month.number + "-" + e.day);
    });
    //   workDays.push(d.year + "-" + d.month.number + "-" + d.day);
  };
  console.log(workDays);
  return (
    <>
      <DatePicker
        plugins={[<DatePanel />]}
        onChange={(d: [DateObject]) => {
          onChangeHandler(d);
        }}
        multiple
      />
    </>
  );
};

export default MultiCalendar;
