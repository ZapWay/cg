import React, { useState } from 'react';
import { Box, Grid, Slider, Stack, TextField, Typography } from '@mui/material';
import convert from 'color-convert';
import ColorPicker from '@rc-component/color-picker';
import './App.css';
import '@rc-component/color-picker/assets/index.css';

function App() {
    const [rgb, setRgb] = useState({ r: 128, g: 128, b: 128 });
    const [cmyk, setCmyk] = useState({ c: 0, m: 0, y: 0, k: 50 });
    const [hsl, setHsl] = useState({ h: 0, s: 0, l: 50 });
    const rgbToHex = (r, g, b) => convert.rgb.hex(r, g, b);
    const rgbToCmyk = (r, g, b) => convert.rgb.cmyk(r, g, b);
    const cmykToRgb = (c, m, y, k) => convert.cmyk.rgb(c, m, y, k);
    const rgbToHsl = (r, g, b) => convert.rgb.hsl(r, g, b);
    const hslToRgb = (h, s, l) => convert.hsl.rgb(h, s, l);
    const handleRGBChange = (color, newValue) => {
        setRgb((prevRgb) => {
            const newRgb = { ...prevRgb, [color]: newValue };
            const [c, m, y, k] = rgbToCmyk(newRgb.r, newRgb.g, newRgb.b);
            setCmyk({ c, m, y, k });
            const [h, s, l] = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
            setHsl({ h, s, l });
            return newRgb;
        });
    };

    const handleCMYKChange = (color, newValue) => {
        setCmyk((prevCmyk) => {
            const newCmyk = { ...prevCmyk, [color]: newValue };
            const [r, g, b] = cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k);
            setRgb({ r, g, b });
            const [h, s, l] = rgbToHsl(r, g, b);
            setHsl({ h, s, l });
            return newCmyk;
        });
    };

    const handleHSLChange = (color, newValue) => {
        setHsl((prevHsl) => {
            const newHsl = { ...prevHsl, [color]: newValue };
            const [r, g, b] = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
            setRgb({ r, g, b });
            const [c, m, y, k] = rgbToCmyk(r, g, b);
            setCmyk({ c, m, y, k });
            return newHsl;
        });
    };

    const handleColorPickerChange = (color) => {
        const hexColor = color.toHexString();

        const [r, g, b] = convert.hex.rgb(hexColor);

        setRgb({ r, g, b });
        const [c, m, y, k] = rgbToCmyk(r, g, b);
        setCmyk({ c, m, y, k });
        const [h, s, l] = rgbToHsl(r, g, b);
        setHsl({ h, s, l });
    };

    return (
        <div className="app-container">
            {}
            <Typography variant="h5" className="typography" gutterBottom>
                Color Model Converter
            </Typography>

            {}
            <Grid container spacing={3}>
                {}
                <Grid item xs={4}>
                    <Box sx={{ bgcolor: '#f0f0f0', p: 3 }}>
                        <Typography variant="h6" className="rgbHeader">
                            RGB
                        </Typography>
                        {['r', 'g', 'b'].map((color) => (
                            <div key={color}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {color.toUpperCase()}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Slider
                                        value={rgb[color]}
                                        min={0}
                                        max={255}
                                        onChange={(e, newValue) => handleRGBChange(color, newValue)}
                                        valueLabelDisplay="auto"
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={rgb[color]}
                                        onChange={(e) => {
                                            let value = parseInt(e.target.value, 10);
                                            if (isNaN(value)) {
                                                value = 0;
                                            }
                                            if (!isNaN(value) && value >= 0 && value <= 255) {
                                                handleRGBChange(color, value);
                                            }
                                        }}
                                    />
                                </Stack>
                            </div>
                        ))}
                    </Box>
                </Grid>

                {}
                <Grid item xs={4}>
                    <Box sx={{ bgcolor: '#f0f0f0', p: 3 }}>
                        <Typography variant="h6" className="cmykHeader">
                            CMYK
                        </Typography>
                        {['c', 'm', 'y', 'k'].map((color) => (
                            <div key={color}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {color.toUpperCase()}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Slider
                                        value={cmyk[color]}
                                        min={0}
                                        max={100}
                                        onChange={(e, newValue) => handleCMYKChange(color, newValue)}
                                        valueLabelDisplay="auto"
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={cmyk[color]}
                                        onChange={(e) => {
                                            let value = parseInt(e.target.value, 10);
                                            if (isNaN(value)) {
                                                value = 0;
                                            }
                                            if (!isNaN(value) && value >= 0 && value <= 100) {
                                                handleCMYKChange(color, value);
                                            }
                                        }}
                                    />
                                </Stack>
                            </div>
                        ))}
                    </Box>
                </Grid>

                {}
                <Grid item xs={4}>
                    <Box sx={{ bgcolor: '#f0f0f0', p: 3 }}>
                        <Typography variant="h6" className="hslHeader">
                            HSL
                        </Typography>
                        {['h', 's', 'l'].map((color) => (
                            <div key={color}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {color.toUpperCase()}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Slider
                                        value={hsl[color]}
                                        min={0}
                                        max={color === 'h' ? 360 : 100}
                                        onChange={(e, newValue) => handleHSLChange(color, newValue)}
                                        valueLabelDisplay="auto"
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={hsl[color]}
                                        onChange={(e) => {
                                            let value = parseInt(e.target.value, 10);
                                            if (isNaN(value)) {
                                                value = 0;
                                            }
                                            if (!isNaN(value) && value >= 0 && value <= (color === 'h' ? 360 : 100)) {
                                                handleHSLChange(color, value);
                                            }
                                        }}
                                    />
                                </Stack>
                            </div>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            {}
            <Box className="box1">
                <ColorPicker
                    className="colorpicker"
                    value={rgbToHex(rgb.r, rgb.g, rgb.b)}
                    onChangeComplete={handleColorPickerChange}
                />
            </Box>

            {}
            <Box className="box2" sx={{ mt: 3, p: 3, bgcolor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    Color Preview
                </Typography>
            </Box>
        </div>
    );
}
export default App