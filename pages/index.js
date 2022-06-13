import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [ref, setRef] = useState();
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [minimalHoliday, setMinimalHolday] = useState();
  const [maximumHoliday, setMaximumHoliday] = useState();
  const [requiredDateStart, setRequiredDateStart] = useState();
  const [requiredDateEnd, setRequiredDateEnd] = useState();

  // State for managed dates

  // Form outputs strings so we need to transform the data properly
  const transformFormToDataTypes = () => {
    const departureDateTransform = new Date(departureDate);
    const returnDateeTransform = new Date(returnDate);
    const minimalHolidayTransform = Number(minimalHoliday);
    const maximumHolidayTransform = Number(maximumHoliday);
    let requiredDateStartTransform;
    let requiredDateEndTransform;
    if (requiredDateStart && requiredDateEnd) {
      requiredDateStartTransform = new Date(requiredDateStart);
      requiredDateEndTransform = new Date(requiredDateEnd);
    }
    return {
      departureDateTransform,
      returnDateeTransform,
      minimalHolidayTransform,
      maximumHolidayTransform,
      requiredDateStartTransform,
      requiredDateEndTransform,
    };
  };

  // Makes sure the code is set correctly for API consumption
  const formValidation = ({
    departureDateTransform,
    returnDateeTransform,
    minimalHolidayTransform,
    maximumHolidayTransform,
    requiredDateStartTransform,
    requiredDateEndTransform,
  }) => {
    // Validation that's needed to be completed
    // 1) Max Holiday needs to be greater than or equal to minimal holiday
    // 2) Return Date needs to be greater than or equal to departure date
    // 3) RequiredDateEnd needs to be greater than or equal to RequiredDateStart
    if (
      maximumHolidayTransform >= minimalHolidayTransform &&
      (requiredDateEndTransform > requiredDateStartTransform ||
        requiredDateStartTransform === undefined ||
        requiredDateEndTransform === undefined) &&
      returnDateeTransform > departureDateTransform
    ) {
      console.log("Validation successful");
      const payload = {
        user: {
          name: "Alan Reid",
          email: "alandreid@hotmail.co.uk",
        },
        ref: "f1-abu-2022",
        flights: {
          departure: "Dublin",
          arrival: "Abu Dhabi (Any)",
        },
        dates: {
          departureDate: "2022-11-08",
          returnDate: "2022-11-29",
          minimalHoliday: 10,
          maximumHoliday: 14,
          requiredDayStart: requiredDateStartTransform,
          requiredDayEnd: requiredDateEndTransform,
        },
        workerPID: 0,
        isBeingScanned: false,
        scannedLast: 0,
        nextScan: 0,
      };
      if (
        requiredDateStartTransform === undefined ||
        requiredDateEndTransform === undefined
      ) {
        console.log(payload);
        delete payload.dates.requiredDayStart;
        delete payload.dates.requiredDayEnd;
        console.log(`Changes have been made`);
      }
      console.log(payload);
      // Payload is ready
      return payload;
    } else {
      console.log("Something is missing");
      toast("Please check the form", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const validateAndSend = async () => {
    const testObject = transformFormToDataTypes();
    const payload = formValidation(testObject);
    try {
      const response = await fetch("https://skyscannerplusweb.herokuapp.com/api/users/create/", {
        method: "POST",
        body: JSON.stringify(payload),
        cors: "no-cors"
      });
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Flight</title>
        <meta name="description" content="Create a flight" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create a <span className={styles.flight}>Flight</span>{" "}
        </h1>
        <div>
          {/* <form> */}
          <div className={styles.inputForm}>
            <h3>General Details</h3>
            <div className={styles.inputCollection}>
              <div className={styles.individualInput}>
                {" "}
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="reference">Reference</label>
                <input
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                  type="text"
                  placeholder="reference"
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email address"
                />
              </div>
            </div>
          </div>
          <div className={styles.inputForm}>
            <h3>Flight information</h3>
            <div className={styles.inputCollection}>
              <div>
                {" "}
                <label htmlFor="departure">Departure</label>
                <input
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  type="text"
                  placeholder="departure"
                />
              </div>
              <div>
                <label htmlFor="arrival">Arrival</label>
                <input
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  type="text"
                  placeholder="arrival"
                />
              </div>
              <div>
                <label htmlFor="departureDate">Departure Date</label>
                <input
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  type="date"
                  placceholder="departure date"
                />
              </div>
              <div>
                <label htmlFor="returnDate">Return Date</label>
                <input
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  type="date"
                  placeholder="return date"
                />
              </div>
              <div>
                <label htmlFor="minimalHoliday">Minimal Holiday Duration</label>
                <input
                  value={minimalHoliday}
                  onChange={(e) => setMinimalHolday(e.target.value)}
                  type="number"
                  placeholder="minimal holiday"
                />
              </div>
              <div>
                <label htmlFor="maximumHoliday">Maximum Holiday Duration</label>
                <input
                  value={maximumHoliday}
                  onChange={(e) => setMaximumHoliday(e.target.value)}
                  type="number"
                  placeholder="maximum holiday"
                />
              </div>
            </div>
          </div>
          <div className={styles.inputForm}>
            <h3>Special Information</h3>
            <div className={styles.inputCollection}>
              <div>
                <label htmlFor="requiredDateBeginning">Beginning</label>
                <input
                  value={requiredDateStart}
                  onChange={(e) => setRequiredDateStart(e.target.value)}
                  type="date"
                  placceholder="departure date"
                />
              </div>
              <div>
                <label htmlFor="requiredDateEnding">Ending</label>
                <input
                  value={requiredDateEnd}
                  onChange={(e) => setRequiredDateEnd(e.target.value)}
                  type="date"
                  placeholder="return date"
                />
              </div>
            </div>
          </div>
          <input
            style={{ marginTop: "30px" }}
            type="submit"
            // onClick={() => {
            //   console.log(name);
            //   console.log({
            //     name,
            //     ref,
            //     email,
            //     departure,
            //     arrival,
            //     departureDate,
            //     returnDate,
            //     minimalHoliday,
            //     maximumHoliday,
            //     requiredDateStart,
            //     requiredDateEnd,
            //   });
            // }}
            onClick={validateAndSend}
          />
          {/* </form> */}
        </div>
      </main>
      <ToastContainer />
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
