import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import router from '../router' 
import { useDatabaseStore } from './database';

export const useUserStore = defineStore('user', () => {
    
    const userData = ref();
    const loader = ref(false);

    const minuscula = computed( () => userData.value.toLowerCase() )

    const registerUser = async (email, password) => {
        loader.value = true;
        try{
            const res = await createUserWithEmailAndPassword( auth, email, password);
            const { user } = res;
            userData.value = { email: user.email, uid: user.uid };
            router.push('/login');
        }  catch (e){
            console.error(e);            
        } finally {
            console.log('registerUser ends')
         loader.value = false;
        }
    }

    const loginUser = async (email, password) => {
        loader.value = true;
        try{
            const res = await signInWithEmailAndPassword( auth, email, password);
            // const { user } = res;
            userData.value = { email, password }
            router.push('/');
        }  catch (e){
            console.error(e);            
        } finally {
            console.log('login user')
            loader.value = false;
        } 
    }

    const logoutUser = async () => {
        loader.value = true;
        const databaseStore = useDatabaseStore();
        try{
            const res = await signOut(auth);
            userData.value = null;
            router.push('/login');
        } catch(e){
            console.error(e);
            loader.value = false;
        } finally {
            console.log('logout user')
            loader.value = false;
            databaseStore.$reset();
        } 
    }

    const currentUser = async () => {
        const databaseStore = useDatabaseStore();
        let unsuscribe;
        return new Promise( (resolve, reject) => {
            unsuscribe = onAuthStateChanged(auth, (user) => {
                if(user){
                    userData.value = { email: user.email, uid: user.uid}
                } else {
                    userData.value = null;
                    databaseStore.$reset();
                }
                resolve(user)
            })
        }).then( (user) => {
            unsuscribe()
            return user;
        })
    }
    
    return{
        userData,
        minuscula,
        registerUser,
        loginUser,
        logoutUser,
        loader,
        currentUser
    }

})