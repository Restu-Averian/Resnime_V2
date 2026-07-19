import { Input, Stack } from "@chakra-ui/react";
import useResponsive from "../../hooks/useResponsive";
import Drawer from "./Drawer";
import { useEffect, useState } from "react";
import Box from "./Box";

/**
 * @typedef {Object} ArrListOptions
 * @property {String} label
 * @property {String} value
 */
/**
 * @typedef AddPropsSelect
 * @property {ArrListOptions[]} listOptions
 * @property {String} placeholder
 */
/**
 *
 * @param {AddPropsSelect & import("@chakra-ui/react").SelectProps} param0
 * @returns
 */
const Select = ({ listOptions, placeholder = "Select One", ...props }) => {
  const { sm } = useResponsive();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [valueSelected, setValueSelected] = useState("");

  useEffect(() => {
    setValueSelected(props?.value || "");
  }, [props?.value]);

  if (sm) {
    return (
      <>
        <Input
          placeholder={placeholder}
          onClick={() => {
            setOpenDrawer(true);
          }}
          readOnly
          value={listOptions?.find((d) => d?.value === valueSelected)?.label}
        />
        <Drawer
          placement="bottom"
          isOpen={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
          {...(placeholder && {
            header: <>{placeholder}</>,
          })}
        >
          <Stack>
            {listOptions?.map((opt, idx) => (
              <Box
                key={idx}
                py={5}
                px={2}
                onClick={() => {
                  if (props?.onChange) {
                    props?.onChange(opt?.value);
                  }
                  setOpenDrawer(false);
                  setValueSelected(opt?.value);
                }}
              >
                {opt?.label}
              </Box>
            ))}
          </Stack>
        </Drawer>
      </>
    );
  }
  return (
    <Box
      as="select"
      borderWidth="1px"
      borderRadius="md"
      minH={10}
      px={3}
      {...props}
      onChange={({ target: { value } }) => {
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    >
      <option value="">{placeholder}</option>
      {listOptions?.map((opt, idx) => (
        <option key={idx} value={opt?.value}>
          {opt?.label}
        </option>
      ))}
    </Box>
  );
};
export default Select;
