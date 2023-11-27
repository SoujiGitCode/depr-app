import { Select, MenuItem, TextField } from "@mui/material";
import { CSSProperties, FocusEvent, useState } from "react";

const ComponentYears = ({
  start,
  end,
  sx,
  label,
  sxAutoComplite,
  setYear,
  onBlur,
  error,
  helperText,
  value,
}: {
  start: string;
  end: string;
  sx?: CSSProperties;
  label?: string;
  sxAutoComplite?: CSSProperties;
  setYear?: React.Dispatch<any>;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  value: any;
}) => {
  const years: number[] = [];
  const [touched, setTouched] = useState(false);

  const getYearsBetweenDates = (startDate: string, endDate: string) => {
    const start_Date = new Date(startDate);
    const end_Date = new Date(endDate);
    const startYear = start_Date.getFullYear();
    const endYear = end_Date.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years;
  };

  const result = getYearsBetweenDates(start, end);

  const renderList = result.map((option) => {
    return (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    );
  });

  return (
    <form autoComplete="off">
      <TextField
        select
        label={label}
        value={value || years[0]}
        onChange={(event) => {
          setYear && setYear(event.target.value);
          setTouched(true);
        }}
        sx={sx}
        error={touched && !value}
        onBlur={onBlur}
        helperText={helperText}
        inputProps={{ maxLength: 4, inputMode: "numeric" }}
      >
        {renderList}
      </TextField>
    </form>
  );
};

export default ComponentYears;
