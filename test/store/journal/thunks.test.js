import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNotes, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de crear una nuava nota en blanco', async () => {

        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNotes());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number),
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number),
        }));

        //Borrar de Firebase
        // Por esto es recomendable que no se usen la misma base de datos para el desarrollo y para testing
        const collectionRef = collection(FirebaseDB, `${uid}/journald/notes`);
        const docs = await getDocs(collectionRef);
        // console.log(docs);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises);

    })
})