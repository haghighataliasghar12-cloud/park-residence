// ===== Firebase =====

const firebaseConfig = {
  apiKey: "کلید خودت",
  authDomain: "park--residence.firebaseapp.com",
  projectId: "park--residence",
  storageBucket: "park--residence.firebasestorage.app",
  messagingSenderId: "885352722521",
  appId: "1:885352722521:web:c5271c4f898a3aca8b4148"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

// ===== مراحل پروژه =====

const PHASES = [
  "تخریب",
  "فونداسیون",
  "اسکلت بتنی",
  "لابی",
  "سفت کاری",
  "تأسیسات مکانیکی",
  "تأسیسات برقی",
  "نازک کاری"
];

function startProject(){

    console.log("Park Residence Started");

}

window.onload = startProject;// ==========================
// آپلود عکس
// ==========================

async function uploadPhoto(file, phase){

    if(!file) return;

    const fileName = Date.now() + "_" + file.name;

    const ref = storage.ref("photos/" + fileName);

    await ref.put(file);

    const url = await ref.getDownloadURL();

    await db.collection("photos").doc(phase).set({

        images: firebase.firestore.FieldValue.arrayUnion(url)

    },{merge:true});

    alert("عکس با موفقیت ذخیره شد.");

}// ==========================
// نمایش عکس‌ها
// ==========================

async function loadPhotos(phase){

    const doc = await db.collection("photos").doc(phase).get();

    if(!doc.exists) return;

    const data = doc.data().images || [];

    const gallery = document.getElementById("gallery-"+phase);

    if(!gallery) return;

    gallery.innerHTML = "";

    data.forEach(url=>{

        gallery.innerHTML +=
        `<img src="${url}" style="width:120px;border-radius:10px;margin:5px;">`;

    });

}
window.onload = function(){

    loadPhotos("takhrib");
    loadPhotos("foundation");
    loadPhotos("skeleton");
    loadPhotos("lobby");
    loadPhotos("saftkari");
    loadPhotos("mechanic");
    loadPhotos("electric");
    loadPhotos("finish");

}
  
    
