import { ReactNode } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik';

import CountryCitySelect from './CountryCitySelect';

const FormikWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Formik initialValues={{country: '', city: ''}} onSubmit={() => {}}>
    {() => <>{children}</>}
  </Formik>
);

describe('CountryCitySelect component', () => {
  test('renders CountryCitySelect component', () => {
    render(<CountryCitySelect />, { wrapper: FormikWrapper });

    // Check if the Country and City labels are rendered
    expect(screen.getByText(/Country/)).toBeInTheDocument();
    expect(screen.getByText(/City/)).toBeInTheDocument();
  });

  test('country options are populated', async () => {
    render(<CountryCitySelect />, { wrapper: FormikWrapper });
    const user = userEvent.setup()

    const dropdown = within(await screen.findByTestId("country-select")).getByRole("combobox");
    expect(dropdown).toBeInTheDocument();

    // Check if the city options are updated based on the selected country
    await user.click(dropdown);

    expect(await screen.findByRole("option", { name: "USA" }),).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "Canada" }),).toBeInTheDocument();
  });

  test('updates city options when changing country', async () => {
    render(<CountryCitySelect />, { wrapper: FormikWrapper });
    const user = userEvent.setup()

    let dropdown = within(await screen.findByTestId("country-select")).getByRole("combobox");
    await user.click(dropdown);
    
    // Select Canada as the country
    await userEvent.click(await screen.findByRole("option", { name: "Canada" }));
    expect(screen.getByText("Canada")).toBeInTheDocument();

    // Select City dropdown
    dropdown = within(await screen.findByTestId("city-select")).getByRole("combobox");
    await user.click(dropdown);

    // Select Montreal option
    await waitFor(() => user.click(screen.getByText(/Montreal/i)));
  });
});