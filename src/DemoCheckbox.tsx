import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik, Form } from "formik";

// Sample data
const orders = [
  {
    id: 1,
    name: "Order 1",
    items: [
      { id: 101, name: "Item 1-1" },
      { id: 102, name: "Item 1-2" },
    ],
  },
  {
    id: 2,
    name: "Order 2",
    items: [
      { id: 201, name: "Item 2-1" },
      { id: 202, name: "Item 2-2" },
    ],
  },
];

const DemoCheckbox = () => {
  // Initialize form values
  const initialValues = orders.reduce<Record<string, Record<string, boolean>>>(
    (acc, order) => {
      acc[order.id] = order.items.reduce<Record<string, boolean>>(
        (acc, item) => {
          acc[item.id] = false;
          return acc;
        },
        {}
      );
      return acc;
    },
    {}
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
        // Here you can do whatever you want with the form values
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          {orders.map((order) => (
            <div key={order.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Object.values(values[order.id]).some(Boolean)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      Object.keys(values[order.id]).forEach((itemId) =>
                        setFieldValue(`${order.id}.${itemId}`, isChecked)
                      );
                    }}
                  />
                }
                label={order.name}
              />
              <div style={{ marginLeft: 20 }}>
                {order.items.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={values[order.id][item.id]}
                        onChange={(e) =>
                          setFieldValue(
                            `${order.id}.${item.id}`,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={item.name}
                  />
                ))}
              </div>
            </div>
          ))}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default DemoCheckbox;
