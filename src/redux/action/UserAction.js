
  import {
    doc,
    collection,
    query,
    where,
    updateDoc,
    getDoc,
    onSnapshot
  } from 'firebase/firestore'
  import { db } from '../../firebase_config'
  import {typeUsers } from '../../Utils/constants'

export const GetUsersAdmin = (callback) => {
    const patientsCollectionRef = collection(db, 'users');
  
    try {
      // Crear una consulta que filtra los usuarios
      const queryRef = query(
        patientsCollectionRef,
        where('typeUser', '!=', typeUsers.doctor)
      );
  
      return onSnapshot(queryRef, (querySnapshot) => {
        const patientsData = [];
  
        querySnapshot.docs.forEach((doc) => {
          const patientData = doc.data();
          const patientId = doc.id;
          patientsData.push({ id: patientId, ...patientData });
        });
  
        callback(patientsData);
      });
    } catch (error) {
      console.error('Error:', error.code, error.message);
      throw error;
    }
  }
  
  export const actualizarValidatedPatient = async (patientId, nuevotype) => {
    try {
      const patientRef = doc(db, 'users', patientId); // Reemplaza 'patients' con la colección adecuada en tu base de datos
      const patientSnapshot = await getDoc(patientRef);
  
      if (patientSnapshot.exists()) {
        const actualizaciones = {
           typeUser: nuevotype,
        };
  
        await updateDoc(patientRef, actualizaciones);
  
        return 'Paciente actualizado exitosamente';
      } else {
        console.error('El documento del patient no existe.');
        return 'El Paciente no existe';
      }
    } catch (error) {
      console.error('Error al actualizar el estado de validación del patient:', error);
      throw error;
    }
  };
  
  export const dataAdminCard = (colection,callback) => {
    
    const patientsCollectionRef = collection(db, colection);
  
    try {
      // Crear una consulta que filtra los usuarios
      const queryRef = query(patientsCollectionRef);
  
      return onSnapshot(queryRef, (querySnapshot) => {
        const patientsData = [];
  
        querySnapshot.docs.forEach((doc) => {
          const patientData = doc.data();
          const patientId = doc.id;
          patientsData.push({ id: patientId, ...patientData });
        });
  
        callback(patientsData);
      });
    } catch (error) {
      console.error('Error:', error.code, error.message);
      throw error;
    }
  }
  
  export const dataAdminCard2 = (callback) => {
    const patientsCollectionRef = collection(db, 'users');
  
    try {
      // Crear una consulta que filtra los usuarios
      const queryRef = query(
        patientsCollectionRef,
        where('typeUser', '==', typeUsers.doctor)
      );
  
      return onSnapshot(queryRef, (querySnapshot) => {
        const patientsData = [];
  
        querySnapshot.docs.forEach((doc) => {
          const patientData = doc.data();
          const patientId = doc.id;
          patientsData.push({ id: patientId, ...patientData });
        });
  
        callback(patientsData);
      });
    } catch (error) {
      console.error('Error:', error.code, error.message);
      throw error;
    }
  }
  
  export const dataAdminCard3 = (callback) => {
    try {
      const docRef = query(
        collection(db, 'quotes')
      )
  
      return onSnapshot(docRef, (querySnapshot) => {
        const citas = []
  
        querySnapshot.forEach((doc) => {
          citas.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        callback(citas)
      })
    } catch (error) {
      console.error('Error al obtener los documentos:', error)
      throw error
    }
  }

  export const getCitas = (setIsLoadingQuotes, callback) => {
    setIsLoadingQuotes(true);
  
    try {
      const docRef = collection(db, 'quotes');
  
      return onSnapshot(docRef, (querySnapshot) => {
        const citas = [];
  
        querySnapshot.forEach((doc) => {
          citas.push({
            id: doc.id,
            data: doc.data(),
          });
        });
  
        callback(citas);
        setIsLoadingQuotes(false);
      });
    } catch (error) {
      setIsLoadingQuotes(false);
      console.error('Error al obtener los documentos:', error);
      throw error;
    }
  };
  
  
  export const getExpedientesPaciente = (pacienteId, callback) => {
    try {
      if (typeof callback !== 'function') {
        throw new Error('El callback no es una función.');
      }
  
      const expedientesRef = query(
        collection(db, 'expedientes'),
        where('expedienteData.id_paciente', '==', pacienteId),
      );
  
      const unsubscribe = onSnapshot(expedientesRef, (querySnapshot) => {
        const expedientes = [];
  
        querySnapshot.forEach((doc) => {
          expedientes.push({
            id: doc.id,
            expedienteData: doc.data().expedienteData,
          });
        });
  
        callback(expedientes);
      });
  
      // Devolver una función de limpieza para detener la escucha cuando sea necesario
      return () => {
        // Detener la escucha de cambios cuando se resuelve la promesa
        unsubscribe();
      };
    } catch (error) {
      console.error('Error al obtener los expedientes:', error);
      throw error;
    }
  };