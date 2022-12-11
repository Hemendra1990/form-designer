import { useState } from "react";
import "./styles.css";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { ListBox } from "primereact/listbox";
import {
  useForm,
  useFieldArray,
  useWatch,
  Controller,
  getValues
} from "react-hook-form";

const PropertyInfo = (props) => {
  const { control, index, field, append } = props;
  const value = useWatch({
    name: "test",
    control
  });
  return (
    <div>
      <Controller
        control={control}
        name={`test.${index}.firstName`}
        render={({ field }) => (
          <InputText id={field.name} {...field} autoFocus />
        )}
      />
    </div>
  );
};

export default function App() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    watch
  } = useForm({});
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "cssprops"
  });

  const cssprops = watch("cssprops");

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" }
  ];

  const items = [
    { label: "Home", icon: "pi pi-fw pi-home" },
    { label: "Calendar", icon: "pi pi-fw pi-calendar" },
    { label: "Edit", icon: "pi pi-fw pi-pencil" },
    { label: "Documentation", icon: "pi pi-fw pi-file" },
    { label: "Settings", icon: "pi pi-fw pi-cog" }
  ];

  const [city, setCity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const [cityChanged, setCityChanged] = useState(true);

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit((e) => {
          console.log(e);
        })}
      >
        <div className="grid">
          <div className="col-4">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <ListBox
                  id={field.name}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.value);
                    setCityChanged(false);
                    setTimeout(() => {
                      setCityChanged(true);
                    }, 10);
                  }}
                  options={cities}
                  optionLabel="name"
                />
              )}
            />
          </div>
          <div className="col-8">
            {cityChanged &&
              getValues().country?.code &&
              fields
                .filter((x) => {
                  console.log("----", x);
                  return x.country.code === getValues().country.code;
                })
                .map((item, index) => {
                  let country = getValues().country?.code;
                  //cssprops

                  return (
                    <div key={item.id}>
                      <Controller
                        control={control}
                        name={`${country}.cssprops[${index}].className`}
                        render={({ field }) => (
                          <InputText
                            placeholder="css key"
                            id={field.name}
                            {...field}
                            autoFocus
                          />
                        )}
                      />
                    </div>
                  );
                })}
            <Button
              label="Add"
              onClick={(e) => {
                console.log("aAaA:::", getValues().country);
                if (getValues().country) {
                  append({ className: "", country: getValues().country });
                }
              }}
            />
          </div>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
