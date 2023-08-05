{
  /*File: WeekSelect.js
   Objective: 
   The objective of the page WeekdaysComponent is to create a UI component that allows users to select weekdays by clicking on buttons representing each day.
   The component keeps track of the selected days and provides a callback function (WeekSelector) to notify the parent component about the selected days.

   Here are the more detailed objectives of the WeekdaysComponent:

   Selection of Weekdays: 
   The component renders buttons representing each day of the week (Sunday to Saturday). 
   Users can click on the buttons to select or deselect a particular day.
   The selected days are stored in the selectedDays state using the useState hook.

   Handling Day Clicks: 
   The component provides the handleDayClick function to handle button click events. 
   When a day button is clicked, it checks if the clicked day is already selected (selectedDays array contains the index of the day). 
   If it is selected, the day is removed from the selectedDays array; otherwise, it is added to the array.

   Displaying Selected Days: 
   The component applies CSS classes and styles to the day buttons based on their selection status. 
   If a day is included in the selectedDays array, it applies the "selected" class, sets the button type to "primary" (highlighted appearance),
   and changes the text color to white. Otherwise, the button appears unselected with black text color.

   Callback Function: 
   The component receives a callback function (WeekSelector) as a prop.
   Whenever the selectedDays state changes, the component triggers the WeekSelector callback, passing the updated selectedDays array as an argument.
   This allows the parent component to access and utilize the selected days for further processing or updating the application state.

   User Interface: 
   The component utilizes the Button component from the Ant Design library to create the day buttons. 
   It maps over the days array, which contains the weekday abbreviations, and generates a button for each day. 
   The buttons are rendered in a row within a container div element.

   Styling: 
   The component applies custom styles to the buttons, such as setting the shape to a circle, adding a margin between buttons, and changing the text color based on the selection. 
   The selected buttons have a different background color to indicate their selection.

By achieving these objectives, the WeekdaysComponent provides a user-friendly and interactive way for users to select weekdays. 
It offers flexibility for customization and integration with the parent component through the callback function. 
The component can be easily used in various applications that require weekday selection functionality, such as scheduling or filtering based on specific days of the week

*/
}
import React, { useEffect, useState } from "react";
import { Button } from "antd";
const WeekdaysComponent = ({ WeekSelector, index }) => {
  // State to track the selected days
  const [selectedDays, setSelectedDays] = useState(index);

  // Function to handle day button click
  const handleDayClick = (index) => {
    if (selectedDays.includes(index)) {
      // If the day is already selected, remove it from the selected days
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== index)
      );
    } else {
      // If the day is not selected, add it to the selected days
      setSelectedDays([...selectedDays, index]);
    }
  };

  // Array of weekdays
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  // Effect to trigger the WeekSelector callback when selectedDays change
  useEffect(() => {
    WeekSelector(selectedDays);
  }, [selectedDays]);

  return (
    <div>
      {/* Map over the days array and render a button for each day */}
      {days.map((day, index) => (
        <Button
          key={index}
          // Handle button click event
          onClick={() => handleDayClick(index)}
          // Apply "selected" class to the button if it is included in selectedDays
          className={`button ${
            selectedDays?.includes(index) ? "selected" : ""
          }`}
          // Set button type to "primary" if it is included in selectedDays
          type={selectedDays?.includes(index) ? "primary" : ""}
          // Set button text color based on selection
          style={{
            color: selectedDays?.includes(index) ? "white" : "black",
            marginRight: "10px",
          }}
          // Set button shape to circle
          shape="circle"
        >
          {day}
        </Button>
      ))}
    </div>
  );
};

export default WeekdaysComponent;
