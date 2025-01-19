import React, { useState } from 'react'
import jalaali from 'jalaali-js'




const ShamsiDatePicker = ({
    onBirthDateChange, 
    onRegistryDateChange ,  
    initialDate 
}) => {
    const [selectedDate, setSelectedDate] = useState(() => {
        if (initialDate) {
            const date = new Date(initialDate)
            const { jy, jm, jd } = jalaali.toJalaali(date)
            return {
                year: jy.toString(),
                month: jm.toString(),
                day: jd.toString()
            }
        }
        return { year: '', month: '', day: '' }
    })

    const startYear = 1340
    const endYear = 1403
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)

    const handleDateChange = (e) => {
        const { name, value } = e.target
        const updatedDate = { ...selectedDate, [name]: value }
        setSelectedDate(updatedDate)

        if (updatedDate.year && updatedDate.month && updatedDate.day) {
            const { gy, gm, gd } = jalaali.toGregorian(
                parseInt(updatedDate.year, 10),
                parseInt(updatedDate.month, 10),
                parseInt(updatedDate.day, 10)
            )
            const gregorianDate = `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`
            if (onBirthDateChange) onBirthDateChange(gregorianDate)
            if (onRegistryDateChange) onRegistryDateChange(gregorianDate)
        }
    }

    return (
        <div className="w-full flex gap-x-2">
            <div className="w-full"> 
                <select 
                    onChange={handleDateChange} 
                    name="day" 
                    className="w-full h-12 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                    required 
                    value={selectedDate.day}
                >
                    <option value="">روز</option>
                    {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
            </div>
            <div className="w-full"> 
                <select 
                    onChange={handleDateChange} 
                    name="month" 
                    className="w-full h-12 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                    required 
                    value={selectedDate.month}
                >
                    <option value="">ماه</option>
                    {months.map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                    ))}
                </select>
            </div>
            <div className="w-full"> 
                <select 
                    onChange={handleDateChange} 
                    name="year" 
                    className="w-full h-12 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                    required 
                    value={selectedDate.year}
                >
                    <option value="">سال</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ShamsiDatePicker
