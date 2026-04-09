import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { type Tone } from "@/components/workspace/workspace-theme"
import type { CalendarEventItem } from "@/components/workspace/workspace-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const toneStyles: Record<
  Tone,
  { bg: string; border: string; text: string; dot: string; hoverBg: string }
> = {
  blue: {
    bg: "bg-[#d2e3fc]",
    border: "border-l-[#1a73e8]",
    text: "text-[#174ea6]",
    dot: "bg-[#1a73e8]",
    hoverBg: "hover:bg-[#c2d8fa]",
  },
  sky: {
    bg: "bg-[#d4eaf7]",
    border: "border-l-[#4fc3f7]",
    text: "text-[#0d556d]",
    dot: "bg-[#4fc3f7]",
    hoverBg: "hover:bg-[#c1e2f4]",
  },
  green: {
    bg: "bg-[#ceead6]",
    border: "border-l-[#0f9d58]",
    text: "text-[#137333]",
    dot: "bg-[#0f9d58]",
    hoverBg: "hover:bg-[#bcdec5]",
  },
  teal: {
    bg: "bg-[#ccf0eb]",
    border: "border-l-[#009688]",
    text: "text-[#00695c]",
    dot: "bg-[#009688]",
    hoverBg: "hover:bg-[#bce6e0]",
  },
  amber: {
    bg: "bg-[#feefc3]",
    border: "border-l-[#f9ab00]",
    text: "text-[#7f6003]",
    dot: "bg-[#f9ab00]",
    hoverBg: "hover:bg-[#fae6ad]",
  },
}

