

// Park Residence
// ======================

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjgAT_K1VVJfzZ10gUZP_vda2vpxJT1Xg",
  authDomain: "park--residence.firebaseapp.com",
  projectId: "park--residence",
  storageBucket: "park--residence.firebasestorage.app",
  messagingSenderId: "885352722521",
  appId: "1:885352722521:web:c5271c4f898a3aca8b4148"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Cloudinary
const CLOUD_NAME = "dby2xz2j";
const UPLOAD_PRESET = "park-residence";
// ======================
// آپلود عکس
// ======================

async function uploadPhoto(file, phase) {

    if (!file) return;

    try {

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", "park-residence/" + phase);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.secure_url) {

            await db.collection("photos").doc(phase).set({
                images: firebase.firestore.FieldValue.arrayUnion(result.secure_url)
            }, { merge: true });

            alert("✅ عکس با موفقیت آپلود شد");

            loadPhotos(phase);

        } else {

            alert("❌ " + (result.error?.message || "خطای ناشناخته"));

        }

    } catch (err) {

        alert("❌ " + err.message);

    }

}
// ======================
// نمایش عکس‌ها
// ======================

async function loadPhotos(phase) {

    const gallery = document.getElementById("gallery-" + phase);

    if (!gallery) return;

    gallery.innerHTML = "";

    const doc = await db.collection("photos").doc(phase).get();

    if (!doc.exists) return;

    const data = doc.data().images || [];

    data.forEach(url => {

        const img = document.createElement("img");

        img.src = url;
        img.style.width = "120px";
        img.style.margin = "5px";
        img.style.borderRadius = "10px";

        gallery.appendChild(img);

    });

}

// ======================
// شروع برنامه
// ======================

window.onload = function () {

    loadPhotos("takhrib");
    loadPhotos("foundation");
    loadPhotos("frame");
    loadPhotos("finish");

};
