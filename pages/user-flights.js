import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Email.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as dayjs from "dayjs";

// Component List
import Layout from "../components/Layout";
import UserFlightList from "../components/userFlightList";
import CheapestFlightsItem from "../components/CheapestFlightsItem";

import { useUser } from "@auth0/nextjs-auth0";

export default function Ref() {
  // Console.log test
  console.log(`env ${process.env.NEXT_PUBLIC_LOCALHOST}`);
  const { user, error, isLoading } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [minimalHoliday, setMinimalHolday] = useState("");
  const [maximumHoliday, setMaximumHoliday] = useState("");
  const [requiredDateStart, setRequiredDateStart] = useState();
  const [requiredDateEnd, setRequiredDateEnd] = useState();
  const [loading, setLoading] = useState()

  // State specifically for /email
  const [typedState, setTypedState] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    setLoading(isLoading)
    console.log(loading)
    // declare the data fetching function
    const fetchData = async () => {
      await getFlightsBySub(user.sub);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [isLoading]);

  // State for managed dates

  const getFlightsBySub = async (userSub) => {
    console.log(
      `I'm making a call to /get-references-by-email with the email: ${email}`
    );
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_HTTP_LOCAL_WEB ||
          "https://skyscannerplusweb.herokuapp.com"
        }/api/users/get-flights-by-sub`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cors: "no-cors",
          body: JSON.stringify({post:userSub}),
        }
      );
      console.log("Sent");
      console.log(response);
      if (response.ok === true) {
        toast.success("Email found on database!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const data = await response.json();
        // Destructure Result
        const { result, message } = data;
        setResult(data);
      } else {
        console.log("Nothing was found");
        toast.error("That email address was not found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(result)

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Your flights by login key</title>
          <meta name="description" content="Find your flight by reference" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>
            {`Here's your flights by`}{" "}
            <span className={styles.flight}>Login Key</span>{" "}
          </h1>
        </div>
        <main className={styles.main}>
          {/* <div>
            <div className={styles.referenceInput}>
              <h3>Your Email Address</h3>
              <div>
                <div>
                  <label>Your Email Address</label>
                  <input
                    type="text"
                    value={typedState}
                    onChange={(e) => setTypedState(e.target.value)}
                  />
                </div>
                <input type="submit" onClick={() => getEmail(typedState)} />
              </div>
            </div>
          </div> */}
          {/* Check if flight exists */}
          {result?.length > 0 && (
            <>
              <div className={styles.inputForm}>
                <h3>References</h3>
                <div className={styles.flightsContainer}>
                  {" "}
                  {result.map((element, index) => {
                    console.log(element);
                    return <UserFlightList key={index} element={element} />;
                  })}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}