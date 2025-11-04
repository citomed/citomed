"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCloseCircleOutline } from "react-icons/io5";
import Paragraph from "../Shared/Paragraph/Paragraph"; // Assuming this path is correct

const POPUP_STORAGE_KEY = "dynamicPopupState";
const MORNING_HOUR = 9; // 9 AM
const NIGHT_HOUR = 0; // 12 AM (midnight of the next day, effectively 23:59:59 of the current day)

const Popup = ({ params, data, read_more }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupState, setPopupState] = useState(null);
  const overlayDiv = useRef();

  const data_start_time = data?.start_date; // "25.06.2025"
  const data_finish_time = data?.finish_date; // "28.06.2025"

  // Function to parse date string from "DD.MM.YYYY" to a Date object
  const parseDateString = (dateString) => {
    if (!dateString) return null; // Handle null or undefined date strings

    // Regular expression to check for DD.MM.YYYY format
    const dateRegex =
      /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    if (!dateRegex.test(dateString)) {
      console.warn(`Invalid date format: ${dateString}.  Expected DD.MM.YYYY`);
      return null;
    }

    const [day, month, year] = dateString.split(".").map(Number);
    // Month is 0-indexed in JavaScript Date, so subtract 1
    return new Date(year, month - 1, day);
  };

  // Function to get today's date as YYYY-MM-DD string
  const getTodayDateString = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Function to generate random times within the allowed window
  const generateRandomScheduledTimes = useCallback(
    (countToSchedule, baseTime) => {
      if (countToSchedule <= 0) return [];

      const scheduled = [];
      const today = new Date(baseTime); // Use baseTime's date part
      const dayStart = new Date(today);
      dayStart.setHours(MORNING_HOUR, 0, 0, 0);

      const dayEnd = new Date(today);
      // If MORNING_HOUR is 9 and NIGHT_HOUR is 0 (midnight), it means 9AM to end of day
      // So dayEnd should be 23:59:59 of 'today'
      dayEnd.setHours(23, 59, 59, 999);

      // Ensure baseTime is within the allowed window for today, or use MORNING_HOUR
      let effectiveBaseTime = Math.max(baseTime, dayStart.getTime());
      if (effectiveBaseTime >= dayEnd.getTime()) {
        // If baseTime is already past the window for today, no more popups for today
        return [];
      }

      for (let i = 0; i < countToSchedule; i++) {
        // Generate random time between effectiveBaseTime and dayEnd
        const randomTimestamp =
          effectiveBaseTime +
          Math.random() * (dayEnd.getTime() - effectiveBaseTime);

        const randomDate = new Date(randomTimestamp);
        // Ensure it's still within 9 AM to 11:59 PM window
        if (
          randomDate.getHours() >= MORNING_HOUR &&
          randomDate.getTime() <= dayEnd.getTime()
        ) {
          scheduled.push(randomDate.getTime());
        } else {
          // If somehow it falls outside, try again (or just generate fewer)
          // For simplicity, we'll just push what we have, could make this more robust
        }
      }
      return scheduled.sort((a, b) => a - b); // Sort them chronologically
    },
    []
  );

  // Load state from localStorage on mount and initialize
  useEffect(() => {
    if (!data || typeof data.count !== "number" || data.count <= 0) {
      console.warn(
        "Popup: Invalid or missing data.count. Popup will not be managed."
      );
      return;
    }

    // Check if the current date is within the start and finish dates
    const startDate = parseDateString(data_start_time);
    const finishDate = parseDateString(data_finish_time);
    const now = new Date();

    if (startDate && finishDate) {
      if (now < startDate || now > finishDate) {
        // Current date is outside the allowed range, so don't show the popup
        setIsVisible(false);
        return;
      }
    } else {
      // If start or finish date is missing, you might want to handle this differently.
      // For example, show the popup if either is missing, or hide it.
      // Here, I'm choosing to show it if either is missing.  You can adjust this logic.
      console.warn(
        "Popup: Missing start_date or finish_date. Popup will be shown."
      );
    }

    const storedStateRaw = localStorage.getItem(POPUP_STORAGE_KEY);
    let loadedState = storedStateRaw ? JSON.parse(storedStateRaw) : null;
    const todayString = getTodayDateString();
    const initialTotalShows = data.count; // e.g., 6

    let newState;
    let shouldShowNow = false;

    if (
      loadedState &&
      loadedState.date === todayString &&
      loadedState.initialTotalShows === initialTotalShows
    ) {
      // Same day, same initial count. Continue with existing state.
      newState = { ...loadedState };
    } else {
      // New day, or initial count changed, or first time ever. Reset.
      const showsRemainingToday = initialTotalShows - 1; // e.g., 6 - 1 = 5 more random shows
      const now = Date.now();

      newState = {
        date: todayString,
        initialTotalShows: initialTotalShows,
        showsLeftForRandom: showsRemainingToday, // How many more to schedule randomly
        scheduledTimes:
          showsRemainingToday > 0
            ? generateRandomScheduledTimes(showsRemainingToday, now)
            : [],
        shownCountToday: 1, // The initial one is shown now
        lastInteractionTime: now, // Time of this first show
      };
      shouldShowNow = true; // Show because it's the first one of the day/reset
    }

    setPopupState(newState);
    localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(newState));

    if (shouldShowNow) {
      setIsVisible(true);
    }
  }, [data, generateRandomScheduledTimes, data_start_time, data_finish_time]); // Rerun if data.count changes or on mount

  // Effect to check for scheduled popups
  useEffect(() => {
    // Check if the current date is within the start and finish dates
    const startDate = parseDateString(data_start_time);
    const finishDate = parseDateString(data_finish_time);
    const now = new Date();

    if (startDate && finishDate) {
      if (now < startDate || now > finishDate) {
        // Current date is outside the allowed range, so don't show the popup
        setIsVisible(false);
        return;
      }
    } else {
      // If start or finish date is missing, you might want to handle this differently.
      // For example, show the popup if either is missing, or hide it.
      // Here, I'm choosing to show it if either is missing.  You can adjust this logic.
      console.warn(
        "Popup: Missing start_date or finish_date. Popup will be shown."
      );
    }

    if (
      !popupState ||
      popupState.showsLeftForRandom <= 0 ||
      popupState.scheduledTimes.length === 0
    ) {
      return; // No need to check if no shows left or not initialized
    }

    const checkInterval = setInterval(() => {
      const now = Date.now();
      const updatedState = JSON.parse(localStorage.getItem(POPUP_STORAGE_KEY)); // Get fresh state

      if (
        !updatedState ||
        updatedState.date !== getTodayDateString() ||
        updatedState.showsLeftForRandom <= 0
      ) {
        clearInterval(checkInterval);
        return;
      }

      // Check if any scheduled time has passed and popup is not visible
      const nextScheduledTime = updatedState.scheduledTimes[0]; // They are sorted

      if (nextScheduledTime && now >= nextScheduledTime && !isVisible) {
        const newPopupState = {
          ...updatedState,
          showsLeftForRandom: updatedState.showsLeftForRandom - 1,
          shownCountToday: updatedState.shownCountToday + 1,
          scheduledTimes: updatedState.scheduledTimes.slice(1), // Remove the shown time
          lastInteractionTime: now,
        };

        setPopupState(newPopupState);
        localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(newPopupState));
        setIsVisible(true);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval); // Cleanup on unmount or dependency change
  }, [popupState, isVisible, data_start_time, data_finish_time]); // Rerun if popupState changes or visibility changes

  const closePopup = () => {
    overlayDiv?.current?.classList?.add("active");
    setIsVisible(false);
    const now = Date.now();
    // Update lastInteractionTime in localStorage so we don't immediately re-trigger
    // if a scheduled time was very close to the close time.
    // The main logic for decrementing counts is handled when a popup *becomes* visible.
    const currentPopupState = JSON.parse(
      localStorage.getItem(POPUP_STORAGE_KEY)
    );
    if (currentPopupState) {
      const updatedState = { ...currentPopupState, lastInteractionTime: now };
      localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(updatedState));
      setPopupState(updatedState); // Update local React state as well
    }
  };

  // Early return if outside the date range
  const startDate = parseDateString(data_start_time);
  const finishDate = parseDateString(data_finish_time);
  const now = new Date();

  if (startDate && finishDate) {
    if (now < startDate || now > finishDate) {
      return null; // Don't render anything if outside the date range
    }
  } else {
    // If start or finish date is missing, you might want to handle this differently.
    // For example, show the popup if either is missing, or hide it.
    // Here, I'm choosing to show it if either is missing.  You can adjust this logic.
    console.warn(
      "Popup: Missing start_date or finish_date. Popup will be shown."
    );
  }

  if (!isVisible || !data) {
    return null; // Don't render anything if not visible or no data
  }

  return (
    <>
      <div
        onClick={closePopup}
        ref={overlayDiv}
        className="mobile-menu-overlay-2 overflow-x-hidden block fixed left-0 top-0 bottom-0 right-0 z-[500] overlay "
      />
      <div className="fixed z-[550] top-[50%] left-[50%] translate-x-[-50%] bg-[#fff] border border-[--bg-f6] translate-y-[-50%] shadow-lg w-[792px] lg:w-[95%] h-[638px] lg:h-[450px] md:h-max rounded-[40px] md:rounded-[20px] overflow-hidden p-[40px] lg:p-[20px] md:p-[10px]">
        <div className="grid grid-cols-12 gap-[24px] h-full ">
          <div className="col-span-7 md:col-span-12 h-full">
            {data?.image && (
              <Image
                width={1000}
                height={558}
                src={`${process.env.NEXT_PUBLIC_PICTURE}/${data?.image}`}
                alt={data?.text || "Popup Image"}
                className="h-full w-full object-cover lg:object-contain lg:h-[400px] md:h-[250px]" //
              />
            )}
          </div>
          <div className="col-span-5 md:col-span-12 h-full flex flex-col">
            <div className="pt-[104px] md:pt-0 flex-grow md:flex md:justify-center md:items-center md:flex-col">
              <Paragraph
                text={data.text}
                customStyle="text-[--color-blue] text-[16px] md:text-[13px] md:text-center"
              />
              <div className="mt-[40px]">
                <Link
                  className="w-max bg-[--bg-55] flex items-center gap-[12px] text-[#fff] capitalize py-[17px] px-[40px] md:px-[20px] md:py-[10px] rounded-[60px] text-[14px]"
                  href={`/${params}/${data?.link}`}
                >
                  {read_more}
                  <span>
                    <img src="/right.svg" alt="Read more" className="" />
                  </span>
                </Link>
              </div>
            </div>
            <span
              onClick={closePopup}
              className="absolute top-10 right-10 text-[#000] text-[30px] cursor-pointer" // Adjusted top/right, added cursor
            >
              <IoCloseCircleOutline />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
