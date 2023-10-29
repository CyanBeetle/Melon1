import { useState } from "react";
import { Container, Typography, Paper, Grid, styled, Box, Button, IconButton } from "@mui/material"
import { Remove, Add, WaterDropOutlined, TungstenOutlined, DeviceThermostatOutlined, Adjust } from "@mui/icons-material";
import AdjustComponent from "component/Adjust/AdjustComponent";

const SetUp = () => {
    const [selectedSquare, setSelectedSquare] = useState(1);

    const handleSquareClick = (square) => {
        setSelectedSquare(square);
    };

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
        <Container>
            <Typography variant="h3" sx={{ marginBottom: "30px", marginTop: "10px" }}>
                DeviceManagement
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={7} xl={7}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 1}
                                    onClick={() => handleSquareClick(1)}
                                >
                                    <h3>Soll Moisure Sensor</h3>
                                    <WaterDropOutlined color='action' style={{ fontSize: '120px' }} />

                                </Square>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 2}
                                    onClick={() => handleSquareClick(2)}
                                >
                                    <h3>Ligthning Sensor</h3>
                                    <TungstenOutlined color='action' style={{ fontSize: '120px' }} />
                                </Square>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 3}
                                    onClick={() => handleSquareClick(3)}
                                >
                                    <h3>Ligthning Sensor</h3>
                                    <WaterDropOutlined color='primary' style={{ fontSize: '120px' }} />
                                </Square>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Square
                                    selected={selectedSquare === 4}
                                    onClick={() => handleSquareClick(4)}
                                >
                                    <h3>Ligthning Sensor</h3>
                                    <DeviceThermostatOutlined color='action' style={{ fontSize: '120px' }} />
                                </Square>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5} xl={5}>
                    <Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} xl={12} xm={12} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                Solid Moisure Sensor
                            </Grid>
                            <Grid item xs={4} xl={4} xm={4} style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <Typography>Uper Threshhold: </Typography>
                            </Grid>
                            <Grid item xs={8} xl={8} xm={8} >

                                <AdjustComponent />
                            </Grid>
                            <Grid item xs={4} xl={4} xm={4} style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <Typography>Lower Threshhold: </Typography>
                            </Grid>
                            <Grid item xs={8} xl={8} xm={8} >

                                <AdjustComponent />
                            </Grid>

                            <Grid item xs={12} xl={12} xm={12} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button variant="contained" style={{ marginBottom: "20px" }} >Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>

        </Container >
    )
}
const Square = styled(Box)`
  height: 200px;
  width: 200px;
  background-color: ${({ selected }) => (selected ? "green" : "white")};
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
`;
export default SetUp