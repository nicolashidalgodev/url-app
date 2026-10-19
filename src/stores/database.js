import { defineStore } from 'pinia';

import { ref } from 'vue';

import { 
    doc, 
    deleteDoc, 
    addDoc, 
    getDoc, 
    getDocs, 
    query, 
    collection, 
    where,
    updateDoc } from 'firebase/firestore/lite';

import { 
    db, 
    auth } from '@/firebaseConfig'

import { nanoid } from 'nanoid';
import router from '@/router';

export const useDatabaseStore = defineStore('database', () => {
    const documents = ref([]);
    const loadingDoc = ref(false);
    const getUrls = async () => {
        loadingDoc.value = true;
        if(documents.value.length !== 0) return;
        try{
            const q = query(
                collection(db, 'urls'), 
                where("user", '==', auth.currentUser.uid )
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach( doc => {
                console.log(doc.id, doc.data())
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        }catch(e){
            console.error(e);            
        } finally{
            loadingDoc.value = false;
        }
    }
    const addUrl = async (name) => {
        try{
            const objetoDoc = {
                name,
                short: nanoid(6),
                user: auth.currentUser.uid
            }
            const docRef = await addDoc(collection(db, 'urls'),  objetoDoc)
            documents.value.push({
                ...objetoDoc,
                id: docRef.id
            })
        } catch(e){
            console.error(e); 
        } finally {

        }
    }
    const readUrl = async (id) => {
        try{
            const docRef = doc(db, 'urls', id);
            const docSpan = await getDoc(docRef);
            return docSpan.data().name
        } catch(e){
            console.error(e);
        }
    }
    const deleteUrl = async (id) => {
        try{
            const docRef = doc(db, 'urls', id);
            const docSnap = await getDoc(docRef)
            if(!docSnap.exists()){
                throw new Error('no existe doc')
            }
            if(docSnap.data().user !== auth.currentUser.uid) {
                throw new Error('usuario no posee documento a eliminar')
            }
            await deleteDoc(docRef);
            documents.value = documents.value.filter( doc => doc.id !== id )
        } catch(e){
            console.error(e); 
        }
    }
    const updateUrl = async (id, name) => {
        try{
            const docRef = doc(db, 'urls', id);
            const docSpan = await getDoc(docRef);
            if(!docSpan.exists()){
                throw new Error('no existe el doc')
            }
            if(docSpan.data().user !== auth.currentUser.uid){
                throw new Error('no le pertenece')
            } 
            await updateDoc( docRef, {
                name
            }) 
            documents.value = documents.value.map( item => item.id === id ? ({...item, name}) : item
            ) 
            router.push('/')
        } catch(e){
            console.error(e); 
        }
    }
    function $reset(){
        documents.value = [];
        loadingDoc.value = false;
    }
    return{
        documents,
        getUrls,
        addUrl,
        readUrl,
        deleteUrl,
        updateUrl,
        $reset
    }
})