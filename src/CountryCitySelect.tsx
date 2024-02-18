import { useCallback, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { Field, useFormikContext } from "formik";

import { FormValues } from "./Demo2";

const countries = [
  { label: 'USA', value: 'usa' },
  { label: 'Canada', value: 'canada' },
];

const citiesByCountry: Record<string, string[]> = {
  usa: ['New York', 'Los Angeles', 'Chicago'],
  canada: ['Toronto', 'Vancouver', 'Montreal'],
};


const CountryCitySelect: React.FC = (props) => {
  const formik = useFormikContext<FormValues>();
  const [cities, setCities] = useState<string[]>([]);

  const handleCountryChange = useCallback((event: SelectChangeEvent) => {
    const selectedCountry = event.target.value;
    const availableCities = citiesByCountry[selectedCountry] || [];
    
    // Update the city options and reset the city field
    setCities(availableCities);
    formik.setFieldValue('city', availableCities[0] || ''); 
    formik.handleChange(event);
  }, [formik]);

  // useEffect(() => {
  //   formik.setFieldValue('city', ''); // Reset city when country changes
  // }, [formik.values.country]);

  return (
    <>
      <Field as={Select}
        data-testid="country-select"
        name="country"
        label="Country"
        onChange={handleCountryChange}
      >
        {countries.map((country) => (
          <MenuItem key={country.value} value={country.value}>
            {country.label}
          </MenuItem>
        ))}
      </Field>
      <Field as={Select}
        data-testid="city-select"
        name="city"
        label="City"
      >
        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Field>
    </>
  );
};

export default CountryCitySelect;