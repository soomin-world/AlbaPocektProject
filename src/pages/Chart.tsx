import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { getFiveMonths, getHours } from "../APIs/chartApi";
import Footer from "../components/footer/Footer";
import LayOut from "../components/layout/LayOut";

const data = {
  thisMonth: {
    labels: ["카페", "영화관", "찜질방"],
    colors: ["#5FCE80", "#6290F0", "#ab51b9d7"],
    series: [44, 70, 20],
  },
  fiveMonth: {
    series: [
      {
        name: "카페",
        data: [31, 40, 28, 52, 100],
      },
      {
        name: "영화관",
        data: [11, 32, 55, 45, 60],
      },
    ],
    colors: ["#6290F0", "#5FCE80"],
    categories: ["2022-09", "2022-10", "2022-11", "2022-12", "2023-01"],
  },
};

const Chart = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
  // let date = new Date().toISOString().slice(0, 7);
  const { data, isLoading, refetch } = useQuery(["getHours"], () =>
    getHours(date.split("-").join(""))
  );
  const { data: fiveMthsData, isLoading: fiveMthsLoading } = useQuery(
    ["getFiveMonths"],
    () => getFiveMonths()
  );

  console.log(date.split("-").join(""));
  console.log(fiveMthsData);

  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <LayOut padding="0 17px 50px 17px">
      <ChartBar>
        <div>나의 근무 통계</div>
        <img src="image/iconMypage.svg" />
      </ChartBar>

      {isLoading ? null : (
        <>
          <SelectMonth>
            <WorkingHours>
              <div>알바포켓님의 일한 시간</div>
              <div>123 시간</div>
            </WorkingHours>
            <input
              type="month"
              value={date}
              onChange={(e) => {
                setDate(() => e.target.value);
                console.log(date);
              }}
            />
          </SelectMonth>

          {/* <ChartText marginTop="0px">
            {date?.slice(5)[0] === "0" ? date.slice(6) : date.slice(5)}월 달
            소득 비중
          </ChartText> */}
          <ReactApexChart
            options={{
              chart: {
                type: "donut",
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270,
                  expandOnClick: false,
                  donut: {
                    size: "50%",
                    // labels: {
                    //   show: true,
                    //   total: {
                    //     showAlways: true,
                    //     show: true,
                    //     label: "총 일한 시간",
                    //     fontSize: "10px",
                    //     color: "black",
                    //   },
                    //   value: {
                    //     fontSize: "15px",
                    //     show: true,
                    //     color: "black",
                    //     offsetY: 0,
                    //   },
                    // },
                  },
                },
              },
              labels: data.labels,
              dataLabels: {
                enabled: false,
              },
              fill: {
                colors: data.colors,
              },
              legend: {
                markers: {
                  fillColors: data.colors,
                },
              },
              responsive: [
                {
                  breakpoint: 600,
                  options: {
                    chart: {
                      width: 250,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
            series={data.series}
            type="donut"
            style={{ width: "250px", margin: "0 auto" }}
          />
        </>
      )}

      {fiveMthsLoading ? null : fiveMthsData?.categories.length <= 1 ? null : (
        <>
          <ChartText marginTop="40px">
            최근 {fiveMthsData?.categories.length}개월 급여
          </ChartText>

          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "area",
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: true },
                labels: { show: false },
                type: "datetime",
                categories: fiveMthsData?.categories,
              },
              yaxis: {
                show: false,
              },
              tooltip: {
                x: {
                  format: "yyyy/MM",
                },
              },
              colors: fiveMthsData?.colors,
              legend: {
                markers: {
                  fillColors: fiveMthsData?.colors,
                },
              },
            }}
            series={fiveMthsData?.series}
            type="area"
            height={250}
            width={340}
          />
        </>
      )}
      <Footer />
    </LayOut>
  );
};
const ChartBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
`;

const ChartText = styled.div<{ marginTop: string }>`
  width: 100%;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
`;

const Input = styled.input`
  width: 120px;
  min-height: 30px;
  font-size: 15px;
  margin: 20px 0px 20px 0px;
`;

const WorkingHours = styled.div`
  font-weight: 400;

  div:first-child {
    font-size: 13px;
    margin-bottom: 5px;
  }
  div:last-child {
    font-size: 24px;
    font-weight: 600;
  }
`;

const SelectMonth = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  input {
    width: 120px;
    min-height: 44px;
    padding: 10px;
    font-size: 15px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    height: 21px;
    border: none;
    border-radius: 8px;
    color: #545456;
    background-color: #f7f7f7;
    /* background: url("image/iconCalendarInput.png") no-repeat right 3px center /
      24px auto; */
  }
  input[type="month"]::-webkit-inner-spin-button,
  input[type="month"]::-webkit-calendar-picker-indicator {
    /* background: transparent;
    -webkit-appearance: none; */
  }
  input:focus {
    outline: none;
  }
`;

export default Chart;
