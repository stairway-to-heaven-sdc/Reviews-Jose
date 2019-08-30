import http from "k6/http";
import { Trend, Rate,  } from "k6/metrics";
import { sleep , check} from "k6";

var myTrend = new Trend("my_trend");
var myRate = new Rate("my_rate");

export let options = {
  stages: [
      { duration: "30s", target: 100 },
       { duration: "30s", target: 400 },
       { duration: "30s", target: 900 },
      //  { duration: "30s", target: 1000 },
      //  { duration: "30s", target: 3000 },
      //  { duration: "2m", target: 5000 },
      //  { duration: "2m", target: 8000 },
      //  { duration: "2m", target: 10000 },
      //  { duration: "60s", target: 8000 },
      //  { duration: "60s", target: 5000 },
      //  { duration: "30s", target: 1000 },
      //  { duration: "60s", target: 500 },
      //  { duration: "60s", target: 100 },
   ]
};  

export default function() {
//   myRate.add(res.error_code);
    let random =  Math.floor(Math.random() * (10000000 - 9000000)) + 9000000;
    let res = http.get(`http://localhost:3002/`)
    check(res, {
        "is status 200": (r) => r.status === 200,
        "transaction time OK": (r) => r.timings.duration < 200
    });
  sleep(1);
};