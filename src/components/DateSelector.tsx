
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DateSelectorProps {
  onDateSelect: (year: string, month: string) => void;
}

const YEARS = ['2021', '2022', '2023', '2024', '2025'];
const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
  const [selectedYear, setSelectedYear] = React.useState<string>('');

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
  };

  const handleMonthSelect = (month: string) => {
    if (selectedYear) {
      onDateSelect(selectedYear, month);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <Tabs defaultValue="year" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="year" className="flex-1">Jump to Date</TabsTrigger>
        </TabsList>
        <TabsContent value="year" className="space-y-4">
          <div className="space-y-4">
            <Select onValueChange={handleYearSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-40">
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            {selectedYear && (
              <Select onValueChange={handleMonthSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-40">
                    {MONTHS.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DateSelector;
