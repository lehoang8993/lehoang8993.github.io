import React, { useMemo } from 'react';
import { SolarDate } from '../types/lunar';
import { convertSolar2Lunar, getDayHoangDao } from '../utils/lunarSolarEngine';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarMonthViewProps {
  currentDate: SolarDate;
  selectedDate: SolarDate;
  onSelectDate: (date: SolarDate) => void;
  onMonthChange: (month: number, year: number) => void;
}

export const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
  onMonthChange,
}) => {
  const currentMonth = selectedDate.month;
  const currentYear = selectedDate.year;

  // Days in month
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth, 0).getDate();
  }, [currentYear, currentMonth]);

  // First day of the month (0 = Sun, 1 = Mon...)
  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth - 1, 1).getDay();
  }, [currentYear, currentMonth]);

  // Days in previous month
  const daysInPrevMonth = useMemo(() => {
    return new Date(currentYear, currentMonth - 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  const WEEK_DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Build calendar matrix
  const calendarCells = useMemo(() => {
    const cells = [];

    // Prev month padding
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const lunar = convertSolar2Lunar(day, prevMonth, prevYear, 7);
      cells.push({
        day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        lunar,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const lunar = convertSolar2Lunar(day, currentMonth, currentYear, 7);
      const jd = lunar.jd;
      const dayChiIndex = (jd + 1) % 12;
      const hoangDao = getDayHoangDao(lunar.month, dayChiIndex);
      cells.push({
        day,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        lunar,
        isHoangDao: hoangDao.isHoangDao,
      });
    }

    // Next month padding to fill rows of 7
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
      const lunar = convertSolar2Lunar(i, nextMonth, nextYear, 7);
      cells.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        lunar,
      });
    }

    return cells;
  }, [currentYear, currentMonth, daysInMonth, firstDayOfWeek, daysInPrevMonth]);

  return (
    <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-5 shadow-xs">
      {/* Month & Year Navigation Header */}
      <div className="flex items-center justify-between mb-4 border-b border-stone-200/90 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-200/60 text-stone-700 transition-colors cursor-pointer"
            title="Tháng trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-200/60 text-stone-700 transition-colors cursor-pointer"
            title="Tháng sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="font-editorial text-xl font-bold text-stone-900 ml-1">
            Tháng {currentMonth} / {currentYear}
          </span>
        </div>

        {/* Quick select dropdowns */}
        <div className="flex items-center gap-2">
          <select
            value={currentMonth}
            onChange={(e) => onMonthChange(Number(e.target.value), currentYear)}
            className="text-xs bg-white border border-stone-300 rounded px-2 py-1 text-stone-700 cursor-pointer focus:outline-none focus:border-amber-700"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={(e) => onMonthChange(currentMonth, Number(e.target.value))}
            className="text-xs bg-white border border-stone-300 rounded px-2 py-1 text-stone-700 cursor-pointer focus:outline-none focus:border-amber-700"
          >
            {Array.from({ length: 41 }, (_, i) => 2000 + i).map((y) => (
              <option key={y} value={y}>
                Năm {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {WEEK_DAYS.map((wd, index) => (
          <div
            key={wd}
            className={`text-xs font-semibold py-1 ${
              index === 0 ? 'text-red-700' : index === 6 ? 'text-amber-800' : 'text-stone-500'
            }`}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((cell, idx) => {
          const isSelected =
            cell.day === selectedDate.day &&
            cell.month === selectedDate.month &&
            cell.year === selectedDate.year;

          const isToday =
            cell.day === currentDate.day &&
            cell.month === currentDate.month &&
            cell.year === currentDate.year;

          const isSunday = idx % 7 === 0;
          const isSpecialLunar = cell.lunar.day === 1 || cell.lunar.day === 15;

          return (
            <button
              key={idx}
              onClick={() => onSelectDate({ day: cell.day, month: cell.month, year: cell.year })}
              className={`min-h-[64px] sm:min-h-[72px] p-1.5 rounded-lg text-left flex flex-col justify-between transition-all relative cursor-pointer border ${
                isSelected
                  ? 'bg-amber-100/90 border-amber-600 shadow-xs ring-1 ring-amber-500/50'
                  : isToday
                  ? 'bg-red-50/60 border-red-300'
                  : cell.isCurrentMonth
                  ? 'bg-white hover:bg-stone-100/80 border-stone-200/70'
                  : 'bg-stone-50/50 hover:bg-stone-100/50 border-stone-200/40 opacity-40'
              }`}
            >
              {/* Top row: Solar day + Hoang Dao indicator */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-sm sm:text-base font-bold tabular-nums ${
                    isSelected
                      ? 'text-amber-950'
                      : isSunday
                      ? 'text-red-700'
                      : cell.isCurrentMonth
                      ? 'text-stone-900'
                      : 'text-stone-400'
                  }`}
                >
                  {cell.day}
                </span>

                {cell.isHoangDao && cell.isCurrentMonth && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    title="Ngày Hoàng Đạo"
                  />
                )}
              </div>

              {/* Bottom row: Lunar day */}
              <div className="text-right w-full">
                <span
                  className={`text-[11px] sm:text-xs tabular-nums block font-medium ${
                    isSpecialLunar
                      ? 'text-red-700 font-bold'
                      : isSelected
                      ? 'text-amber-900'
                      : 'text-stone-500'
                  }`}
                >
                  {cell.lunar.day === 1
                    ? `${cell.lunar.day}/${cell.lunar.month}`
                    : cell.lunar.day}
                  {cell.lunar.day === 1 && cell.lunar.isLeap ? 'N' : ''}
                </span>
                {isSpecialLunar && (
                  <span className="text-[9px] text-red-600 block leading-tight">
                    {cell.lunar.day === 1 ? 'Mùng 1' : 'Rằm'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend / Footer Notes */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 mt-4 pt-3 border-t border-stone-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ngày Hoàng Đạo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>Mùng 1 / Ngày Rằm (15)</span>
          </div>
        </div>
        <div>
          <span>Số nhỏ góc dưới là ngày Âm lịch</span>
        </div>
      </div>
    </div>
  );
};
