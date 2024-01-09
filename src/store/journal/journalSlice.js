import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [] // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        savingNewNotes: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSave = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSave = '';
        },
        updateNote: (state, action) => { //payload =  nota actualizada
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });

            state.messageSave = `${action.payload.title}, actualizada correctamente`;
        },

        setPhotosToActiveNote: (state, action) => {
            // De esta manera conservamos las anteriores y le hacemos un appen de las nuevas 
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },

        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null
        },

        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);

        },


    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNotes,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout } = journalSlice.actions;