const mockParticipants = [
  {
    name: "Kalash Pachauri",
    role: "PM",
    init: "NV",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Aashish K.",
    role: "TL",
    init: "AK",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Dev Team",
    role: "Eng",
    init: "DT",
    color: "bg-amber-100 text-amber-700",
  },
]

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const monthAbbrevs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
const defaultDayLabels = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function WeeklyCalendarView({
  events,
  dayLabels = defaultDayLabels,
  startHour = 9,
  endHour = 18,
}: {
  events: CalendarEventItem[]
  dayLabels?: string[]
  startHour?: number
  endHour?: number
}) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const startDayOffset = getFirstDayOfMonth(currentYear, currentMonth)

  const totalCells = daysInMonth + startDayOffset > 35 ? 42 : 35
  const cells = Array.from({ length: totalCells }).map((_, index) => {
    const date = index - startDayOffset + 1
    return date > 0 && date <= daysInMonth ? date : null
  })

  const eventsByDate = new Map<number, CalendarEventItem[]>()
  events.forEach((event) => {
    const monthMatch = event.day.match(/([A-Z][a-z]+)\s+(\d+)/)
    if (monthMatch) {
      const [, monthLabel, dayLabel] = monthMatch
      const eventMonth = monthAbbrevs.findIndex((month) => month === monthLabel)
      if (eventMonth !== -1 && eventMonth !== currentMonth) {
        return
      }

      const dayValue = Number(dayLabel)
      if (!eventsByDate.has(dayValue)) {
        eventsByDate.set(dayValue, [])
      }
      eventsByDate.get(dayValue)?.push(event)
      return
    }

    const dayMatch = event.day.match(/\d+/)
    if (!dayMatch) {
      return
    }

    const dayValue = Number(dayMatch[0])
    if (!eventsByDate.has(dayValue)) {
      eventsByDate.set(dayValue, [])
    }
    eventsByDate.get(dayValue)?.push(event)
  })

  const holidays: Record<number, Record<number, string>> = {
    0: { 1: "New Year's Day", 19: "Martin Luther King Jr. Day" },
    6: { 4: "Independence Day" },
    11: { 25: "Christmas Day" },
  }
  const currentHolidays = holidays[currentMonth] || {}

  return (
    <div className="relative w-full select-none">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-[#1b2d4f]">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Visible hours {startHour}:00 - {endHour}:00
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8 border-[#dadce0] text-[#1b2d4f]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8 border-[#dadce0] text-[#1b2d4f]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col border border-[#3b4b5c] bg-white">
        <div className="grid grid-cols-7 bg-[#3b4b5c] text-center text-[12px] leading-6 font-semibold tracking-widest text-white">
          {dayLabels.map((label, index) => (
            <div
              key={label}
              className={cn("py-1", index > 0 && "border-l border-[#526376]")}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-[#d1d5db]">
          {cells.map((date, index) => {
            const dayEvents = date ? eventsByDate.get(date) || [] : []
            const isHoliday = date ? currentHolidays[date] : null

            return (
              <div
                key={`${date ?? "blank"}-${index}`}
                className={cn(
                  "flex min-h-[140px] flex-col transition-colors",
                  date ? "bg-white" : "bg-[#dae1e8]"
                )}
              >
                {date && (
                  <div className="relative flex h-full flex-col p-1.5">
                    <span className="text-[13px] font-semibold text-[#3c4043]">
                      {date}
                    </span>

                    <div className="relative z-10 mt-1 flex w-full flex-col gap-1">
                      {dayEvents.map((event) => {
                        const tone = toneStyles[event.tone ?? "blue"]

                        return (
                          <div
                            key={event.id}
                            className="group relative w-full cursor-pointer"
                          >
                            <div
                              className={cn(
                                "line-clamp-1 w-[90%] rounded border-l-[3px] px-1.5 py-1.5 transition-all",
                                tone.bg,
                                tone.border,
                                tone.text,
                                tone.hoverBg
                              )}
                            >
                              <span className="mr-1 text-[10px] font-semibold">
                                {event.time}
                              </span>
                              <span className="text-[10px] leading-tight">
                                {event.title}
                              </span>
                            </div>

                            <div className="pointer-events-none absolute top-1/2 left-[95%] hidden w-72 -translate-y-1/2 animate-in rounded-lg border border-gray-200 bg-white p-4 text-sm whitespace-normal text-black shadow-2xl duration-200 fade-in-0 zoom-in-95 group-hover:block">
                              <div className="mb-2.5 flex items-center gap-2.5">
                                <span
                                  className={cn(
                                    "size-3 shrink-0 rounded-full",
                                    tone.dot
                                  )}
                                />
                                <h4 className="leading-tight font-bold text-gray-900">
                                  {event.title}
                                </h4>
                              </div>

                              <div className="mb-2.5 inline-block rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                                {event.day} • {event.time}
                                {event.endTime ? ` - ${event.endTime}` : ""}
                              </div>

                              {event.detail && (
                                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                  {event.detail}
                                </p>
                              )}

                              <div className="mt-4 border-t border-gray-100 pt-3">
                                <div className="mb-2.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                  Participants
                                </div>
                                <div className="flex flex-col gap-2">
                                  {mockParticipants.map((participant) => (
                                    <div
                                      key={`${event.id}-${participant.init}`}
                                      className="flex items-center gap-3"
                                    >
                                      <div
                                        className={cn(
                                          "flex size-6 items-center justify-center rounded-full text-[10px] font-bold",
                                          participant.color
                                        )}
                                      >
                                        {participant.init}
                                      </div>
                                      <div className="text-sm font-medium">
                                        {participant.name}
                                      </div>
                                      <div className="ml-auto rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-gray-500 uppercase">
                                        {participant.role}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {isHoliday && (
                      <span className="pointer-events-none mt-auto pt-2 pb-0.5 text-[10px] leading-tight font-medium text-[#70757a]">
                        {isHoliday}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex min-h-[90px] items-start bg-[#f3f4f6] p-3 pl-4 text-[13px] font-bold tracking-[0.2em] text-[#70757a] uppercase">
          Notes
        </div>
      </div>
    </div>
  )
}
