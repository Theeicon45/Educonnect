import { useEffect, useState } from "react";
import { makeTimeTable } from "lesson-schedule-react";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

const TimetableComponent = makeTimeTable({
  title: "Lesson Schedule",
  themeColor: "light",
});

const Table = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeWeekNumber, setActiveWeekNumber] = useState(moment().isoWeek()); // Get the current ISO week

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/teacher/upcoming-classes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log response to check structure

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response format");
        }

        // Format the response correctly and ensure lessons repeat weekly
        const formattedSchedules = data.map((classItem) => {
          let lessonDate = moment.unix(classItem.lesson_date); // Convert from UNIX timestamp

          while (lessonDate.isBefore(moment(), "day")) {
            lessonDate = lessonDate.add(7, "days");
          }

          return {
            lessonPair: {
              start_time: classItem.lessonPair?.start_time?.substring(0, 5) || "00:00",
              end_time: classItem.lessonPair?.end_time?.substring(0, 5) || "00:00",
            },
            lesson_date: lessonDate.unix(), // Convert back to UNIX timestamp for `lesson-schedule-react`
            auditorium: { name: classItem.auditorium?.name || "Unknown" },
            subject: { name: classItem.subject?.name || "No Subject" },
            trainingType: { name: classItem.trainingType?.name },
            employee: { name: classItem.employee?.name || "Unknown Teacher" },
          };
        });

        setSchedules(formattedSchedules);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Upcoming Classes</h2>

      {loading ? (
        <div className="flex justify-center items-center h-24">
          <ClipLoader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="w-full max-w-screen-lg mx-auto">
            <TimetableComponent schedules={schedules} activeWeekNumber={activeWeekNumber} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
