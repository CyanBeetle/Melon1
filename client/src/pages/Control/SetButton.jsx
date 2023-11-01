import React, { useEffect, useState } from "react"
import client from "database/mqtt/mqtt.js"
import { publish } from "database/mqtt/mqtt.js"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

import { useDispatch, useSelector } from "react-redux"
import Proptype from "prop-types"
import Switch from "@mui/material/Switch"
import { setPumpButton, setLightButton } from "state/button_time"

//test

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25,
    label: "1",
  },
  {
    value: 50,
    label: "2",
  },
  {
    value: 75,
    label: "3",
  },
  {
    value: 100,
    label: "4",
  },
]

function valuetext(value) {
  return `${value}°C`
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value)
}

function SetButton(props) {
  const dispatch = useDispatch()

  const [sliderEnabled, setSliderEnabled] = useState(false)

  useEffect(() => {
    setSliderEnabled(Boolean(props.value>0))
  }, [props])

  const handleSliderChange = (event, newValue) => {
    if (props.type === "pump") {
      dispatch(setPumpButton(newValue))
    }
    if (props.type === "light") {
     dispatch(setLightButton(newValue))
    }
    props.afunc(props.type,newValue)
  }

  const handleToggleSlider = () => {
    if (props.type === "pump") {
      dispatch(setPumpButton(0))
      
    } else if (props.type === "light") {
      dispatch(setLightButton(0))
    }
    setSliderEnabled(!sliderEnabled)
    props.afunc(props.type,0)
  }

  let Color1 = "#FBFF47"
  let Color2 = "#E6F7FF"
  if (props.type === "pump") {
    Color1 = "#B3E0FF"
    Color2 = "#E6F7FF"
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "200px", // Change the width to your desired size
        height: "150px",
        background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,
      }}
    >
      <h3>{props.type}</h3>
      <Switch
        checked={sliderEnabled}
        onChange={handleToggleSlider}
        inputProps={{ "aria-label": "toggle slider" }}
      />
      {sliderEnabled && (
        <Box sx={{ width: 100 }}>
          <Slider
            aria-label="Restricted values"
            defaultValue={props.value}
            value={props.value}
            onChange={handleSliderChange}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </Box>
      )}
    </Box>
  )
}

SetButton.propTypes = {
  type: Proptype.string,
  value: Proptype.number,
  afunc: Proptype.func,
}
// SetButton.defaultProps = {
//   type: "pump",
//   value: 0,
//   func: () => {},
// }

export default SetButton