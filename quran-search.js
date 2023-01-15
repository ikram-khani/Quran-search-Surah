document.getElementById("loading-spinner").style.display = "none";
function searchQuran() {
  var surahNumber = document.getElementById("surah-number").value;
  var ayahNumber = document.getElementById("ayah-number").value;
  var ayahText=document.getElementById("ayah");
  document.getElementById("loading-spinner").style.display = "flex";
    fetch("https://api.alquran.cloud/v1/surah/" + surahNumber)
    .then(function(response) {
      return response.json();
    })
    .then(function(surah) {
      document.getElementById("loading-spinner").style.display = "none";
      var surahData = surah.data;
      var results = document.getElementById("results");
      results.innerHTML = "<h2>Surah " + surahData.number + ": " + surahData.name + "</h2>";

      results.innerHTML += "<h6> The Surah starts in JUZ: " + surahData.ayahs[0].juz + "</h6>";
      results.innerHTML += "<h6> Number of Ayahs: " + surahData.numberOfAyahs + "</h6>";
      var foundAyah = null;
      var ayahs='<div>';
      surahData.ayahs.forEach(function(ayah) {
        ayahs+= "<span class='text-right fw-bold h6'><span class='fw-normal'> (" + ayah.number + ")</span> " + ayah.text +" </span>";
        if (ayah.numberInSurah == ayahNumber) {
          foundAyah = ayah;
        }
      });
      ayahs+='</div>'
      ayahText.innerHTML=ayahs;
     
      if (foundAyah) {
        ayahText.innerHTML = "<h3>:Ayah " + foundAyah.number + "</h3>";
        ayahText.innerHTML+= "<h5>" + foundAyah.text + "</h5>";
      } else if(ayahNumber!=0 && !foundAyah) {
        ayahText.innerHTML = "<h5>!The Ayah you searched for, not found in this surah</h5>";
      }
      var firstAyah =surahData.ayahs[0];
      var lastAyah=surahData.ayahs[surahData.ayahs.length-1];
      var rangeOfSurah=document.getElementById("range-of-surah");
      rangeOfSurah.innerHTML="<h5>The Surah starts from Ayah "+firstAyah.number+" to Ayah "+lastAyah.number+"</h5>";
      

      
    })
    .catch(function(error) {
      console.log(error);
      document.getElementById("loading-spinner").style.display = "none";
    });
}
