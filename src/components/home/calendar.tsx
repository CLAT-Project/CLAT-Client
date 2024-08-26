export default function Calendar() {
  // 현재 날짜 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
  const currentDate = today.getDate();

  // 요일 이름 배열
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
  const totalDays = lastDayOfMonth.getDate();

  // 시작 요일 계산 (0 = 일요일, 1 = 월요일, ... 6 = 토요일)
  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

  const emptyCells = Array(startDayIndex).fill(null);

  return (
    <div className="p-4 bg-white rounded-xl border border-black">
      <h3 className="text-lg font-semibold mb-4">
        {currentYear} / {currentMonth.toString().padStart(2, '0')}
      </h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {dayNames.map((day, index) => (
          <div key={index} className="font-bold">{day}</div>
        ))}
        
        {emptyCells.map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}
        
        {Array.from({ length: totalDays }).map((_, idx) => {
          const dayNumber = idx + 1;
          const isToday = dayNumber === currentDate;
          return (
            <div
              key={idx}
              className={`p-2 rounded ${isToday ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
