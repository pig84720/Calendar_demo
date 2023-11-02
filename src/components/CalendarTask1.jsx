import { React, useState, useEffect } from 'react';
import './Calendar.css';

const CalendarTask1 = () => {
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

    const handleDayClick = (date) => {
        if (startDate && !endDate) {
            if (date.getTime() < startDate.getTime()) {
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    const handlePreviousMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
        setStartDate(null);
        setEndDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
        setStartDate(null);
        setEndDate(null);
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
                        const today = new Date();
                        const isToday = day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                        const pastMonth = index < firstDay; 
                        const isSelectedStart = startDate instanceof Date && date.getTime() === startDate.getTime();
                        const isSelectedEnd = endDate instanceof Date && date.getTime() === endDate.getTime();
                        const isInRange = startDate instanceof Date && endDate instanceof Date && date >= startDate && date <= endDate;
        
                        return (
                            <div 
                                key={index} 
                                className={`day ${isInRange ? 'selected-range' : ''} ${isSelectedStart ? 'selected-start' : ''} ${isSelectedEnd ? 'selected-end' : ''} ${isToday ? 'today' : ''} ${pastMonth ? 'past-month' : ''}`}
                                onClick={() => !pastMonth && handleDayClick(date)}
                            >
                                {day} 日
                            </div>
                        );
                    })}
                </div>
        </div>
    );
};

export default CalendarTask1;
