import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        // console.log(getState());
        // console.log('StartNewNote');
        //uid

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()

        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journald/notes`));
        await setDoc(newDoc, newNote);

        // console.log({ newDoc, setDocResp });


        //! dispatch
        // dispatch (newNote)
        // dispatch (activarNote)

    }
}