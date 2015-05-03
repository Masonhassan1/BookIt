import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const BookingForm = () => {
  const { hallId, hallName } = useParams();
  console.log(hallId);

  const [bookingData, setBookingData] = useState(
    {
      eventManager: "",
      eventName: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      email: "",
      bookedHallId: hallId,
      bookedHallName: hallName,
      organizingClub: "",
      phoneNumber: "",
      altNumber: ""


    });



  const userContact = async () => {
    try {
      const response = await axios.get("http://localhost:9002/getdata", {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);
      setBookingData({
        ...bookingData,
        eventManager: data.name,
        email: data.email,
        phoneNumber: data.phone,
      });

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  // handle change here

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookingData({ ...bookingData, [name]: value });
  };

  console.log(bookingData);

  // send to backend

  const bookingForm = async (e) => {
    e.preventDefault();
    const { eventManager,
      eventName,
      eventDate,
      startTime,
      endTime,
      email,
      bookedHallId,
      bookedHallName,
      organizingClub,
      phoneNumber,
      altNumber } = bookingData;

    try {
      const response = await axios.post(
        "http://localhost:9002/bookings",
        {
          eventManager,
          eventName,
          eventDate,
          startTime,
          endTime,
          email,
          bookedHallId,
          bookedHallName,
          organizingClub,
          phoneNumber,
          altNumber
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data) {
        console.log("Message not send");
      } else {
        alert("Message send");
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div class="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
        <div class="text-center mb-16">
          <p class="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
            Book Hall
          </p>
          <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Book Your <span class="text-indigo-600">Hall </span>Now
          </h3>
        </div>

        <form method="POST" class="w-full">


          <div class="flex flex-wrap -mx-3 mb-6">


            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                for="grid-event-manager"
              >
                Event Manager Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-manager"
                type="text"
                value={bookingData.eventManager}
                name="eventManager"
                onChange={handleInputs}
                placeholder="Event Manager Name"
              />
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>


            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-event-name"
              >
                Event Name
              </label>
              <input
                value={bookingData.eventName}
                name="eventName"
                onChange={handleInputs}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-name"
                type="text"
                placeholder="Event Name"
              />
            </div>
          </div>




          <div class="flex flex-wrap -mx-3 mb-6">


            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-organizing-club"
              >
                Organizing Club
              </label>
              <input
                value={bookingData.organizingClub}
                name="organizingClub"
                onChange={handleInputs}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-organizing-club"
                type="text"
                placeholder="Organizing Club"
              />
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>


            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-event-date"
              >
                Event Date
              </label>
              <input
                value={bookingData.eventDate}
                name="eventDate"
                onChange={handleInputs}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-date"
                type="date"
                placeholder="Event Date"
              />
            </div>
          </div>





          <div class="flex flex-wrap -mx-3 mb-6">


            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                for="grid-start-time"
              >
                Start Time
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-start-time"
                type="time"
                value={bookingData.startTime}
                name="startTime"
                onChange={handleInputs}
                placeholder="Start Time"
              />
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-end-time"
              >
                End Time
              </label>
              <input
                value={bookingData.endTime}
                name="endTime"
                onChange={handleInputs}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-end-time"
                type="time"
                placeholder="End Time"
              />
            </div>
          </div>



          <div class="flex flex-wrap -mx-3 mb-6">


            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                for="grid-hall-id"
              >
                Hall Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-hall-id"
                type="text"
                value={bookingData.bookedHallId}
                name="bookedHallId"
                onChange={handleInputs}
                placeholder="Hall Id"
                disabled
              />
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>


            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                for="grid-hall-name"
              >
                Hall Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-hall-name"
                type="text"
                value={bookingData.bookedHallName}
                name="bookedHallName"
                onChange={handleInputs}
                placeholder="Hall Name"
                disabled
              />
            </div>
          </div>



          <div class="flex flex-wrap -mx-3 mb-6">


            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                for="grid-phone-number"
              >
                Phone Number
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-phone-number"
                type="number"
                value={bookingData.phoneNumber}
                name="phoneNumber"
                onChange={handleInputs}
                placeholder="Phone Number"

              />
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>


            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                for="grid-alt-number"
              >
                Alternate Number
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-alt-number"
                type="number"
                value={bookingData.altNumber}
                name="altNumber"
                onChange={handleInputs}
                placeholder="Alternate Number"

              />
            </div>
          </div>






















          <div class="flex flex-wrap -mx-3 mb-6">
            {/* <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Your Message
              </label>
              <textarea
                value={bookingData.message}
                name="message"
                onChange={handleInputs}
                rows="10"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div> */}


            <div class="flex justify-between w-full px-3">
              {/* <div class="md:flex md:items-center">
        <label class="block text-gray-500 font-bold">
          <input class="mr-2 leading-tight" type="checkbox"/>
          <span class="text-sm">
            Send me your newsletter!
          </span>
        </label>
      </div> */}
              <button
                onClick={bookingForm}
                class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                Send Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
