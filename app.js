// ===== Firebase =====

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



    
// نمایش عکس‌ها
// ==========================
// ==========================
// آپلود عکس با Cloudinary
// ==========================

async function uploadPhoto(file, phase){

    if(!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "Park_residence");
    formData.append("folder", phase);

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dby2xz2j/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const result = await response.json();

    if(result.secure_url){

        await db.collection("photos").doc(phase).set({
            images: firebase.firestore.FieldValue.arrayUnion(result.secure_url)
        }, {merge:true});

        alert("عکس با موفقیت آپلود شد.");

        loadPhotos(phase);

    }else{

        alert("خطا در آپلود عکس");
        console.log(result);

    }
}
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
  
    
