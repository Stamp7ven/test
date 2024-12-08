"use client";
import React, { useState } from 'react';
import Swal from "sweetalert2";

// mui components
import {
    Typography,
    TextField,
    Box,
    Button,
    Paper,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    IconButton
} from '@mui/material';

// icons components
import { Add, Brightness7, Brightness4 } from '@mui/icons-material';

// custom components
import BottomNav from './BottomNav';

import { usePetContext } from '../contexts/PetContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function CreatePetEntry() {
    // input data
    const [name, setName] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [sex, setSex] = useState("");
    const [ageType, setAgeType] = useState("");

    const { createNewPet } = usePetContext();
    const { darkMode, toggleDarkMode } = useDarkMode();

    const handleCreateNewPet = (event) => {
        event.preventDefault(); 

        let finalAge = age;
        
        if (ageType === "Unknown") {
            finalAge = 0;
        }

        // Validate required fields
        if (!name || !animal || !breed || !location || !sex || (!finalAge && ageType !== "Unknown")) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields are required.',
            });
            return;
        }

        // Validate age only if ageType is not "Unknown_Age"
        if (ageType !== "Unknown" && (age < 1 || age > 250)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Age must be between 1 and 250.',
            });
            return;
        }

        const data = JSON.stringify({
            "data": {
                "name": name,
                "animal": animal,
                "breed": breed,
                "age": finalAge,
                "location": location,
                "sex": sex,
                "ageType": ageType,
            }
        });

        createNewPet(data);
    };    

    return (
        <Box
            component="form"
            onSubmit={handleCreateNewPet}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: darkMode ? 'background.default' : '#fff',
                color: darkMode ? 'text.primary' : 'inherit',
                borderRadius: 2,
                p: 2
            }}
            noValidate
            autoComplete="off"
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
            <Typography
                    variant="h3"
                    gutterBottom
                    component="div"
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
            >
                Add new Pet entry
            </Typography>

                <IconButton
                    onClick={toggleDarkMode}
                    color="inherit"
                    aria-label="toggle dark mode"
                    sx={{
                     marginLeft: 'auto',
                    }}
                >
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>

            <div>
                <TextField
                    required
                    id="filled-name"
                    label="Name"
                    variant="filled"
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl variant="filled" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-animal-label">Animal *</InputLabel>
                    <Select
                        labelId="select-animal-label"
                        id="filled-animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        variant="filled"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Bird">Bird</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="filled-breed-input"
                    label="Breed"
                    variant="filled"
                    onChange={(e) => setBreed(e.target.value)}
                />
                <TextField
                    required
                    id="filled-location-input"
                    label="Location"
                    variant="filled"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <FormControl variant="filled" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-ageType-label">Age Type *</InputLabel>
                    <Select
                        labelId="select-ageType-label"
                        id="ageType"
                        value={ageType}
                        onChange={(e) => setAgeType(e.target.value)}
                        variant="filled"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Unknown">Unknown</MenuItem>
                        <MenuItem value="Month">Month</MenuItem>
                        <MenuItem value="Year">Year</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled">
                    <InputLabel id="filled-age-label"></InputLabel>
                    <TextField
                        id="filled-age"
                        label="Age"
                        type="number"
                        onChange={(e) => setAge(e.target.value)}
                        variant="filled"
                    />
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, width: '50ch' }}>
                    <InputLabel id="select-sex-label">Sex *</InputLabel>
                    <Select
                        labelId="select-sex-label"
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        variant="filled"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button type="submit" variant="outlined" startIcon={<Add />}>
                    Add Pet Entry
                </Button>
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNav />
            </Paper>
        </Box>
    );
}
