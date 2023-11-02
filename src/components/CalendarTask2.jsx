import { React, useState, useEffect } from 'react';
import './Calendar.css';

const CalendarTask2 = () => {
    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);
    const totalDaysLastMonth = daysInMonth(year, month - 1);

    useEffect(() => {
        const calendarDays = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            calendarDays.push(new Date(year, month - 1, totalDaysLastMonth - i));
        }

        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(new Date(year, month, i));
        }

        setDays(calendarDays);
    }, [currentDate]);

    const handleDayClick = (day, index, pastMonth) => {
        if(pastMonth) {
            return;
        };
        const selectedDate = new Date(year, month, day);

        if (startDate && !endDate) {
            if (selectedDate.getTime() < startDate.getTime()) {
                setStartDate(selectedDate);
                setEndDate(null);
            } else {
                setEndDate(selectedDate);
            }
        } else {
            setStartDate(selectedDate);
            setEndDate(null);
        }
    };

    const handlePreviousMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button className="button" onClick={handlePreviousMonth}>&lt;</button>
                <span>{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</span>
                <button className="button" onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days-grid">
                {days.map((date, index) => {
                    const day = date.getDate();
                    const thisDate = date;
                    const today = new Date();
                    const isToday = thisDate.getDate() === today.getDate() && thisDate.getMonth() === today.getMonth() && thisDate.getFullYear() === today.getFullYear();
                    const pastMonth = index < firstDay;

                    const isSelectedStart = startDate instanceof Date && thisDate.getTime() === startDate.getTime();
                    const isSelectedEnd = endDate instanceof Date && thisDate.getTime() === endDate.getTime();
                    const isInRange = startDate instanceof Date && endDate instanceof Date && thisDate >= startDate && thisDate <= endDate;

                    return (
                        <div 
                            key={index} 
                            className={`day ${isInRange ? 'selected-range' : ''} ${isSelectedStart ? 'selected-start' : ''} ${isSelectedEnd ? 'selected-end' : ''} ${isToday ? 'today' : ''} ${pastMonth ? 'past-month' : ''}`}
                            onClick={() => handleDayClick(day, index, pastMonth)}
                        >
                            {day} 日
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarTask2;
