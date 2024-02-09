const textarea = document.querySelector("#textarea");
const generateURLBTN = document.querySelector("#generateURL");

const isValidHash = hash => /^[0-9;]+$/.test(hash);

const encodeURIC = (string) => {
  // compress to uint8
  const uint8 = LZUTF8.compress(string);
  // to numeric-semicollon format
  var semicollonFormat=";";
  for (i=0;i<uint8.length;i++) {
    semicollonFormat = semicollonFormat + uint8[i] + ";";
  }
  // to URL format
  return encodeURI(semicollonFormat);
};

const decodeURIC = (format) => {
  // to string from URL format
  var stringifyURL = decodeURI(format);
  // numeric-semicollon to array
  var semicollonFormatArray = stringifyURL.split(";");
  // create new uint8array from "semicollonFormatArray"
  var uint8 = new Uint8Array(semicollonFormatArray);
  // decompress to string
  return LZUTF8.decompress(uint8).slice(0, -1).slice(1);
};

const hashC = () => {
  if (window.location.hash) {
    const hash = window.location.hash;
    if (hash === "#_blank" || hash === "_blank" ) {
      textarea.value = "";
    } else {
      if (isValidHash(hash.slice(1))) {
        const decodecVar = decodeURIC(hash.slice(1));
        console.log(hash.slice(1));
        console.log(decodecVar);
        textarea.value = decodecVar;
      } else {
        textarea.value = "❌ Cannot load notes. document.hash is not valid!";
      }
    }
  } else {
    textarea.value = `✨ Welcome to ReadLab ✨ \n\nThis is place to share your code and notes.\n\n- Click "Create" button to create new blank notepad.\n- Click "Generate URL" to compress text into URL.\n- To share note, click "Generate URL" and copy URL.`;
  }
};



window.addEventListener('hashchange', function() { 
  hashC();
});

generateURLBTN.addEventListener("click", ()=>{
  const encode = encodeURIC(textarea.value);
  window.location.hash = "#"+encode;
});

hashC();