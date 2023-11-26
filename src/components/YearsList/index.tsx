import { Autocomplete, TextField } from "@mui/material";
import { CSSProperties, FocusEvent } from "react";

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
  value?: any;
}) => {
  const getYearsBetweenDates = (startDate: string, endDate: string) => {
    const start_Date = new Date(startDate);
    const end_Date = new Date(endDate);
    const startYear = start_Date.getFullYear();
    const endYear = end_Date.getFullYear();
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years;
  };

  const years = getYearsBetweenDates(start, end);

  return (
    <Autocomplete
      value={value}
      options={years}
      onChange={(_, newValue: any) => {
        setYear && setYear(newValue);
      }}
      getOptionLabel={(option) => option.toString()}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={sx}
          error={error}
          onBlur={onBlur}
          helperText={helperText}
        />
      )}
      sx={sxAutoComplite}
    />
  );
};

export default ComponentYears;
