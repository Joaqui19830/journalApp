import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNotes, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNotes())

        const { uid } = getState().auth;
        // console.log(getState());
        // console.log('StartNewNote');
        //uid

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()

        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journald/notes`));
        await setDoc(newDoc, newNote);

        // console.log({ newDoc, setDocResp });

        newNote.id = newDoc.id

        //  dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')
        // console.log(uid);

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))

    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journald/notes/${note.id}`);

        await setDoc(docRef, noteToFireStore, { merge: true }); // Aca es una simple union que le cae encima a los campos anteriores

        dispatch(updateNote(note));

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        dispatch(setSaving());

        // await fileUpload(files[0]);

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        // console.log({ photosUrls });

        dispatch(setPhotosToActiveNote(photosUrls))
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {


        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // console.log({ uid, note });
        const docRef = doc(FirebaseDB, `${uid}/journald/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))

    }
}