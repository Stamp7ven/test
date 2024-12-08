import React, { createContext, useContext, useEffect, useState } from 'react';
import http from '../http';
import Swal from "sweetalert2";

const PetContext = createContext();

export const usePetContext = () => {
    return useContext(PetContext);
};

export const PetProvider = ({children}) => {
    const [pets, setPets] = useState("");
    const [nav_value, set_nav_value] = useState("PetList");
    const [petId, setPetId] = useState("");
    
    // add new pet
    const createNewPet = async (data) => {
        try {
            const response = await http.post("/api/pets", data);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success yeah!',
                    text: 'Pet created successfully yeah!',
                    confirmButtonColor: '#28a745',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong: ' + response.status,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not create pet: ' + error.message,
            });
        }
    };

    // update a pet entry
    const updatePet = async (petId, data) => {
        try {
            const response = await http.put(`/api/pets/${petId}`, data);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Pet edited successfully!',
                    confirmButtonColor: '#28a745',
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong: ' + response.status,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not edit pet: ' + error.message,
            });
        }
    };

    // delete a pet entry
    const deletePet = async (petId) => {

        const deleteForm = await Swal.fire({
            title: 'Are you sure?',
            text: "Your pet will be gone forever",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#42a7f5',
            cancelButtonColor: '#f54242',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        });
    
        if (deleteForm.isConfirmed) {
            try {
                const response = await http.delete(`/api/pets/${petId}`);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Pet deleted successfully!',
                        confirmButtonColor: '#28a745',
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something went wrong: ' + response.status,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Could not delete pet: ' + error.message,
                });
            }
        }
    };

    // change navigation value
    const changeNavValue = (value) => {
        set_nav_value(value);
        if(value === "PetList") window.location.reload();
    };

    // get pet id value
    const getPetId = (id) => {
        setPetId(id);
    };

    useEffect(()=>{
        const readAllPets = async () => {
            const response = await http.get("/api/pets");
            const responseArr = Object.values(response.data.data);
            setPets(responseArr);
        };

        return readAllPets;
    }, []);

    const value = {
        createNewPet,
        pets,
        updatePet,
        deletePet,
        changeNavValue,
        nav_value,
        getPetId,
        petId
    };

    // context
    return(
        <PetContext.Provider value={value}>
            {children}
        </PetContext.Provider>
    )
}; 
