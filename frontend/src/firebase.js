import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserLocalPersistence,
  linkWithCredential,
  fetchSignInMethodsForEmail
} from "firebase/auth";

// 🔹 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHMzqkxeZEnjt899WaMqSuZ3Cxf5KNYCI",
  authDomain: "sneakers-26774.firebaseapp.com",
  projectId: "sneakers-26774",
  storageBucket: "sneakers-26774.firebasestorage.app",
  messagingSenderId: "401645882091",
  appId: "1:401645882091:web:2695e18b75f3d701e30cae",
  measurementId: "G-NFP5QFG8TM"
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 🔹 Configurar persistencia en localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("✅ Persistencia de sesión configurada en localStorage"))
  .catch((error) => console.error("⚠️ Error configurando persistencia:", error.message));

// 🔹 Función de inicio de sesión con Google
const loginWithGoogle = async () => {
  try {
    console.log("🟢 Abriendo ventana de autenticación con Google...");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("✅ Usuario autenticado con Google:", result.user);
  } catch (error) {
    console.error("⚠️ Error en autenticación con Google:", error.message);
  }
};

// 🔹 Función de inicio de sesión con GitHub
const loginWithGithub = async () => {
  try {
    console.log("🟣 Iniciando sesión con GitHub...");
    const result = await signInWithPopup(auth, githubProvider);
    console.log("✅ Usuario autenticado con GitHub:", result.user);
  } catch (error) {
    console.error("⚠️ Error en autenticación con GitHub:", error.message);

    if (error.code === "auth/account-exists-with-different-credential") {
      const pendingCred = error.credential;
      const email = error.customData?.email;

      if (!email) {
        console.error("⚠️ No se pudo obtener el correo del usuario.");
        return;
      }

      try {
        console.log("🔍 Verificando métodos de inicio de sesión disponibles...");
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.length > 0) {
          console.warn(`⚠️ El usuario ya tiene una cuenta con: ${signInMethods.join(", ")}`);

          // Determinar el proveedor y pedirle al usuario que inicie sesión con ese método
          let provider = null;
          if (signInMethods.includes("google.com")) {
            provider = new GoogleAuthProvider();
          } else {
            console.error("⚠️ No se pudo determinar un proveedor compatible.");
            return;
          }

          console.log(`🔄 Intentando autenticación con ${provider.providerId}...`);
          const providerResult = await signInWithPopup(auth, provider);

          // Vincular la cuenta de GitHub con la cuenta existente
          await linkWithCredential(providerResult.user, pendingCred);
          console.log("✅ Cuenta de GitHub vinculada con éxito.");
        }
      } catch (fetchError) {
        console.error("⚠️ Error verificando métodos de inicio de sesión:", fetchError.message);
      }
    }
  }
};

// 🔹 Función para registrar usuario con Email/Contraseña
const registerWithEmail = async (email, password) => {
  try {
    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Usuario registrado con email:", userCredential.user.email);
  } catch (error) {
    console.error("⚠️ Error al registrar usuario:", error.message);
  }
};

// 🔹 Función para iniciar sesión con Email/Contraseña
const loginWithEmail = async (email, password) => {
  try {
    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Usuario autenticado con email:", userCredential.user.email);
  } catch (error) {
    console.error("⚠️ Error al iniciar sesión con email:", error.message);
  }
};

// 🔹 Función para cerrar sesión
const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ Usuario cerró sesión.");
  } catch (error) {
    console.error("⚠️ Error al cerrar sesión:", error.message);
  }
};

// 🔹 Exportar funciones de autenticación
export { auth, googleProvider, loginWithGoogle, loginWithGithub, registerWithEmail, loginWithEmail, logout };
