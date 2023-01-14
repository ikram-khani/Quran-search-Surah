function searchQuran() {
  var surahNumber = document.getElementById("surah-number").value;
  var ayahNumber = document.getElementById("ayah-number").value;
  fetch("https://api.alquran.cloud/v1/surah/" + surahNumber)
    .then(function(response) {
      return response.json();
    })
    .then(function(surah) {
      var surahData = surah.data;
      var results = document.getElementById("results");
      results.innerHTML = "<h2>Surah " + surahData.number + ": " + surahData.name + "</h2>";

      results.innerHTML += "<h6> The Surah starts in JUZ: " + surahData.ayahs[0].juz + "</h6>";
      results.innerHTML += "<h6> Number of Ayahs: " + surahData.numberOfAyahs + "</h6>";
      var foundAyah = null;
      surahData.ayahs.forEach(function(ayah) {
        if (ayah.numberInSurah == ayahNumber) {
          foundAyah = ayah;
        }
      });
      if (foundAyah) {
        results.innerHTML += "<h3>Ayah " + foundAyah.number + ":</h3>";
        results.innerHTML += "<h5>" + foundAyah.text + "</h5>";
      } else {
        results.innerHTML += "<p>The Ayah you searched for, not found in this surah!</p>";
      }
      var firstAyah =surahData.ayahs[0];
      var lastAyah=surahData.ayahs[surahData.ayahs.length-1];
      var rangeOfSurah=document.getElementById("range-of-surah");
      rangeOfSurah.innerHTML="<h5>The Surah starts from Ayah "+firstAyah.number+" to Ayah "+lastAyah.number+"</h5>";
      

      
    })
    .catch(function(error) {
      console.log(error);
    });
}
