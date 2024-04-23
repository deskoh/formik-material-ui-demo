import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { produce } from "immer";

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
  // State to manage checkbox values
  const [checkboxes, setCheckboxes] = useState(
    orders.reduce<Record<number, Record<number, boolean>>>((acc, order) => {
      acc[order.id] = {};
      order.items.forEach((item) => {
        acc[order.id][item.id] = false;
      });
      return acc;
    }, {})
  );

  // Function to handle changes in checkboxes
  const handleCheckboxChange = (
    orderId: number,
    itemId?: number,
    isChecked?: boolean
  ) => {
    setCheckboxes((prevCheckboxes) => {
      return produce(prevCheckboxes, (draftState) => {
        if (itemId) {
          draftState[orderId][itemId] = !prevCheckboxes[orderId][itemId];
        } else {
          Object.keys(draftState[orderId]).forEach(
            (id) => (draftState[orderId][id as any] = !!isChecked)
          );
        }
      });
    });
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Object.values(checkboxes[order.id]).some(Boolean)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  Object.keys(checkboxes[order.id]).forEach((itemId) =>
                    handleCheckboxChange(order.id, undefined, isChecked)
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
                    checked={checkboxes[order.id][item.id]}
                    onChange={() => handleCheckboxChange(order.id, item.id)}
                  />
                }
                label={item.name}
              />
            ))}
          </div>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log(checkboxes)}
      >
        Submit
      </Button>
    </div>
  );
};

export default DemoCheckbox;
