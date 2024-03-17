"use client";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, useState } from "react";

type SelectOption = {
  value: string;
  label: string;
};

export type FormSelectProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  options: SelectOption[];
  required?: boolean;
  value?: string | null;
  placeholder?: string;
};

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect(
    {
      className,
      label,
      options,
      required,
      disabled,
      name,
      placeholder,
      value,
      ...rest
    },
    ref,
  ) {
    const [selected, setSelected] = useState<SelectOption | null>(null);

    React.useEffect(() => {
      setSelected(options.find((option) => option.value === value) || null);
    }, [value, options]);

    return (
      <div className="relative">
        <Listbox value={selected} onChange={setSelected} ref={ref}>
          {({ open }) => (
            <div className={clsx("form-control w-full", className)}>
              {label && (
                <Listbox.Label className="label">
                  <span className="label-text">{label}</span>
                </Listbox.Label>
              )}
              <Listbox.Button
                className="select select-bordered block truncate text-left"
                onClick={rest.onClick}
              >
                {selected?.label || placeholder || " "}
              </Listbox.Button>
              <div className="relative">
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute menu bg-base-300 w-full rounded-box shadow-md z-50">
                    {options.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        // className={({ active }) =>
                        //   clsx("menu-item flex content-between", {
                        //     focus: active || selected,
                        //   })
                        // }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div
                            className={clsx("menu-item flex content-between", {
                              active: active,
                              focus: selected,
                            })}
                          >
                            <span className={"block truncate flex-grow"}>
                              {option.label}
                            </span>

                            {selected && (
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>

        <div
          className="isolate opacity-0 select-none"
          aria-hidden="true"
          tabIndex={-1}
          style={Object.assign(
            {},
            { cursor: `${disabled ? "not-allowed" : "pointer"}` },
          )}
        >
          <div
            className="absolute z-10 w-full h-[1px] bottom-[15px] opacity-0 left-0"
            aria-hidden="true"
            tabIndex={-1}
          ></div>
          <select
            disabled={disabled}
            onClick={() => {}}
            onChange={() => {}}
            tabIndex={-1}
            value={selected === null ? undefined : selected?.value}
            name={name}
            required={required}
            aria-hidden="true"
            autoCapitalize="off"
            autoComplete="off"
            className="w-full z-0 h-[1px] select-none text-transparent bg-transparent absolute bottom-[15px] left-0 !outline-none opacity-0 shadow-none appearance-none"
          >
            <option value="" defaultChecked aria-hidden="true"></option>
            {options.map((e, i: number) => {
              return (
                <option key={i} value={e.value} aria-hidden="true">
                  {e.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  },
);
