import * as React from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import { useSwitch } from "@mui/base/SwitchUnstyled";
import Typography from "@mui/material/Typography";

const SwitchRoot = styled("span")`
  display: inline-block;
  position: relative;
  width: 232px;
  height: 48px;
`;

const SwitchInput = styled("input")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled("span")`
  position: absolute;
  display: table;
  background-color: #ffffff;
  width: 115px;
  height: 10px;
  border-radius: 30px;
  top: 4px;
  left: 4px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  line-height: 40px;

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(110px);
  }
`;

const SwitchTrack = styled("span")(
  ({ theme }) => `
  background-color: #e2e6eb;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  display: block;`
);

const SwitchContent = styled("span")(
  ({ theme }) => `
  display: table-cell;
  vertical-align: middle;
  font-size: 13px;
  font-family: Arial,sans-serif;
  color: #333;
  font-weight: 400;`
);

export default function MUISwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)}>
          <SwitchContent className="switch-content">
            {checked ? "Unstake" : "Stake"}
          </SwitchContent>
        </SwitchThumb>
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
}
