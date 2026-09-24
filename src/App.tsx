import React, { useState, useMemo } from 'react';
import { SolarDate } from './types/lunar';
import { getDayDetailedInfo, convertSolar2Lunar } from './utils/lunarSolarEngine';
import { Navbar } from './components/Navbar';
import { CalendarMonthView } from './components/CalendarMonthView';
import { CalendarDailyBlock } from './components/CalendarDailyBlock';
import { DateConverter } from './components/DateConverter';
import { DailyHoroscopeView } from './components/DailyHoroscopeView';
import { HolidaysView } from './components/HolidaysView';
import { AuspiciousDateFinder } from './components/AuspiciousDateFinder';
import { AdBanner } from './components/AdBanner';
import { SideSkyscraperAds } from './components/SideSkyscraperAds';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { Sparkles, Moon, Sun, ShieldCheck, Download } from 'lucide-react';
import heroImage from './assets/images/lunar_calendar_hero_1790151076833.jpg';

export default function App() {
  // Today's date
  const today = useMemo(() => {
    const now = new Date();
    return {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
  }, []);

  const [activeTab, setActiveTab] = useState<'calendar' | 'converter' | 'horoscope' | 'holidays'>('calendar');
  const [selectedDate, setSelectedDate] = useState<SolarDate>(today);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>('privacy');

  // Detailed Day Info calculated on the fly
  const dayDetailedInfo = useMemo(() => {
    return getDayDetailedInfo(selectedDate);
  }, [selectedDate]);

  // Jump to today
  const handleJumpToday = () => {
    setSelectedDate(today);
  };

  const openPolicy = (tab: PolicyTab) => {
    setPolicyTab(tab);
    setPolicyModalOpen(true);
  };

  // When changing month in the month view
  const handleMonthChange = (newMonth: number, newYear: number) => {
    // If selectedDate is in the new month/year, keep day, otherwise set day to 1 or max day
    const maxDay = new Date(newYear, newMonth, 0).getDate();
    const newDay = Math.min(selectedDate.day, maxDay);
    setSelectedDate({ day: newDay, month: newMonth, year: newYear });
  };

  // Formatted current date string for navbar
  const currentDateNavbarText = useMemo(() => {
    const lunar = convertSolar2Lunar(today.day, today.month, today.year, 7);
    return `Hôm nay: ${today.day}/${today.month}/${today.year} (ÂL: ${lunar.day}/${lunar.month})`;
  }, [today]);

  return (
    <div className="min-h-screen bg-parchment text-stone-800 flex flex-col justify-between selection:bg-amber-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onJumpToday={handleJumpToday}
        currentDateText={currentDateNavbarText}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {/* Cultural Hero Header Card */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/20 shadow-md bg-stone-900 text-white min-h-[170px] sm:min-h-[190px] flex flex-col justify-end p-6 sm:p-8">
              <img
                src={heroImage}
                alt="Lịch Âm Dương Cổ Truyền Việt Nam"
                className="absolute inset-0 w-full h-full object-cover opacity-45"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>KHO TÀNG LỊCH PHÁP DÂN TỘC</span>
                </div>
                <h1 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Lịch Vạn Niên & Âm Dương Cát Nhật
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
                  Tính toán thiên văn chuẩn xác theo múi giờ Hà Nội (GMT+7). Cung cấp đầy đủ thông tin Can Chi, Tiết Khí, Giờ Hoàng Đạo, Hướng Xuất Hành và Cát Hung sự vụ mỗi ngày.
                </p>

                {/* Quick interactive status line */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-amber-200 mt-3 pt-3 border-t border-white/15">
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Dương: Ngày {selectedDate.day} tháng {selectedDate.month}, {selectedDate.year}</span>
                  </div>
                  <span className="text-white/40">·</span>
                  <div className="flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                    <span>Âm: Ngày {dayDetailedInfo.lunar.day} tháng {dayDetailedInfo.lunar.month} ({dayDetailedInfo.canChi.day.name})</span>
                  </div>
                  <span className="text-white/40">·</span>
                  <span className="text-emerald-300 font-medium">{dayDetailedInfo.hoangDaoName}</span>
                </div>
              </div>
            </div>

            {/* Calendar Main Layout: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Month Matrix + Auspicious Date Finder */}
              <div className="lg:col-span-7 space-y-6">
                <CalendarMonthView
                  currentDate={today}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  onMonthChange={handleMonthChange}
                />

                <AuspiciousDateFinder
                  currentMonth={selectedDate.month}
                  currentYear={selectedDate.year}
                  onSelectDate={setSelectedDate}
                />
              </div>

              {/* Right Column: Traditional Daily Block (Lốc Lịch Ngày) + Sidebar Ad */}
              <div className="lg:col-span-5 sticky top-20 space-y-4">
                <CalendarDailyBlock
                  dayInfo={dayDetailedInfo}
                  onSelectDate={setSelectedDate}
                />
                <AdBanner slotType="rectangle" />
              </div>
            </div>

            {/* Bottom Leaderboard Ad for Calendar View */}
            <AdBanner slotType="leaderboard" className="mt-8" />
          </div>
        )}

        {/* DATE CONVERTER VIEW */}
        {activeTab === 'converter' && (
          <div className="space-y-8">
            <DateConverter
              onGoToDateInCalendar={(date) => {
                setSelectedDate(date);
                setActiveTab('calendar');
              }}
            />
            <AdBanner slotType="leaderboard" />
          </div>
        )}

        {/* DAILY HOROSCOPE VIEW */}
        {activeTab === 'horoscope' && (
          <div className="space-y-8">
            <DailyHoroscopeView
              selectedDate={selectedDate}
              dayInfo={dayDetailedInfo}
              onSelectDate={setSelectedDate}
            />
            <AdBanner slotType="horizontal" />
          </div>
        )}

        {/* HOLIDAYS VIEW */}
        {activeTab === 'holidays' && (
          <div className="space-y-8">
            <HolidaysView currentYear={selectedDate.year} />
            <AdBanner slotType="leaderboard" />
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200/90 bg-[#F5F1E9] mt-12 py-8 text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-center md:text-left">
              <span className="font-editorial text-base font-bold text-amber-950 block">
                Lịch Âm Việt & Tử Vi Trọn Năm
              </span>
              <p className="text-stone-500 mt-0.5">
                Cơ sở dữ liệu lịch pháp cổ truyền và thiên văn học Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600">
              <button
                onClick={() => setActiveTab('calendar')}
                className="hover:text-amber-900 transition-colors cursor-pointer"
              >
                Lịch Vạn Niên
              </button>
              <button
                onClick={() => setActiveTab('converter')}
                className="hover:text-amber-900 transition-colors cursor-pointer"
              >
                Chuyển Đổi Ngày Tháng
              </button>
              <button
                onClick={() => setActiveTab('horoscope')}
                className="hover:text-amber-900 transition-colors cursor-pointer"
              >
                Tử Vi 12 Con Giáp
              </button>
              <button
                onClick={() => setActiveTab('holidays')}
                className="hover:text-amber-900 transition-colors cursor-pointer"
              >
                Ngày Lễ Trong Năm
              </button>
            </div>

            <div className="text-stone-400 text-center md:text-right">
              <span>Múi giờ Hà Nội (GMT+7) · Đầy đủ 60 Hoa Giáp</span>
            </div>
          </div>

          {/* AdSense Legal Compliance & Privacy Row */}
          <div className="border-t border-stone-200/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <div className="flex items-center gap-1.5 text-stone-600">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span>Tuân thủ chính sách xuất bản Google AdSense & Bảo vệ quyền riêng tư</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/lich-am-viet-source.zip"
                download="lich-am-viet-source.zip"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-semibold transition-colors"
                title="Tải toàn bộ mã nguồn website về máy (.ZIP)"
              >
                <Download className="w-3.5 h-3.5 text-amber-800" />
                <span>Tải Mã Nguồn (.ZIP)</span>
              </a>
              <span>·</span>
              <button
                onClick={() => openPolicy('privacy')}
                className="hover:text-amber-900 hover:underline transition-colors cursor-pointer"
              >
                Chính sách bảo mật (Privacy Policy)
              </button>
              <span>·</span>
              <button
                onClick={() => openPolicy('terms')}
                className="hover:text-amber-900 hover:underline transition-colors cursor-pointer"
              >
                Điều khoản sử dụng
              </button>
              <span>·</span>
              <button
                onClick={() => openPolicy('contact')}
                className="hover:text-amber-900 hover:underline transition-colors cursor-pointer text-amber-800 font-medium"
              >
                Liên hệ & Hợp tác quảng cáo
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Side Skyscraper Ads (Left and Right gutters on large screens) */}
      <SideSkyscraperAds />

      {/* Legal & Policy Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        initialTab={policyTab}
        onClose={() => setPolicyModalOpen(false)}
      />
    </div>
  );
}
